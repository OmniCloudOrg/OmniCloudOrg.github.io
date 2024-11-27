import matter from 'gray-matter';
import path from 'path';

// Get base URL for requests
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return ''; // Use relative URLs in production by default
};

async function fetchMarkdown(slug: string | string[]) {
  const baseUrl = getBaseUrl();
  // Handle both string and array slugs
  const formattedSlug = Array.isArray(slug) ? slug.join('/') : slug;
  const url = `${baseUrl}/docs/${formattedSlug}.md`;
 
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/markdown, text/plain, */*'
      },
    });
   
    if (!response.ok) {
      return "";
    }
   
    return response.text();
  } catch (error) {
    console.error(`Error fetching markdown for ${slug}:`, error);
    throw error;
  }
}

async function fetchManifest() {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/docs/manifest.json`;
 
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      },
    });
   
    if (!response.ok) {
      throw new Error('Failed to fetch manifest');
    }
   
    return response.json();
  } catch (error) {
    console.error('Error fetching manifest:', error);
    throw error;
  }
}

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    // Parse markdown
    .use(remarkParse)
    // GitHub Flavored Markdown
    .use(remarkGfm)
    // Math support
    .use(remarkMath)
    // Convert to HTML AST
    .use(remarkRehype, {
      allowDangerousHtml: true,
      footnoteLabel: 'Footnotes',
      footnoteBackLabel: 'Back to reference'
    })
    // Add IDs to headings
    .use(rehypeSlug)
    // Add anchor links to headings
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
    // Syntax highlighting
    .use(rehypePrism, {
      showLineNumbers: true,
      ignoreMissing: true,
    })
    // Math rendering
    .use(rehypeKatex)
    // Security sanitization
    .use(rehypeSanitize)
    // Convert to HTML string
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

// Add to your existing getDocBySlug function:
export async function getDocBySlug(slug: string | string[]) {
  const content = await fetchMarkdown(slug);
  const { data, content: markdownContent } = matter(content);
 
  const html = await markdownToHtml(markdownContent);

  return {
    slug,
    frontmatter: {
      title: data.title || slug,
      description: data.description || '',
      order: data.order || 0,
      ...data,
    },
    content: html
  };
}

export async function getAllDocs() {
  const manifest = await fetchManifest();
  return manifest.docs;
}

export async function getStaticDocPaths() {
  const manifest = await fetchManifest();
  // Return paths in the format Next.js expects
  return manifest.docs.map((doc: any) => ({
    params: {
      // For docs/getting-started/quick-start
      // slug should be ['getting-started', 'quick-start']
      slug: doc.slug.split('/')
    },
    // This is the full path that will be generated
    document: doc.slug
  }));
}

interface TocItem {
  title: string;
  description?: string;
  slug?: string;
  order?: number;
  items?: Record<string, TocItem>;
}

export function buildTableOfContents(docs: any[]) {
  const toc: Record<string, TocItem> = {};

  docs.forEach(doc => {
    const parts = doc.slug.split('/');
    let current = toc;
   
    parts.forEach((part: string, index: number) => {
      if (index === parts.length - 1) {
        // Leaf node (actual document)
        current[part] = {
          title: doc.frontmatter.title,
          description: doc.frontmatter.description,
          slug: doc.slug,
          order: doc.frontmatter.order
        };
      } else {
        // Create/traverse directory structure
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