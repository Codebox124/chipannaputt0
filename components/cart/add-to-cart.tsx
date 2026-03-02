'use client'

import { PlusCircleIcon } from 'lucide-react'
import { Product, ProductVariant } from '@/lib/shopify/types'
import { useMemo, useTransition, ReactNode } from 'react'
import { useCart } from './cart-context'

interface AddToCartProps {
  product: Product
  iconOnly?: boolean
  icon?: ReactNode
  className?: string
  onClick?: () => void
}

interface AddToCartButtonProps {
  product: Product
  selectedVariant?: ProductVariant | null
  iconOnly?: boolean
  icon?: ReactNode
  className?: string
}

const getBaseProductVariant = (product: Product): ProductVariant => {
  return {
    id: product.id,
    title: product.title,
    availableForSale: product.availableForSale,
    selectedOptions: [],
    price: product.priceRange.minVariantPrice,
  }
}

export function AddToCartButton({
  product,
  selectedVariant,
  className,
  iconOnly = false,
  icon = <PlusCircleIcon />,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isLoading, startTransition] = useTransition()

  const resolvedVariant = useMemo(() => {
    if (selectedVariant) return selectedVariant
    if (product.variants.length === 0) return getBaseProductVariant(product)
    if (product.variants.length === 1) return product.variants[0]
    return undefined
  }, [selectedVariant, product])

  const getButtonText = () => {
    if (!product.availableForSale) return 'Out Of Stock'
    if (!resolvedVariant) return 'Select one'
    return 'Add To Cart'
  }

  const isDisabled = !product.availableForSale || !resolvedVariant || isLoading

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (resolvedVariant) {
          startTransition(async () => {
            await addItem(resolvedVariant, product)
          })
        }
      }}
      className={className}
    >
      <button
        type="submit"
        aria-label={!resolvedVariant ? 'Select one' : 'Add to cart'}
        disabled={isDisabled}
        className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between gap-2"
      >
        {isLoading ? (
          <span>Adding...</span>
        ) : (
          <>
            <span>{getButtonText()}</span>
            {!iconOnly && <PlusCircleIcon size={18} />}
          </>
        )}
      </button>
    </form>
  )
}

export function AddToCart({
  product,
  className,
  iconOnly = false,
  icon = <PlusCircleIcon />,
}: AddToCartProps) {
  const resolvedVariant = useMemo(() => {
    if (product.variants.length === 0) return getBaseProductVariant(product)
    return product.variants[0]
  }, [product])

  return (
    <AddToCartButton
      product={product}
      selectedVariant={resolvedVariant}
      className={className}
      iconOnly={iconOnly}
      icon={icon}
    />
  )
}
