import { ShopLinks } from '../shop-links';
import { Collection } from '@/lib/shopify/types';

interface HomeSidebarProps {
  collections: Collection[];
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
  return (
    <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
      <div className="mt-12">
        <p className="italic tracking-tighter text-base">Refined, Minimal & Bold</p>
        <div className="mt-5 text-base leading-tight">
          <p>Garments that speak softly, but stand out loud.</p>
          <p>Clean lines, crafted with heritage.</p>
          <p>Pattern & Kin — FW25 Collection</p>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <ShopLinks
          label="Collections"
          collections={collections.filter(c => c.handle === 'pattern-and-kin')}
        />
        <ShopLinks
          label="Categories"
          collections={collections.filter(c => c.handle !== 'pattern-and-kin')}
        />
      </div>
    </aside>
  );
}
