import { Collection, Product } from './types';

export const collections: Collection[] = [
    {
        handle: 'featured',
        title: 'Featured',
        description: 'Our standout pieces, curated just for you.',
        seo: { title: 'Featured - COLORED BY PERRY', description: 'Featured products' },
        parentCategoryTree: [],
        updatedAt: new Date().toISOString(),
        path: '/shop/featured'
    },
    {
        handle: 'pattern-and-kin',
        title: 'Colored by Perry - FW25: Pattern & Kin',
        description: 'A fusion of heritage patterns and modern silhouettes. Explore the soul of our FW25 collection.',
        seo: { title: 'Pattern & Kin - COLORED BY PERRY', description: 'FW25 Collection' },
        parentCategoryTree: [],
        updatedAt: new Date().toISOString(),
        path: '/shop/pattern-and-kin'
    },
    {
        handle: 'men',
        title: 'Men',
        description: 'Elevated essentials for the modern man.',
        seo: { title: 'Men\'s Collection - COLORED BY PERRY', description: 'Shop men\'s fashion' },
        parentCategoryTree: [],
        updatedAt: new Date().toISOString(),
        path: '/shop/men'
    },
    {
        handle: 'women',
        title: 'Women',
        description: 'Sophisticated styles for the contemporary woman.',
        seo: { title: 'Women\'s Collection - COLORED BY PERRY', description: 'Shop women\'s fashion' },
        parentCategoryTree: [],
        updatedAt: new Date().toISOString(),
        path: '/shop/women'
    }
];

const createProduct = (
    id: string,
    handle: string,
    title: string,
    collectionHandle: string,
    price: string,
    images: { url: string; altText: string }[],
    description?: string,
    additionalTags: string[] = []
): Product => {
    const desc = description || `Experience the luxury of ${title}. Crafted with precision and care, this piece from COLORED BY PERRY embodies style and comfort. Perfect for any occasion.`;
    return {
        id,
        handle,
        title,
        description: desc,
        descriptionHtml: `<p>${desc}</p>`,
        availableForSale: true,
        priceRange: {
            maxVariantPrice: { amount: price, currencyCode: 'NGN' },
            minVariantPrice: { amount: price, currencyCode: 'NGN' }
        },
        images: images.map(img => ({ ...img, height: 1000, width: 1000 })),
        featuredImage: { ...images[0], height: 1000, width: 1000 },
        seo: { title: `${title} - COLORED BY PERRY`, description: `Shop ${title}` },
        tags: [collectionHandle, ...additionalTags],
        updatedAt: new Date().toISOString(),
        variants: [{
            id: `${id}-variant-1`,
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: price, currencyCode: 'NGN' }
        }],
        options: [{
            id: `${id}-option-1`,
            name: 'Title',
            values: [{ id: 'default-title', name: 'Default Title' }]
        }],
        currencyCode: 'NGN',
        categoryId: collectionHandle
    };
};

export const products: Product[] = [
    // Pattern & Kin Products
    createProduct(
        'men-prod-1',
        'kin-pattern-pants',
        'Kin Pattern Pants',
        'pattern-and-kin',
        '25000',
        [
            { url: '/products/Men/product-1/b-1.jpeg', altText: 'Kin Pattern Pants Detail' },
            { url: '/products/Men/product-1/b-2.jpeg', altText: 'Kin Pattern Pants Full View' }
        ],
        'The centerpiece of our FW25 "Pattern & Kin" collection. These pants feature intricate heritage patterns blended with a modern, relaxed silhouette for the ultimate style statement.',
        ['men']
    ),
    createProduct(
        'men-prod-2',
        'urban-flow-shirt',
        'Urban Flow Shirt - Navy Blue',
        'pattern-and-kin',
        '28000',
        [
            { url: '/products/Men/product-2/bl-1.jpeg', altText: 'Urban Flow Shirt Front' },
            { url: '/products/Men/product-2/bl-2.jpeg', altText: 'Urban Flow Shirt Detail' }
        ],
        'A fluid, versatile shirt designed for the modern movement. Part of the Pattern & Kin series, featuring premium fabric and a tailored yet breathable fit.',
        ['men']
    ),
    // Women's Products in the same collection
    createProduct(
        'women-prod-1',
        'scarlet-elegance-dress',
        'Scarlet Elegance Dress',
        'pattern-and-kin',
        '35000',
        [
            { url: '/products/Women/product-1/r-1.png', altText: 'Scarlet Elegance Dress Front' },
            { url: '/products/Women/product-1/r-2.png', altText: 'Scarlet Elegance Dress Side' },
            { url: '/products/Women/product-1/r-3.png', altText: 'Scarlet Elegance Dress Back' }
        ],
        'Grace meets heritage in the Scarlet Elegance Dress. A statement piece from the FW25 collection that celebrates bold color and timeless form.',
        ['women']
    ),
    createProduct(
        'women-prod-2',
        'midnight-azure-gown',
        'Midnight Azure Gown',
        'pattern-and-kin',
        '30000',
        [
            { url: '/products/Women/product-2/db-1.png', altText: 'Midnight Azure Gown Front' },
            { url: '/products/Women/product-2/db-2.png', altText: 'Midnight Azure Gown Back' }
        ],
        'The Midnight Azure Gown captures the quiet elegance of the Pattern & Kin philosophy. Deep tones and premium draping make it a collection favorite.',
        ['women']
    ),
    createProduct(
        'women-prod-3',
        'cerulean-breeze-maxi',
        'Cerulean Breeze Maxi',
        'pattern-and-kin',
        '40000',
        [
            { url: '/products/Women/product-3/lb-1.jpg', altText: 'Cerulean Breeze Maxi Front' },
            { url: '/products/Women/product-3/lb-2.jpeg', altText: 'Cerulean Breeze Maxi Detail' },
            { url: '/products/Women/product-3/lb-3.jpg', altText: 'Cerulean Breeze Maxi Back' }
        ],
        'An ethereal maxi dress that embodies the "Kin" spirit of the collection. Lightweight, patterned, and designed for effortless sophistication.',
        ['women']
    )
];
