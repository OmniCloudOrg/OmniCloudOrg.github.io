import { getDocBySlug, getAllDocs, buildTableOfContents } from '@/lib/docs';
import DocPageContent from '@/components/docs/DocPageContent';
import DocNotFoundModal from './DocNotFoundModal';

export default async function DocPage({
  params,
}: {
  params: { document: string[] }
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

export async function generateStaticParams() {
  const allDocs = await getAllDocs();
  return allDocs.map((doc) => ({
    document: typeof doc.slug === 'string' ? doc.slug.split('/') : doc.slug,
  }));
}

export const dynamic = 'error';
export const dynamicParams = false;