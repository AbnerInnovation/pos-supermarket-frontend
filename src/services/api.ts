import axios from 'axios'
import type { Product, ApiResponse } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const productApi = {
  async searchByBarcode(barcode: string): Promise<Product | null> {
    try {
      const response = await api.get<ApiResponse<Product>>(`/products/barcode/${barcode}`)
      return response.data.data
    } catch (error) {
      console.error('Error buscando producto por código de barras:', error)
      return null
    }
  },

  async searchByName(query: string): Promise<Product[]> {
    try {
      const response = await api.get<ApiResponse<Product[]>>(`/products/search`, {
        params: { q: query }
      })
      return response.data.data
    } catch (error) {
      console.error('Error buscando productos:', error)
      return []
    }
  },

  async getAll(): Promise<Product[]> {
    try {
      const response = await api.get<ApiResponse<Product[]>>('/products')
      return response.data.data
    } catch (error) {
      console.error('Error obteniendo productos:', error)
      return []
    }
  },

  async create(product: Omit<Product, 'id'>): Promise<Product | null> {
    try {
      const response = await api.post<ApiResponse<Product>>('/products', product)
      return response.data.data
    } catch (error) {
      console.error('Error creando producto:', error)
      return null
    }
  },

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    try {
      const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product)
      return response.data.data
    } catch (error) {
      console.error('Error actualizando producto:', error)
      return null
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await api.delete(`/products/${id}`)
      return true
    } catch (error) {
      console.error('Error eliminando producto:', error)
      return false
    }
  }
}

export default api
