// Shopify types

export interface Product {
    id: string
    title: string
    description: string
    priceRange: {
        minVariantPrice: {
            amount: string
            currencyCode: string
        }
    }
}