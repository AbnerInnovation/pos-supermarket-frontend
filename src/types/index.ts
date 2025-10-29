export interface Product {
  id: string
  barcode: string
  name: string
  description?: string
  price: number
  stock: number
  category?: string
  imageUrl?: string
}

export interface CartItem {
  product: Product
  quantity: number
  subtotal: number
}

export interface Sale {
  id: string
  items: CartItem[]
  total: number
  date: string
  paymentMethod: 'cash' | 'card' | 'transfer'
  status: 'completed' | 'pending' | 'cancelled'
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}
