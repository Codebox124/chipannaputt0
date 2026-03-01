import { NextRequest, NextResponse } from 'next/server'

const SHOPIFY_STOREFRONT_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
const STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

export async function POST(request: NextRequest) {
    try {
        const { variantId, quantity } = await request.json()

        if (!STOREFRONT_ACCESS_TOKEN) {
            return NextResponse.json(
                { error: 'Shopify token not configured' },
                { status: 500 }
            )
        }

        // Create a cart with the product
        const createCartQuery = `
            mutation CreateCart($input: CartInput!) {
                cartCreate(input: $input) {
                    cart {
                        id
                        checkoutUrl
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `

        const response = await fetch(SHOPIFY_STOREFRONT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
            },
            body: JSON.stringify({
                query: createCartQuery,
                variables: {
                    input: {
                        lines: [
                            {
                                merchandiseId: variantId,
                                quantity: quantity || 1
                            }
                        ]
                    }
                }
            })
        })

        const data = await response.json()

        if (data.errors) {
            console.error('[v0] Shopify error:', data.errors)
            return NextResponse.json(
                { error: 'Failed to create checkout' },
                { status: 400 }
            )
        }

        const checkoutUrl = data.data?.cartCreate?.cart?.checkoutUrl

        if (!checkoutUrl) {
            return NextResponse.json(
                { error: 'No checkout URL returned' },
                { status: 400 }
            )
        }

        return NextResponse.json({ checkoutUrl })
    } catch (error) {
        console.error('[v0] Checkout error:', error)
        return NextResponse.json(
            { error: 'Failed to process checkout' },
            { status: 500 }
        )
    }
}
