import { getDocBySlug, getAllDocs, buildTableOfContents } from '@/lib/docs';
import DocPageContent from '@/components/docs/DocPageContent';
import DocNotFoundModal from './DocNotFoundModal';

type SectionProps = {
    params: Promise<{
      section: string;
    }>;
  };
  

export default async function DocPage({
    params,
  }: SectionProps) {
    const resolvedParams = await params;
    const { section } = resolvedParams;
 
  try {
    const doc = await getDocBySlug(section);
   
    if (!doc || !doc.content) {
      return <DocNotFoundModal slug={section} />;
    }

    const normalizedDoc = {
      ...doc,
      section,
      slug: Array.isArray(doc.slug) ? doc.slug[0] : doc.slug,
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
    return <DocNotFoundModal slug={section} />;
  }
}


export async function generateStaticParams() {
  const allDocs = await getAllDocs();
  return allDocs
    .filter(doc => !doc.slug.includes('/'))
    .map((doc) => ({
      section: String(doc.slug)
    }));
}
export const dynamicParams = false;