// components/Product.tsx
'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useCartStore, Product as ProductType } from '@/store/cart-store'
import Image from 'next/image'

interface ProductProps {
  product: ProductType
  variant?: 'full' | 'cart'
}

export default function Product({ product, variant = 'full' }: ProductProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem, removeItem, openCart, hasItem } = useCartStore()
  const itemInCart = useCartStore((state) => 
    state.items.find((item) => item.id === product.id)
  )

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product)
    
    setTimeout(() => {
      setIsAdding(false)
      openCart()
    }, 300)
  }

  const handleBuyNow = () => {
    addItem(product)
    window.location.href = 'https://13dba3e2-5a62-4c12-9911-99b4dfdd3096.paylinks.godaddy.com/putt-kit'
  }

  const handleRemove = () => {
    removeItem(product.id)
  }

  // Cart variant (simplified for cart modal)
  if (variant === 'cart') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
      >
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate mb-1">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Qty: 1
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors h-fit"
        >
          <Trash2 size={18} />
        </button>
      </motion.div>
    )
  }

  // Full variant (for product pages and home)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-3/4 ml-auto mr-auto"
    >
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Floating Badge */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
            ${product.price}
          </div>

          {/* In Cart Badge */}
          {itemInCart && (
            <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <ShoppingCart size={16} />
              In Cart
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            {itemInCart ? (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={openCart}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                View in Cart
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-white border-2 border-black text-black font-bold py-4 rounded-2xl hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <ShoppingCart 
                  size={20} 
                  className={isAdding ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}
                />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              className="w-full bg-gradient-to-r from-[#059c17] to-[#048a14] text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-green-200 transition-all duration-300"
            >
              Buy Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}