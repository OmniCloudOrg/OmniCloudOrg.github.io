import { getDocBySlug, getAllDocs, buildTableOfContents } from '@/lib/docs';
import DocPageContent from '@/components/docs/DocPageContent';
import DocNotFoundModal from './DocNotFoundModal';

// Proper typing for Next.js App Router
type Props = {
  params: {
    document: string[]
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// This is required for static export
export async function generateStaticParams() {
  const allDocs = await getAllDocs();
  
  // Transform the docs into params objects
  const paths = allDocs.map((doc) => {
    // Handle both string and array slugs
    const slugArray = typeof doc.slug === 'string'
      ? doc.slug.split('/')
      : doc.slug;
    
    return {
      document: slugArray,
    };
  });

  // Log the paths being generated for debugging
  console.log('Generated paths:', paths);
  
  return paths;
}

export default async function DocPage({ params, searchParams }: Props) {
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

// Configure static generation
export const dynamic = 'error';
export const dynamicParams = false;