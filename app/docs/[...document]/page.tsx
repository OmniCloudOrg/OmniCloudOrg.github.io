import type { Metadata } from 'next';
import { getDocBySlug, getAllDocs, buildTableOfContents } from '@/lib/docs';
import DocPageContent from '@/components/docs/DocPageContent';
import DocNotFoundModal from './DocNotFoundModal';

// Use the Next.js PageProps type
type PageProps = {
  params: { document: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  const allDocs = await getAllDocs();
  
  return allDocs.map((doc) => ({
    document: typeof doc.slug === 'string' ? doc.slug.split('/') : doc.slug,
  }));
}

// Use PageProps type for the component
export default async function DocPage({
  params,
  searchParams,
}: PageProps) {
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

// Optional: Add metadata export if needed
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = await getDocBySlug(params.document);
  
  return {
    title: doc?.frontmatter?.title || params.document.join(' - '),
    description: doc?.frontmatter?.description || '',
  };
}