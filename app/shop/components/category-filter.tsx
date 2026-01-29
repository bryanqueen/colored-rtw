'use client';

import { Collection } from '@/lib/shopify/types';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';

interface CategoryFilterProps {
  collections: Collection[];
  className?: string;
}

export function CategoryFilter({ collections, className }: CategoryFilterProps) {
  const params = useParams<{ collection: string }>();
  // Distinguish between thematic collections and categorical ones
  const thematicCollections = collections.filter(c => c.handle === 'pattern-and-kin' || c.handle === 'featured');
  const genderCategories = collections.filter(c => c.handle === 'men' || c.handle === 'women');

  const [categoryFilters, setCategoryFilters] = useQueryState('fcategory', parseAsArrayOf(parseAsString).withDefault([]));

  const toggleCategory = (handle: string) => {
    const next = categoryFilters.includes(handle)
      ? categoryFilters.filter(h => h !== handle)
      : [...categoryFilters, handle];
    setCategoryFilters(next.length > 0 ? next : null);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Collections Section */}
      <div className="px-3 py-4 rounded-lg bg-muted">
        <h3 className="mb-4 font-semibold uppercase text-xs tracking-widest opacity-50">Collections</h3>
        <ul className="flex flex-col gap-1">
          {thematicCollections.map((collection, index) => {
            const isSelected = params.collection === collection.handle;
            return (
              <li key={`${collection.handle}-${index}`}>
                <Link
                  className={cn(
                    'flex w-full text-left transition-all transform cursor-pointer font-sm md:hover:translate-x-1 md:hover:opacity-80',
                    isSelected ? 'font-medium translate-x-1' : 'opacity-70'
                  )}
                  href={`/shop/${collection.handle}`}
                  prefetch
                >
                  {collection.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Gender/Type Categories Section */}
      <div className="px-3 py-4 rounded-lg bg-muted">
        <h3 className="mb-4 font-semibold uppercase text-xs tracking-widest opacity-50">Categories</h3>
        <ul className="flex flex-col gap-2">
          {genderCategories.map((cat, index) => {
            const isSelected = categoryFilters.includes(cat.handle);
            return (
              <li key={`${cat.handle}-${index}`}>
                <button
                  className={cn(
                    'flex w-full text-left transition-all transform cursor-pointer font-sm md:hover:translate-x-1 items-center gap-2',
                    isSelected ? 'font-medium translate-x-1' : 'opacity-70'
                  )}
                  onClick={() => toggleCategory(cat.handle)}
                >
                  <div className={cn(
                    'w-3 h-3 border border-foreground transition-colors rounded-sm',
                    isSelected ? 'bg-foreground' : 'bg-transparent'
                  )} />
                  {cat.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
