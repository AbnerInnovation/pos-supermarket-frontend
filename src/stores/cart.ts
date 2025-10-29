import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CartItem } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.subtotal, 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  function addItem(product: Product, quantity: number = 1) {
    const existingItem = items.value.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
      existingItem.subtotal = existingItem.quantity * existingItem.product.price
    } else {
      items.value.push({
        product,
        quantity,
        subtotal: product.price * quantity
      })
    }
  }

  function removeItem(productId: string) {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        item.subtotal = item.quantity * item.product.price
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})
