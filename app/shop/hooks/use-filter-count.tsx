'use client';

import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';
import { useParams } from 'next/navigation';

export function useFilterCount() {
  const params = useParams<{ collection: string }>();
  const [color] = useQueryState('fcolor', parseAsArrayOf(parseAsString).withDefault([]));
  const [category] = useQueryState('fcategory', parseAsArrayOf(parseAsString).withDefault([]));

  // Count active filters
  let count = 0;

  // Count color filters
  count += color.length;

  // Count category filters
  count += category.length;

  // Count collection navigation (if not on "all" products)
  if (params.collection && params.collection !== undefined) {
    count += 1;
  }

  return count;
}

export function useCategoryFilterCount() {
  const params = useParams<{ collection: string }>();
  const [category] = useQueryState('fcategory', parseAsArrayOf(parseAsString).withDefault([]));

  // Count navigation (1) + filters (N)
  let count = (params.collection && params.collection !== undefined ? 1 : 0);
  count += category.length;

  return count;
}

export function useColorFilterCount() {
  const [color] = useQueryState('fcolor', parseAsArrayOf(parseAsString).withDefault([]));

  // Return the number of selected color filters
  return color.length;
}
