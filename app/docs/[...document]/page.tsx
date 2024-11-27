import { getDocBySlug, getAllDocs, buildTableOfContents } from '@/lib/docs';
import DocPageContent from '@/components/docs/DocPageContent';
import DocNotFoundModal from './DocNotFoundModal';

interface Params {
  document: string[];
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export async function generateStaticParams(): Promise<{ document: string[] }[]> {
  const allDocs = await getAllDocs();
  return allDocs.map((doc) => ({
    document: typeof doc.slug === 'string' ? doc.slug.split('/') : doc.slug,
  }));
}

// Remove any custom types and let Next.js infer the types
export default async function DocPage({ 
  params,
  searchParams
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const slug = params.document.join('/');

  try {
    const doc = await getDocBySlug(params.document);
    
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

// Disable dynamic behavior
export const dynamic = 'error';
export const dynamicParams = false;