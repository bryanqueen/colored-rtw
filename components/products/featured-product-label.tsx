import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/shopify/types';
import { AddToCart, AddToCartButton } from '../cart/add-to-cart';
import { Suspense } from 'react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ArrowRight, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/shopify/utils';

export function FeaturedProductLabel({
  product,
  principal = false,
  className,
}: {
  product: Product;
  principal?: boolean;
  className?: string;
}) {
  if (principal) {
    return (
      <div
        className={cn(
          'flex flex-col grid-cols-2 gap-y-3 p-4 w-full bg-white/80 backdrop-blur-md md:bg-white md:backdrop-blur-none md:w-fit md:rounded-md md:grid',
          className
        )}
      >
        <div className="col-span-2">
          <Badge className="font-black capitalize rounded-full">Best Seller</Badge>
        </div>
        <Link href={`/product/${product.handle}`} className="col-span-1 self-start text-2xl font-semibold">
          {product.title}
        </Link>
        <div className="col-span-1 mb-10 max-md:hidden">
          {product.tags.length > 0 ? (
            <p className="mb-3 text-sm italic font-medium">{product.tags.join('. ')}</p>
          ) : null}
          <p className="text-sm font-medium line-clamp-3">{product.description}</p>
        </div>
        <div className="flex col-span-1 gap-3 items-center text-2xl font-semibold md:self-end justify-between">
          <div className="flex gap-3 items-center">
            {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
            {product.compareAtPrice && (
              <span className="line-through opacity-30 text-lg">
                {formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
          <Suspense fallback={<div className="h-10 w-10 animate-pulse bg-gray-100/50 rounded-full" />}>
            <AddToCart
              product={product}
              iconOnly
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm hover:bg-black hover:text-white transition-colors bg-white/50 backdrop-blur-sm md:bg-transparent"
              icon={<Plus className="size-5" />}
            />
          </Suspense>
        </div>

        <Link
          href="/shop"
          className={cn(
            buttonVariants({ size: 'lg' }),
            "flex gap-20 justify-between pr-2 w-full mt-2 md:col-span-2"
          )}
        >
          <span>Shop All Collections</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('flex gap-2 items-center p-2 pl-8 bg-white rounded-md max-w-full', className)}>
      <div className="pr-6 leading-4 overflow-hidden">
        <Link
          href={`/product/${product.handle}`}
          className="inline-block w-full truncate text-base font-semibold opacity-80 mb-1.5"
        >
          {product.title}
        </Link>
        <div className="flex gap-2 items-center text-base font-semibold">
          {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
          {product.compareAtPrice && (
            <span className="text-sm line-through opacity-30">
              {formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
      </div>
      <Suspense fallback={<AddToCartButton product={product} iconOnly variant="default" size="icon-lg" />}>
        <AddToCart product={product} iconOnly variant="default" size="icon-lg" />
      </Suspense>
    </div>
  );
}
