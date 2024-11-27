import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

// Types
interface DocFrontmatter {
  title: string;
  description: string;
  order?: number;
  [key: string]: any;
}

interface Doc {
  slug: string | string[];
  frontmatter: DocFrontmatter;
  content: string;
}

// Helper to read markdown files from filesystem
function getMarkdownContent(slug: string | string[]): string {
  const docsDirectory = path.join(process.cwd(), 'public/docs');
  const formattedSlug = Array.isArray(slug) ? slug.join('/') : slug;
  const fullPath = path.join(docsDirectory, `${formattedSlug}.md`);
  
  try {
    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error reading markdown file for ${formattedSlug}:`, error);
    return '';
  }
}

// Helper to get all markdown files recursively
function getAllMarkdownFiles(dir: string, baseSlug: string[] = []): Doc[] {
  const files: Doc[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath, [...baseSlug, item]));
    } else if (item.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data, content: markdownContent } = matter(content);
      const slug = [...baseSlug, item.replace(/\.md$/, '')];
      
      files.push({
        slug,
        frontmatter: {
          title: data.title || slug[slug.length - 1],
          description: data.description || '',
          order: data.order || 0,
          ...data,
        },
        content: markdownContent
      });
    }
  }

  return files;
}

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      footnoteLabel: 'Footnotes',
      footnoteBackLabel: 'Back to reference'
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        className: ['anchor-link'],
        ariaHidden: 'true',
        tabIndex: -1
      },
      content: {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['anchor-icon']
        },
        children: [{
          type: 'text',
          value: '#'
        }]
      }
    })
    .use(rehypePrism, {
      showLineNumbers: true,
      ignoreMissing: true,
    })
    .use(rehypeKatex)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

export async function getDocBySlug(slug: string | string[]) {
  const content = getMarkdownContent(slug);
  if (!content) {
    return {
      slug,
      frontmatter: {
        title: Array.isArray(slug) ? slug[slug.length - 1] : slug,
        description: '',
      },
      content: ''
    };
  }

  const { data, content: markdownContent } = matter(content);
  const html = await markdownToHtml(markdownContent);

  return {
    slug,
    frontmatter: {
      title: data.title || (Array.isArray(slug) ? slug[slug.length - 1] : slug),
      description: data.description || '',
      order: data.order || 0,
      ...data,
    },
    content: html
  };
}

export async function getAllDocs() {
  const docsDirectory = path.join(process.cwd(), 'public/docs');
  return getAllMarkdownFiles(docsDirectory);
}

export async function getStaticDocPaths() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    params: {
      document: Array.isArray(doc.slug) ? doc.slug : doc.slug.split('/')
    }
  }));
}

interface TocItem {
  title: string;
  description?: string;
  slug?: string;
  order?: number;
  items?: Record<string, TocItem>;
}

export function buildTableOfContents(docs: Doc[]) {
  const toc: Record<string, TocItem> = {};

  docs.forEach(doc => {
    const slug = Array.isArray(doc.slug) ? doc.slug : doc.slug.split('/');
    let current = toc;
    
    slug.forEach((part, index) => {
      if (index === slug.length - 1) {
        current[part] = {
          title: doc.frontmatter.title,
          description: doc.frontmatter.description,
          slug: Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug,
          order: doc.frontmatter.order
        };
      } else {
        current[part] = current[part] || {
          title: part.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          items: {}
        };
        current = current[part].items!;
      }
    });
  });

  return sortTableOfContents(toc);
}

function sortTableOfContents(toc: Record<string, TocItem>) {
  const sorted: Record<string, TocItem> = {};

  Object.keys(toc)
    .sort((a, b) => {
      const orderA = toc[a].order || 0;
      const orderB = toc[b].order || 0;
      return orderA - orderB;
    })
    .forEach(key => {
      sorted[key] = toc[key];
      if (toc[key].items) {
        sorted[key].items = sortTableOfContents(toc[key].items!);
      }
    });

  return sorted;
}