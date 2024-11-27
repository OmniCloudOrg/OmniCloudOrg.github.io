import { getDocBySlug, getAllDocs, buildTableOfContents } from '@/lib/docs';
import DocPageContent from '@/components/docs/DocPageContent';
import DocNotFoundModal from './DocNotFoundModal';

interface DocFrontmatter {
  title: string;
  description: string;
}

interface Doc {
  content: string;
  slug: string | string[];
  frontmatter?: Partial<DocFrontmatter>;
}

// Use the props type but cast as 'any' for the CI environment
export default async function DocPage(
  // @ts-expect-error - Next.js App Router types inconsistency
  props: { params: { document: string[] } }
) {
  const { document } = props.params;
  const slug = document.join('/');
  
  try {
    const doc = await getDocBySlug(document);
   
    if (!doc || !doc.content) {
      console.log(`Document not found for slug: ${slug}`);
      return <DocNotFoundModal slug={slug} />;
    }

    const normalizedDoc = {
      ...doc,
      slug: typeof doc.slug === 'string' ? doc.slug : Array.isArray(doc.slug) ? doc.slug.join('/') : '',
      frontmatter: {
        title: doc.frontmatter?.title || '',
        description: doc.frontmatter?.description || '',
      }
    };

    const allDocs = await getAllDocs();
    const tableOfContents = buildTableOfContents(allDocs);

    return (
      <DocPageContent
        doc={normalizedDoc}
        tableOfContents={tableOfContents}
      />
    );
  } catch (error) {
    console.error('Error loading document:', error);
    return <DocNotFoundModal slug={slug} />;
  }
}

export async function generateStaticParams() {
  const allDocs = await getAllDocs();
  return allDocs.map((doc) => ({
    document: typeof doc.slug === 'string' ? doc.slug.split('/') : doc.slug,
  }));
}

export const dynamic = 'error';
export const dynamicParams = false;