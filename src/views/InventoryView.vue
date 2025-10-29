<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-green-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Package class="w-8 h-8" />
            <h1 class="text-2xl font-bold">Inventario</h1>
          </div>
          <router-link to="/" class="btn-secondary">
            <Home class="w-5 h-5 inline mr-2" />
            Inicio
          </router-link>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-6">
      <!-- Acciones -->
      <div class="card mb-6">
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex gap-2 flex-1 min-w-[300px]">
            <input
              v-model="searchQuery"
              @input="filterProducts"
              type="text"
              placeholder="Buscar productos..."
              class="input-field"
            />
            <button @click="loadProducts" class="btn-primary">
              <RefreshCw class="w-5 h-5" />
            </button>
          </div>
          <button @click="showAddModal = true" class="btn-success">
            <Plus class="w-5 h-5 inline mr-2" />
            Nuevo producto
          </button>
        </div>
      </div>

      <!-- Tabla de productos -->
      <div class="card overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Código</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Producto</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                <Package class="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No hay productos en el inventario</p>
              </td>
            </tr>
            <tr 
              v-for="product in filteredProducts" 
              :key="product.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-4 py-3 text-sm font-mono">{{ product.barcode }}</td>
              <td class="px-4 py-3">
                <p class="font-medium">{{ product.name }}</p>
                <p class="text-xs text-gray-500">{{ product.description }}</p>
              </td>
              <td class="px-4 py-3 font-semibold text-primary-600">
                ${{ product.price.toFixed(2) }}
              </td>
              <td class="px-4 py-3">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    product.stock > 10 ? 'bg-green-100 text-green-800' :
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]"
                >
                  {{ product.stock }} unidades
                </span>
              </td>
              <td class="px-4 py-3 text-sm">{{ product.category || '-' }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-center gap-2">
                  <button 
                    @click="editProduct(product)"
                    class="text-blue-600 hover:text-blue-800"
                    title="Editar"
                  >
                    <Edit class="w-5 h-5" />
                  </button>
                  <button 
                    @click="deleteProduct(product.id)"
                    class="text-red-600 hover:text-red-800"
                    title="Eliminar"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para agregar/editar producto -->
    <div 
      v-if="showAddModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div 
        class="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl"
        @click.stop
      >
        <h2 class="text-2xl font-bold mb-4">
          {{ editingProduct ? 'Editar producto' : 'Nuevo producto' }}
        </h2>
        
        <form @submit.prevent="saveProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Código de barras *
            </label>
            <input
              v-model="formData.barcode"
              type="text"
              required
              class="input-field"
              placeholder="7501234567890"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="input-field"
              placeholder="Nombre del producto"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              v-model="formData.description"
              class="input-field"
              rows="2"
              placeholder="Descripción opcional"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Precio *
              </label>
              <input
                v-model.number="formData.price"
                type="number"
                step="0.01"
                required
                class="input-field"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                v-model.number="formData.stock"
                type="number"
                required
                class="input-field"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <input
              v-model="formData.category"
              type="text"
              class="input-field"
              placeholder="Ej: Lácteos, Bebidas, etc."
            />
          </div>

          <div class="flex gap-2 pt-4">
            <button type="submit" class="btn-success flex-1">
              <Save class="w-5 h-5 inline mr-2" />
              Guardar
            </button>
            <button 
              type="button" 
              @click="closeModal"
              class="btn-secondary flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { productApi } from '@/services/api'
import type { Product } from '@/types'
import { 
  Package, 
  Home, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw,
  Save
} from 'lucide-vue-next'

const products = ref<Product[]>([])
const searchQuery = ref('')
const showAddModal = ref(false)
const editingProduct = ref<Product | null>(null)

const formData = ref({
  barcode: '',
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: ''
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.barcode.includes(query) ||
    p.category?.toLowerCase().includes(query)
  )
})

const loadProducts = async () => {
  products.value = await productApi.getAll()
}

const filterProducts = () => {
  // La búsqueda se hace reactivamente con computed
}

const editProduct = (product: Product) => {
  editingProduct.value = product
  formData.value = {
    barcode: product.barcode,
    name: product.name,
    description: product.description || '',
    price: product.price,
    stock: product.stock,
    category: product.category || ''
  }
  showAddModal.value = true
}

const saveProduct = async () => {
  if (editingProduct.value) {
    // Actualizar producto existente
    await productApi.update(editingProduct.value.id, formData.value)
  } else {
    // Crear nuevo producto
    await productApi.create(formData.value)
  }
  
  closeModal()
  await loadProducts()
}

const deleteProduct = async (id: string) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    await productApi.delete(id)
    await loadProducts()
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingProduct.value = null
  formData.value = {
    barcode: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  }
}

onMounted(() => {
  loadProducts()
})
</script>
