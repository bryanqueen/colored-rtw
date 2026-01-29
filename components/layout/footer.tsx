import { LogoSvg } from './header/logo-svg';
import { ShopLinks } from './shop-links';
import { SidebarLinks } from './sidebar/product-sidebar-links';
import { getCollections } from '@/lib/shopify';
import Link from 'next/link';

function PreFooter() {
  return (
    <div className="px-sides py-24 md:py-48">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-t border-foreground/10 pt-16">
        <div className="max-w-5xl">
          <h2 className="text-[10vw] md:text-[7vw] lg:text-[8vw] font-black uppercase tracking-[-0.05em] leading-[0.9] mb-12">
            <span className="font-normal normal-case italic tracking-normal font-[family-name:var(--font-alex-brush)] text-[14vw] md:text-[10vw] lg:text-[11vw] lowercase block mb-2">Refined,</span> Minimal <span className="opacity-10">&</span> Bold.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-snug max-w-xl">
            <strong className="text-foreground font-black">COLORED BY PERRY</strong> is more than a label; it is a philosophy of permanence. We create for those who value the language of fabric and the soul of heritage patterns.
          </p>
        </div>
        <div className="flex flex-col gap-8 lg:mt-6 shrink-0">
          <Link href="/shop" className="group flex items-center gap-4 text-3xl md:text-4xl font-black uppercase tracking-tighter hover:opacity-70 transition-opacity">
            Explore Catalog
            <span className="inline-block transform group-hover:translate-x-2 transition-transform">→</span>
          </Link>
          <p className="text-sm opacity-50 max-w-[200px] leading-tight">Established in Nigeria, delivering sophistication worldwide.</p>
        </div>
      </div>
    </div>
  )
}

export async function Footer() {
  const allCollections = await getCollections();
  // Filter out the long Pattern & Kin title for a cleaner footer
  const collections = allCollections.filter(c => c.handle !== 'pattern-and-kin');

  return (
    <>
      <PreFooter />
      <footer className="p-sides pb-sides">
        <div className="w-full md:min-h-[532px] p-sides md:p-11 text-background bg-foreground rounded-[12px] flex flex-col justify-between max-md:gap-16">
          <div className="flex flex-col md:flex-row justify-between md:gap-12 items-start">
            <div className="w-full md:w-[450px]">
              <LogoSvg variant="white" className="w-full h-auto block mb-8 md:my-4" />
              <p className="text-background/50 text-sm max-w-sm hidden md:block mt-12 leading-relaxed">
                Crafting modern silhouettes through the lens of heritage. Every stitch tells a story of refined minimalism and bold expression.
              </p>
            </div>

            <div className="grid grid-cols-2 md:flex md:flex-row gap-12 md:gap-24 md:ml-auto">
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] font-black text-background/30 mb-8">Store</h4>
                <ShopLinks collections={collections} className="flex flex-col gap-3" hideLabel />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] font-black text-background/30 mb-8">Company</h4>
                <ul className="flex flex-col gap-3 text-sm text-background/60">
                  <li><Link href="#" className="hover:text-background transition-colors">Shipping & Returns</Link></li>
                  <li><Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-background transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
              <div className="max-md:col-span-2">
                <h4 className="text-xs uppercase tracking-[0.3em] font-black text-background/30 mb-8">Contact</h4>
                <SidebarLinks className="flex-col gap-3" size="base" invert />
              </div>
            </div>

            <span className="italic font-black text-2xl md:hidden mt-8 tracking-tighter">Refined, Minimal & Bold</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-background/10 text-background/30 text-[10px] uppercase tracking-[0.2em] gap-8">
            <p>{new Date().getFullYear()}© COLORED BY PERRY — All rights reserved</p>
            <div className="flex gap-12">
              <span>Made in Nigeria</span>
              {/* <Link href="https://joyco.studio" className="hover:text-background transition-colors">Studio Project</Link> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
