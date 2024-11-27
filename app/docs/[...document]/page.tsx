import { getDocBySlug, getAllDocs, buildTableOfContents } from '@/lib/docs';
import DocPageContent from '@/components/docs/DocPageContent';
import DocNotFoundModal from './DocNotFoundModal';

interface DocPageProps {
  params: Promise<{
    document: string[]
  }>
}

export default async function DocPage(props: DocPageProps) {
  const params = await props.params;
  const slug = params.document.join('/');
  
  // Get the document from the slug
  const doc = await getDocBySlug(params.document);
 
  if (doc.content === '') {
    console.log("Document not found");
    return <DocNotFoundModal slug={slug} />;
  }

  // Get all docs and build table of contents
  const allDocs = await getAllDocs();
  const tableOfContents = buildTableOfContents(allDocs);

  return (
    <DocPageContent
      doc={doc}
      tableOfContents={tableOfContents}
    />
  );
}

// Generate static paths at build time
export async function generateStaticParams() {
  const allDocs = await getAllDocs();
  return allDocs.map((doc: any) => ({
    document: doc.slug.split('/')
  }));
}