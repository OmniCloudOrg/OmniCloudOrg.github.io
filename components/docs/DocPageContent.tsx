'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Menu } from 'lucide-react';
import Link from 'next/link';

interface DocFrontmatter {
  title: string;
  description: string;
  order?: number;
}

interface Doc {
  slug: string;
  frontmatter: DocFrontmatter;
  content: string;
}

interface TocItem {
  title: string;
  description?: string;
  slug?: string;
  order?: number;
  items?: Record<string, TocItem>;
}

interface DocPageContentProps {
  doc: Doc;
  tableOfContents: Record<string, TocItem>;
  navbarHeight?: string;
}

export default function DocPageContent({ 
  doc, 
  tableOfContents,
  navbarHeight = '64px'
}: DocPageContentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const renderTocItem = (item: TocItem, key: string, path: string[] = []) => {
    if (!item.slug && item.items) {
      return (
        <div key={key} className="mb-4">
          {key !== 'items' && <h3 className="text-purple-300 font-semibold mb-2">{key}</h3>}
          <ul className="space-y-2">
            {Object.entries(item.items)
              .sort(([, a], [, b]) => (a.order || 0) - (b.order || 0))
              .map(([childKey, child]) =>
                renderTocItem(child, childKey, [...path, key])
              )}
          </ul>
        </div>
      );
    }

    if (item.slug) {
      return (
        <li key={key}
          className="text-gray-400 hover:text-purple-400 cursor-pointer pl-2 border-l border-gray-800 hover:border-purple-400 transition-colors"
        >
          <Link
            href={`/docs/${item.slug}`}
            className="block py-1"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/docs/${item.slug}`);
            }}
          >
            {item.title}
          </Link>
        </li>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen bg-black text-gray-100">
      {/* Overlay Background - Only for mobile */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: navbarHeight }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:static lg:flex flex-shrink-0 w-64 transition-transform duration-300 bg-gray-900 border-r border-gray-800 overflow-y-auto z-30`}
        style={{ 
          top: navbarHeight,
          height: `calc(100vh - ${navbarHeight})`
        }}
      >
        <div className="p-4 w-full">
          <h1 className="text-xl font-bold text-purple-400 mb-4">Documentation</h1>
          <div className="space-y-4">
            {Object.entries(tableOfContents).map(([key, item]) =>
              renderTocItem(item, key)
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5 text-purple-400" />
            </button>
           
            <div className="flex-1 mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 text-gray-100 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-4xl mx-auto">
            <article className="prose prose-invert prose-purple max-w-none">
              {doc.frontmatter.description && (
                <p className="text-xl text-gray-400 mb-8">
                  {doc.frontmatter.description}
                </p>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: doc.content }}
                className="markdown-content"
              />
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}