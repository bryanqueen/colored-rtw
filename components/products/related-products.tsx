import { getCollectionProducts } from '@/lib/shopify';
import { LatestProductCard } from './latest-product-card';
import { getLabelPosition } from '@/lib/utils';

interface RelatedProductsProps {
    collectionId: string;
    currentProductHandle: string;
}

export async function RelatedProducts({ collectionId, currentProductHandle }: RelatedProductsProps) {
    const products = await getCollectionProducts({ collection: collectionId });

    // Filter out the current product and limit to 4
    const related = products
        .filter(p => p.handle !== currentProductHandle)
        .slice(0, 4);

    if (related.length === 0) return null;

    return (
        <div className="px-sides py-24 border-t border-foreground/5 bg-background">
            <div className="flex flex-col gap-12">
                <h3 className="text-3xl font-black uppercase tracking-tighter">You might also like</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-sides">
                    {related.map((product, index) => (
                        <LatestProductCard
                            key={product.id}
                            product={product}
                            labelPosition={getLabelPosition(index)}
                            className="col-span-1"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
