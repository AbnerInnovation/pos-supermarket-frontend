<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center text-white mb-12">
        <h1 class="text-5xl font-bold mb-4">🛒 Market POS</h1>
        <p class="text-xl opacity-90">Sistema de Punto de Venta Moderno</p>
      </div>

      <!-- Cards de navegación -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <!-- POS -->
        <router-link 
          to="/pos"
          class="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
        >
          <div class="text-center">
            <div class="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart class="w-10 h-10 text-primary-600" />
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Punto de Venta</h2>
            <p class="text-gray-600">
              Realiza ventas rápidas con escáner de códigos de barras
            </p>
          </div>
        </router-link>

        <!-- Inventario -->
        <router-link 
          to="/inventory"
          class="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
        >
          <div class="text-center">
            <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package class="w-10 h-10 text-green-600" />
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Inventario</h2>
            <p class="text-gray-600">
              Gestiona productos y stock de tu supermercado
            </p>
          </div>
        </router-link>

        <!-- Reportes -->
        <div 
          class="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 opacity-75 cursor-not-allowed"
        >
          <div class="text-center">
            <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 class="w-10 h-10 text-purple-600" />
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Reportes</h2>
            <p class="text-gray-600">
              Próximamente: Análisis de ventas y estadísticas
            </p>
          </div>
        </div>
      </div>

      <!-- Características -->
      <div class="mt-16 max-w-4xl mx-auto">
        <h3 class="text-3xl font-bold text-white text-center mb-8">
          ✨ Características principales
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
            <div class="flex items-start gap-4">
              <Camera class="w-8 h-8 flex-shrink-0" />
              <div>
                <h4 class="font-bold text-lg mb-2">Escáner de códigos</h4>
                <p class="text-sm opacity-90">
                  Escanea códigos de barras con la cámara del dispositivo. Compatible con EAN-13, UPC, Code128 y más.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
            <div class="flex items-start gap-4">
              <Zap class="w-8 h-8 flex-shrink-0" />
              <div>
                <h4 class="font-bold text-lg mb-2">Ventas rápidas</h4>
                <p class="text-sm opacity-90">
                  Interfaz optimizada para procesar ventas de manera ágil y eficiente.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
            <div class="flex items-start gap-4">
              <Smartphone class="w-8 h-8 flex-shrink-0" />
              <div>
                <h4 class="font-bold text-lg mb-2">Responsive</h4>
                <p class="text-sm opacity-90">
                  Funciona perfectamente en móviles, tablets y computadoras de escritorio.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
            <div class="flex items-start gap-4">
              <Shield class="w-8 h-8 flex-shrink-0" />
              <div>
                <h4 class="font-bold text-lg mb-2">Seguro y confiable</h4>
                <p class="text-sm opacity-90">
                  Sistema robusto con gestión de inventario en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-16 text-center text-white opacity-75">
        <p>Desarrollado con Vue 3 + TypeScript + TailwindCSS</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Camera, 
  Zap, 
  Smartphone,
  Shield
} from 'lucide-vue-next'
</script>
