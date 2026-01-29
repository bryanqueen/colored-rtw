'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FeaturedProductLabel } from './featured-product-label';
import { Product } from '@/lib/shopify/types';
import Link from 'next/link';
import { motion } from 'motion/react';

interface LatestProductCardProps {
  product: Product;
  principal?: boolean;
  className?: string;
  labelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function LatestProductCard({
  product,
  principal = false,
  className,
  labelPosition = 'bottom-right',
}: LatestProductCardProps) {
  if (principal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn('relative z-10 grid grid-cols-1 h-screen min-h-[600px] max-md:pt-[120px] md:h-auto md:min-h-fold', className)}
      >
        <Link href={`/product/${product.handle}`} className="col-start-1 row-start-1 size-full block relative overflow-hidden" prefetch>
          <motion.div
            initial={{ scale: 1.15, filter: 'blur(15px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="size-full"
          >
            <Image
              priority
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              width={1000}
              height={100}
              quality={100}
              className="object-cover size-full"
            />
          </motion.div>
        </Link>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1 sticky bottom-0 self-end grid w-full grid-cols-4 gap-6 p-sides z-20 h-fit pb-8 max-md:flex max-md:flex-col max-md:justify-end max-md:pb-4"
        >
          <FeaturedProductLabel
            className="col-span-3 col-start-2 pointer-events-auto 2xl:col-start-3 2xl:col-span-2 shrink-0"
            product={product}
            principal
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <Link href={`/product/${product.handle}`} className="block w-full aspect-square" prefetch>
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={1000}
          height={100}
          className="object-cover size-full"
        />
      </Link>

      <div
        className={cn(
          'absolute flex p-sides inset-0 items-end pointer-events-none justify-end',
          labelPosition === 'top-left' && 'md:justify-start md:items-start',
          labelPosition === 'top-right' && 'md:justify-end md:items-start',
          labelPosition === 'bottom-left' && 'md:justify-start md:items-end',
          labelPosition === 'bottom-right' && 'md:justify-end md:items-end'
        )}
      >
        <FeaturedProductLabel className="pointer-events-auto" product={product} />
      </div>
    </div>
  );
}
