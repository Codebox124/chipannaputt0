// store/cart-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isCartOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotal: () => number
  hasItem: () => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (product) => {
        // Only allow 1 item in cart - replace existing
        set({
          items: [{ ...product, quantity: 1 }],
        })
      },

      removeItem: (productId) => {
        set({ items: [] })
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      getTotal: () => {
        const items = get().items
        return items.length > 0 ? items[0].price : 0
      },

      hasItem: () => {
        return get().items.length > 0
      },
    }),
    {
      name: 'chipannaputt-cart',
    }
  )
)