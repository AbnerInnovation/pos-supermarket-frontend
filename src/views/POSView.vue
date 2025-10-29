<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-primary-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <ShoppingCart class="w-8 h-8" />
            <h1 class="text-2xl font-bold">Market POS</h1>
          </div>
          <router-link to="/" class="btn-secondary">
            <Home class="w-5 h-5 inline mr-2" />
            Inicio
          </router-link>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Panel izquierdo: Escáner y búsqueda -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Escáner de códigos de barras -->
          <div class="card">
            <BarcodeScanner 
              @product-found="handleProductFound"
              @product-not-found="handleProductNotFound"
            />
          </div>

          <!-- Búsqueda manual -->
          <div class="card">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <Search class="w-5 h-5" />
              Búsqueda manual
            </h3>
            <div class="flex gap-2">
              <input
                v-model="searchQuery"
                @keyup.enter="searchProducts"
                type="text"
                placeholder="Buscar por nombre o código..."
                class="input-field"
              />
              <button @click="searchProducts" class="btn-primary">
                Buscar
              </button>
            </div>

            <!-- Resultados de búsqueda -->
            <div v-if="searchResults.length > 0" class="mt-4 space-y-2">
              <h4 class="font-semibold text-gray-700">Resultados:</h4>
              <div 
                v-for="product in searchResults" 
                :key="product.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div>
                  <p class="font-medium">{{ product.name }}</p>
                  <p class="text-sm text-gray-600">{{ product.barcode }}</p>
                  <p class="text-lg font-bold text-primary-600">${{ product.price.toFixed(2) }}</p>
                </div>
                <button 
                  @click="addToCart(product)"
                  class="btn-success"
                >
                  <Plus class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel derecho: Carrito -->
        <div class="lg:col-span-1">
          <div class="card sticky top-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center justify-between">
              <span class="flex items-center gap-2">
                <ShoppingBag class="w-5 h-5" />
                Carrito
              </span>
              <span class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                {{ cartStore.itemCount }} items
              </span>
            </h3>

            <!-- Items del carrito -->
            <div v-if="cartStore.items.length === 0" class="text-center py-8 text-gray-500">
              <ShoppingCart class="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p>Carrito vacío</p>
              <p class="text-sm">Escanea o busca productos</p>
            </div>

            <div v-else class="space-y-3 max-h-96 overflow-y-auto">
              <div 
                v-for="item in cartStore.items" 
                :key="item.product.id"
                class="p-3 bg-gray-50 rounded-lg"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex-1">
                    <p class="font-medium text-sm">{{ item.product.name }}</p>
                    <p class="text-xs text-gray-600">{{ item.product.barcode }}</p>
                  </div>
                  <button 
                    @click="cartStore.removeItem(item.product.id)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <button 
                      @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                      class="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                    >
                      <Minus class="w-4 h-4" />
                    </button>
                    <span class="w-12 text-center font-semibold">{{ item.quantity }}</span>
                    <button 
                      @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                      class="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                    >
                      <Plus class="w-4 h-4" />
                    </button>
                  </div>
                  <p class="font-bold text-primary-600">${{ item.subtotal.toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Total y acciones -->
            <div v-if="cartStore.items.length > 0" class="mt-6 pt-4 border-t border-gray-200">
              <div class="flex justify-between items-center mb-4">
                <span class="text-xl font-bold">Total:</span>
                <span class="text-2xl font-bold text-primary-600">
                  ${{ cartStore.total.toFixed(2) }}
                </span>
              </div>

              <div class="space-y-2">
                <button 
                  @click="processSale"
                  class="w-full btn-success py-3 text-lg"
                >
                  <CheckCircle class="w-5 h-5 inline mr-2" />
                  Procesar venta
                </button>
                <button 
                  @click="clearCart"
                  class="w-full btn-danger"
                >
                  <X class="w-5 h-5 inline mr-2" />
                  Limpiar carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de venta -->
    <div 
      v-if="showSaleModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showSaleModal = false"
    >
      <div 
        class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
        @click.stop
      >
        <div class="text-center">
          <CheckCircle class="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 class="text-2xl font-bold mb-2">¡Venta procesada!</h2>
          <p class="text-gray-600 mb-4">Total: ${{ lastSaleTotal.toFixed(2) }}</p>
          <button 
            @click="showSaleModal = false"
            class="btn-primary w-full"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { productApi } from '@/services/api'
import BarcodeScanner from '@/components/BarcodeScanner.vue'
import type { Product } from '@/types'
import { 
  ShoppingCart, 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle, 
  X,
  Home
} from 'lucide-vue-next'

const cartStore = useCartStore()
const searchQuery = ref('')
const searchResults = ref<Product[]>([])
const showSaleModal = ref(false)
const lastSaleTotal = ref(0)

// Maneja cuando se encuentra un producto por código de barras
const handleProductFound = (product: Product) => {
  addToCart(product)
}

// Maneja cuando no se encuentra un producto
const handleProductNotFound = (barcode: string) => {
  console.log('Producto no encontrado:', barcode)
}

// Agrega un producto al carrito
const addToCart = (product: Product) => {
  if (product.stock > 0) {
    cartStore.addItem(product, 1)
  } else {
    alert('Producto sin stock disponible')
  }
}

// Busca productos por nombre
const searchProducts = async () => {
  if (!searchQuery.value.trim()) return
  
  searchResults.value = await productApi.searchByName(searchQuery.value)
}

// Procesa la venta
const processSale = () => {
  lastSaleTotal.value = cartStore.total
  showSaleModal.value = true
  
  // Aquí podrías enviar la venta al backend
  console.log('Venta procesada:', {
    items: cartStore.items,
    total: cartStore.total,
    date: new Date().toISOString()
  })
  
  // Limpiar carrito después de 2 segundos
  setTimeout(() => {
    cartStore.clearCart()
  }, 2000)
}

// Limpia el carrito
const clearCart = () => {
  if (confirm('¿Estás seguro de limpiar el carrito?')) {
    cartStore.clearCart()
  }
}
</script>
