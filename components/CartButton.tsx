// components/CartButton.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'

export default function CartButton() {
  const { toggleCart, hasItem } = useCartStore()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleCart}
      className="relative p-3 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart size={24} strokeWidth={1.5} />
      
      {/* Badge - Shows 1 when item in cart */}
      <AnimatePresence>
        {hasItem() && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#059c17] to-[#048a14] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
          >
            1
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}