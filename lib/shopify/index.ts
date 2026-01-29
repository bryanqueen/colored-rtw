import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache';
import { TAGS } from '@/lib/constants';
import { collections, products } from './mock-data';
import type {
  Product,
  Collection,
  Cart,
  ProductCollectionSortKey,
  ProductSortKey,
} from './types';

// Mock Cart Operations
export async function createCart(): Promise<Cart> {
  return {
    id: 'mock-cart-id',
    checkoutUrl: '#',
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'NGN' },
      totalAmount: { amount: '0', currencyCode: 'NGN' },
      totalTaxAmount: { amount: '0', currencyCode: 'NGN' }
    },
    lines: [],
    totalQuantity: 0
  };
}

export async function addCartLines(cartId: string, lines: any[]): Promise<Cart> {
  return createCart(); // Mock
}

export async function updateCartLines(cartId: string, lines: any[]): Promise<Cart> {
  return createCart(); // Mock
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  return createCart(); // Mock
}

export async function getCart(): Promise<Cart | null> {
  return createCart();
}

// Data Fetching
export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollection(handle: string): Promise<Collection | null> {
  return collections.find(c => c.handle === handle) || null;
}

export async function getProduct(handle: string): Promise<Product | null> {
  return products.find(p => p.handle === handle) || null;
}

export async function getProducts({
  limit,
  sortKey,
  reverse,
  query
}: {
  limit?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
}): Promise<Product[]> {
  let filtered = [...products];
  if (query) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  }
  if (limit) {
    filtered = filtered.slice(0, limit);
  }
  return filtered;
}

export async function getCollectionProducts({
  collection,
  limit,
  sortKey,
  reverse,
  query
}: {
  collection: string;
  limit?: number;
  sortKey?: ProductCollectionSortKey;
  reverse?: boolean;
  query?: string;
}): Promise<Product[]> {
  let filtered: Product[] = [];

  if (collection === 'featured' || collection === 'frontpage' || collection === 'pattern-and-kin') {
    // Logic for Featured/Main Collection:
    // We want the Kin Pattern Pants to be first, followed by other products.

    const featuredItems = products.filter(p =>
      p.handle === 'kin-pattern-pants' || p.handle === 'scarlet-elegance-dress'
    );
    const otherItems = products.filter(p =>
      !featuredItems.includes(p)
    );

    // Combine: Featured first, then others
    filtered = [...featuredItems, ...otherItems];

  } else if (collection === 'men') {
    filtered = products.filter(p => p.tags.includes('men') || p.categoryId === 'men');
  } else if (collection === 'women') {
    filtered = products.filter(p => p.tags.includes('women') || p.categoryId === 'women');
  } else {
    // Default fallback
    filtered = products.filter(p => p.tags.includes(collection) || p.categoryId === collection);
    if (filtered.length === 0) {
      filtered = products;
    }
  }

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}
