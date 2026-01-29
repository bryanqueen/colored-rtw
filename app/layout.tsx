import type { Metadata } from 'next';
import { Geist, Geist_Mono, Alex_Brush } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { CartProvider } from '@/components/cart/cart-context';
import { DebugGrid } from '@/components/debug-grid';
import { isDevelopment } from '@/lib/constants';
import { getCollections } from '@/lib/shopify';
import { Header } from '../components/layout/header';
import { cn } from '../lib/utils';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const alexBrush = Alex_Brush({
  weight: '400',
  variable: '--font-alex-brush',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'COLORED BY PERRY',
  description: 'Refined, Minimal & Bold.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getCollections();

  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, alexBrush.variable, 'antialiased min-h-screen')}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <CartProvider>
            <NuqsAdapter>
              <main data-vaul-drawer-wrapper="true">
                <Header collections={collections} />
                {children}
              </main>
              {isDevelopment && <DebugGrid />}
              <Toaster closeButton position="bottom-right" />
            </NuqsAdapter>
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
