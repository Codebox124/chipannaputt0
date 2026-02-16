import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// TypeScript interfaces
interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
    description?: string
}

interface CartStore {
    cart: CartItem[]
    total: number
    addToCart: (product: CartItem, quantity: number) => void
    removeFromCart: (product: CartItem | { id: string }) => void
    updateCart: (product: CartItem) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
}

// Helper function to calculate total
const calculateTotal = (cart: CartItem[]): number => {
    return cart.reduce((sum: number, item: CartItem) => {
        return sum + (item.price * item.quantity)
    }, 0)
}

const useCart = create<CartStore>()(
    persist(
        (set) => ({
            cart: [],
            total: 0,

            addToCart: (product, quantity) => set((state) => {
                // Check if product already exists in cart
                const existingItem = state.cart.find((item) => item.id === product.id)

                let newCart: CartItem[]
                if (existingItem) {
                    // If exists, increment quantity
                    newCart = state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                } else {
                    // If new, add to cart with quantity 1
                    newCart = [...state.cart, { ...product, quantity: quantity }]
                }

                return {
                    cart: newCart,
                    total: calculateTotal(newCart)
                }
            }),

            removeFromCart: (product) => set((state) => {
                const newCart = state.cart.filter((item) => item.id !== product.id)
                return {
                    cart: newCart,
                    total: calculateTotal(newCart)
                }
            }),

            updateCart: (product) => set((state) => {
                const newCart = state.cart.map((item) =>
                    item.id === product.id ? { ...item, ...product } : item
                )
                return {
                    cart: newCart,
                    total: calculateTotal(newCart)
                }
            }),

            updateQuantity: (productId, quantity) => set((state) => {
                const newCart = state.cart.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                )
                return {
                    cart: newCart,
                    total: calculateTotal(newCart)
                }
            }),

            clearCart: () => set({ cart: [], total: 0 }),
        }),
        {
            name: 'golf-cart-storage', // localStorage key
            storage: createJSONStorage(() => localStorage), // Use localStorage
        }
    )
)

export default useCart
export type { CartItem, CartStore }