'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { Product, ProductVariant } from '@/lib/shopify/types'

interface CartItem {
  id: string
  product: Product
  variant: ProductVariant
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (variant: ProductVariant, product: Product, quantity?: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('chip-anna-putt-cart')
        if (savedCart) {
          setItems(JSON.parse(savedCart))
        }
      } catch (error) {
        console.error('[v0] Failed to load cart from localStorage:', error)
      }
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem('chip-anna-putt-cart', JSON.stringify(items))
      } catch (error) {
        console.error('[v0] Failed to save cart to localStorage:', error)
      }
    }
  }, [items, isInitialized])

  const addItem = useCallback(
    async (variant: ProductVariant, product: Product, quantity = 1) => {
      setIsLoading(true)
      try {
        // Check if item already exists
        const existingItem = items.find(
          (item) => item.variant.id === variant.id
        )

        if (existingItem) {
          // Update quantity if item exists
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.variant.id === variant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          )
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}`,
            product,
            variant,
            quantity,
          }
          setItems((prevItems) => [...prevItems, newItem])
        }
      } finally {
        setIsLoading(false)
      }
    },
    [items]
  )

  const removeItem = useCallback(async (itemId: string) => {
    setIsLoading(true)
    try {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    setIsLoading(true)
    try {
      if (quantity <= 0) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
      } else {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
        )
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearCart = useCallback(async () => {
    setIsLoading(true)
    try {
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
