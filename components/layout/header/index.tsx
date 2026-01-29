'use client';

import MobileMenu from './mobile-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogoSvg } from './logo-svg';
import CartModal from '@/components/cart/modal';
import { NavItem } from '@/lib/types';
import { Collection } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';

export const navItems: NavItem[] = [
  {
    label: 'home',
    href: '/',
  },
  {
    label: 'featured',
    href: '/shop/featured',
  },
  {
    label: 'shop all',
    href: '/shop',
  },
];

interface HeaderProps {
  collections: Collection[];
}

export function Header({ collections }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling down past 100px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={cn(
      "grid fixed top-0 left-0 z-50 w-full transition-transform duration-300",
      "grid-cols-2 gap-y-2 p-sides", // Mobile: 2 cols, vertical gap
      "md:grid-cols-12 md:gap-sides md:items-start", // Desktop: 12 cols, normal gap
      isScrolled && "md:-translate-y-full"
    )}>
      {/* Logo - Mobile: Top Row Center / Desktop: Left Column */}
      <Link href="/" className={cn(
        "order-first col-span-2 flex justify-center py-2 bg-background/80 backdrop-blur-md rounded-md", // Mobile styles
        "md:col-span-3 md:bg-transparent md:backdrop-blur-none md:p-0 md:justify-start xl:col-span-2" // Desktop reset
      )} prefetch>
        <LogoSvg variant="black" className="w-auto h-12 md:w-full md:max-w-[160px] md:h-auto" />
      </Link>

      {/* Mobile Menu - Mobile: Bottom Left */}
      <div className="block flex-none md:hidden self-center">
        <MobileMenu collections={collections} />
      </div>

      {/* Navigation & Cart - Mobile: Bottom Right (Cart Only) / Desktop: Right Columns */}
      <nav className="flex gap-2 justify-end items-center md:col-span-9 xl:col-span-10 self-center md:self-start">
        <ul className="items-center gap-5 py-0.5 px-3 bg-background/10 rounded-sm backdrop-blur-md hidden md:flex">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'font-semibold text-base transition-colors duration-200 uppercase',
                  pathname === item.href ? 'text-foreground' : 'text-foreground/50'
                )}
                prefetch
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <CartModal />
      </nav>
    </header>
  );
}
