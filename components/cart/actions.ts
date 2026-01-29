'use server';

import { cookies } from 'next/headers';
import { products } from '@/lib/shopify/mock-data';
import type { Cart, CartItem, Product, ProductVariant } from '@/lib/shopify/types';

const CART_COOKIE_NAME = 'colored_cart_simple';

// Minimal cart storage format
type SimpleCartItem = { v: string; q: number }; // v: variantId, q: quantity

// Helper to calculate totals and rehydrate full cart data
function rehydrateCart(simpleLines: SimpleCartItem[]): Cart {
  const lines: CartItem[] = simpleLines.map(item => {
    // Re-find product and variant from mock data
    const product = products.find(p => p.variants.some(v => v.id === item.v)) || products[0];
    const variant = product.variants.find(v => v.id === item.v) || product.variants[0];

    return {
      id: `line-${item.v}`,
      quantity: item.q,
      cost: {
        totalAmount: {
          amount: (parseFloat(variant.price.amount) * item.q).toString(),
          currencyCode: variant.price.currencyCode
        },
      },
      merchandise: {
        id: variant.id,
        title: variant.title,
        selectedOptions: variant.selectedOptions,
        product: product,
      },
    };
  });

  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce((sum, item) => sum + parseFloat(item.cost.totalAmount.amount), 0);
  const currencyCode = lines[0]?.merchandise.product.priceRange.minVariantPrice.currencyCode ?? 'NGN';

  return {
    id: 'mock-cart',
    checkoutUrl: '#',
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode },
    },
    lines: lines,
  };
}

export async function getCart(): Promise<Cart | null> {
  const cartJson = (await cookies()).get(CART_COOKIE_NAME)?.value;
  if (!cartJson) return null;

  try {
    const simpleLines = JSON.parse(cartJson) as SimpleCartItem[];
    // Filter out invalid items just in case
    const validLines = simpleLines.filter(line => !!line.v && line.q > 0);
    return rehydrateCart(validLines);
  } catch {
    return null;
  }
}

async function saveSimpleCart(simpleLines: SimpleCartItem[]) {
  (await cookies()).set(CART_COOKIE_NAME, JSON.stringify(simpleLines), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function addItem(variantId: string | undefined): Promise<Cart | null> {
  if (!variantId) return null;

  const cartJson = (await cookies()).get(CART_COOKIE_NAME)?.value;
  let simpleLines: SimpleCartItem[] = [];

  try {
    if (cartJson) simpleLines = JSON.parse(cartJson);
  } catch (e) { }

  const existingItemIndex = simpleLines.findIndex(l => l.v === variantId);

  if (existingItemIndex > -1) {
    simpleLines[existingItemIndex].q += 1;
  } else {
    simpleLines.push({ v: variantId, q: 1 });
  }

  await saveSimpleCart(simpleLines);
  return rehydrateCart(simpleLines);
}

export async function updateItem({ lineId, quantity }: { lineId: string; quantity: number }): Promise<Cart | null> {
  const cartJson = (await cookies()).get(CART_COOKIE_NAME)?.value;
  if (!cartJson) return null;

  let simpleLines: SimpleCartItem[] = [];
  try {
    simpleLines = JSON.parse(cartJson);
  } catch (e) { return null; }

  // Check if lineId is 'line-{variantId}' as generated in rehydrateCart
  const variantId = lineId.replace('line-', '');

  if (quantity === 0) {
    simpleLines = simpleLines.filter(l => l.v !== variantId);
  } else {
    const item = simpleLines.find(l => l.v === variantId);
    if (item) item.q = quantity;
  }

  await saveSimpleCart(simpleLines);
  return rehydrateCart(simpleLines);
}

export async function createCartAndSetCookie() {
  await saveSimpleCart([]);
  return rehydrateCart([]);
}
