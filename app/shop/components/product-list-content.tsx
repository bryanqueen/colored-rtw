'use client';

import { useEffect, useMemo } from 'react';
import { Product, Collection } from '@/lib/shopify/types';
import { ProductCard } from './product-card';
import ResultsControls from './results-controls';
import { useProducts } from '../providers/products-provider';
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';
import { ProductGrid } from './product-grid';
import { Card } from '../../../components/ui/card';

interface ProductListContentProps {
  products: Product[];
  collections: Collection[];
}

// Client-side color filtering function
function filterProductsByColors(products: Product[], colors: string[]): Product[] {
  if (!colors || colors.length === 0) {
    return products;
  }

  const filteredProducts = products.filter(product => {
    // Check if product has any variants with the selected colors
    // Note: variants is now a simple array after adaptShopifyProduct transformation
    const hasMatchingColor = product.variants?.some((variant: any) => {
      if (!variant.selectedOptions) return false;

      // Look for color option in variant
      return variant.selectedOptions.some((option: any) => {
        const isColorOption =
          option.name.toLowerCase().includes('color') || option.name.toLowerCase().includes('colour');

        if (!isColorOption) return false;

        // Check if this variant's color matches any of the selected colors
        const variantColor = option.value.toLowerCase();
        return colors.some(
          selectedColor =>
            selectedColor.toLowerCase() === variantColor ||
            variantColor.includes(selectedColor.toLowerCase()) ||
            selectedColor.toLowerCase().includes(variantColor)
        );
      });
    });

    // Also check product-level options as fallback
    if (!hasMatchingColor && product.options) {
      const colorOption = product.options.find(
        (opt: any) => opt.name.toLowerCase().includes('color') || opt.name.toLowerCase().includes('colour')
      );

      if (colorOption && colorOption.values) {
        return colorOption.values.some((value: any) => {
          // Handle both string values and object values with .name property
          const colorValue = typeof value === 'string' ? value : value.name || value.id;
          const optionColor = colorValue.toLowerCase();
          return colors.some(
            selectedColor =>
              selectedColor.toLowerCase() === optionColor ||
              optionColor.includes(selectedColor.toLowerCase()) ||
              selectedColor.toLowerCase().includes(optionColor)
          );
        });
      }
    }

    return hasMatchingColor;
  });

  return filteredProducts;
}

export function ProductListContent({ products, collections }: ProductListContentProps) {
  const { setProducts, setOriginalProducts } = useProducts();

  // Get current filters from URL
  const [colorFilters] = useQueryState('fcolor', parseAsArrayOf(parseAsString).withDefault([]));
  const [categoryFilters] = useQueryState('fcategory', parseAsArrayOf(parseAsString).withDefault([]));

  // Apply client-side filtering whenever products or filters change
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by color
    if (colorFilters && colorFilters.length > 0) {
      result = filterProductsByColors(result, colorFilters);
    }

    // Filter by category
    if (categoryFilters && categoryFilters.length > 0) {
      result = result.filter(product =>
        categoryFilters.some(cat => product.tags.includes(cat.toLowerCase()))
      );
    }

    return result;
  }, [products, colorFilters, categoryFilters]);

  // Set both original and filtered products in the provider whenever they change
  useEffect(() => {
    setOriginalProducts(products);
    setProducts(filteredProducts);
  }, [products, filteredProducts, setProducts, setOriginalProducts]);

  return (
    <>
      <ResultsControls className="max-md:hidden" collections={collections} products={filteredProducts} />

      {filteredProducts.length > 0 ? (
        <ProductGrid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[50vh] flex-1">
          <div className="mb-6 opacity-10">
            <h2 className="text-9xl font-black uppercase tracking-tighter">Empty</h2>
          </div>
          <h2 className="text-2xl font-semibold mb-2 italic">Nothing here yet.</h2>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
            We couldn&apos;t find any products matching your current selection. Try adjusting your filters or browsing a different category.
          </p>
        </div>
      )}
    </>
  );
}
