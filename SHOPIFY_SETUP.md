# Shopify Integration Setup Guide

This guide will help you set up Shopify payment integration for Chip Anna Putt's golf shop.

## Overview

Your website now integrates with Shopify Storefront API for:
- Product catalog management
- Shopping cart functionality
- Payment processing
- Inventory management

## Step 1: Create a Shopify Store

1. Go to https://www.shopify.com
2. Create a new development store or use your existing store
3. Note your store domain (e.g., `your-store.myshopify.com`)

## Step 2: Get Your Storefront Access Token

1. In Shopify Admin, go to **Settings** → **Apps and integrations**
2. Click **Develop apps**
3. Create a new app called "Chip Anna Putt Website"
4. Go to **Configuration** tab
5. Under **Admin API access scopes**, enable:
   - `read_products`
   - `read_collections`
   - `read_customer_orders`
6. Install the app
7. Go to **API credentials** and copy your **Storefront access token**

## Step 3: Set Environment Variables

In your Vercel project, add these environment variables in the **Vars** section:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
```

## Step 4: Create Your Products in Shopify

1. In Shopify Admin, go to **Products**
2. Create your golf products:
   - **Chip Anna Putt Kit** - $149.99
   - Add product descriptions, images, and variants if needed
3. Make sure products are published to the Storefront

## Step 5: Add Products to Collections (Optional)

1. In Shopify Admin, go to **Collections**
2. Create collections like:
   - Featured Products
   - Golf Kits
   - Training Aids
3. Add your products to these collections

## Step 6: Enable Shopify Checkout

Your site now uses Shopify's native checkout. When users click "Buy it now" or proceed to checkout:

1. They'll be redirected to Shopify's secure checkout page
2. Shopify handles all payment processing
3. They can pay via credit card, Apple Pay, Google Pay, etc.

## Implementation Details

### Cart Management
- The cart is managed using React Context (see `components/cart/cart-context.tsx`)
- No local storage is used - cart is in-memory during the session
- To persist cart data, you can extend the context to use localStorage or a database

### Adding to Cart
```typescript
import { useCart } from '@/components/cart/cart-context'

const { addItem } = useCart()
await addItem(variant, product, quantity)
```

### Fetching Products
```typescript
import { getProducts, getCollections } from '@/lib/shopify'

const products = await getProducts()
const collections = await getCollections()
```

## Testing

### Test Products
1. Use a test Shopify store for development
2. Use Shopify's test credit card: **4242 4242 4242 4242**
3. Any future expiry date and any 3-digit CVC

### Test Checkout
1. Add items to cart
2. Click "Buy it now" or "Check out"
3. You'll be redirected to Shopify's test checkout
4. Use the test credit card details above

## Customization

### Modify Cart Context
To add features like persistent cart, sales tax, shipping:
1. Edit `components/cart/cart-context.tsx`
2. Add state for shipping, tax, discounts
3. Integrate with Shopify's cart API

### Connect to Database
To store user carts:
1. Add a database integration (Supabase, Neon, etc.)
2. Store cart items with user ID
3. Sync cart context with database on load

### Email Notifications
1. Enable email notifications in Shopify Admin
2. Customers will receive order confirmations automatically

## Next Steps

1. **Add More Products**: Create your full product catalog in Shopify
2. **Customize Checkout**: Modify checkout appearance in Shopify Admin
3. **Set Shipping**: Configure shipping zones and rates
4. **Tax Setup**: Configure tax rates and rules
5. **Payment Methods**: Enable additional payment providers (PayPal, Apple Pay, etc.)
6. **Analytics**: Set up Google Analytics and Shopify's built-in analytics

## Troubleshooting

### Products Not Showing
- Check that `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` is set correctly
- Verify products are published to the Storefront
- Check that you have the correct Storefront access token

### Checkout Not Working
- Verify Shopify payments are enabled in your store
- Check that your store domain is correct
- Ensure test mode is enabled for testing

### Cart Not Persisting
- Currently, the cart is session-based (resets on page reload)
- To add persistence, integrate with localStorage or a database

## Support

For issues with:
- **Shopify integration**: Visit https://shopify.dev
- **Your website**: Check the README.md file
- **Payments**: Contact Shopify Support

## Important Notes

- Always use a test store for development
- Never commit API tokens to version control
- Use environment variables for sensitive data
- Test checkout flow thoroughly before going live
