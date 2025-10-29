<template>
  <div class="p-4 text-center">
    <h2 class="text-xl font-semibold mb-4">📷 Escanear código de barras</h2>

    <!-- Video donde se muestra la cámara -->
    <video 
      ref="videoRef" 
      class="mx-auto rounded-lg shadow-md w-full max-w-sm bg-black" 
      autoplay
      muted
      playsinline
    ></video>

    <!-- Resultado -->
    <div v-if="scannedCode" class="mt-4 bg-green-100 text-green-800 p-3 rounded-lg animate-pulse">
      <p class="font-semibold">✓ Código detectado:</p>
      <p class="text-lg font-mono">{{ scannedCode }}</p>
    </div>

    <!-- Estado de carga -->
    <div v-if="isLoading" class="mt-4 bg-blue-100 text-blue-800 p-3 rounded-lg">
      <p>🔍 Buscando producto...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="mt-4 bg-red-100 text-red-800 p-3 rounded-lg">
      <p>{{ error }}</p>
    </div>

    <!-- Botones -->
    <div class="mt-6 flex justify-center gap-3 flex-wrap">
      <button
        @click="startScanner"
        :disabled="isScanning"
        class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isScanning ? '📹 Escaneando...' : '▶️ Iniciar cámara' }}
      </button>
      <button
        @click="stopScanner"
        :disabled="!isScanning"
        class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ⏹️ Detener
      </button>
    </div>

    <!-- Instrucciones -->
    <div class="mt-4 text-sm text-gray-600">
      <p>💡 Coloca el código de barras frente a la cámara</p>
      <p>Compatible con EAN-13, UPC, Code128, QR y más</p>
      <button 
        @click="testBarcode" 
        class="mt-2 text-xs bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
        🧪 Probar con código de ejemplo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { productApi } from '@/services/api'
import type { Product } from '@/types'

const emit = defineEmits<{
  productFound: [product: Product]
  productNotFound: [barcode: string]
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const scannedCode = ref<string | null>(null)
const isScanning = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

let codeReader: BrowserMultiFormatReader | null = null
let stream: MediaStream | null = null

// Inicia el escáner
const startScanner = async () => {
  if (!videoRef.value) {
    error.value = 'No se pudo acceder al video'
    return
  }

  stopScanner()
  scannedCode.value = null
  error.value = null
  isScanning.value = true

  codeReader = new BrowserMultiFormatReader()
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(d => d.kind === 'videoinput')

    // Elegir cámara trasera si existe
    const backCamera = videoDevices.find(d => 
      d.label.toLowerCase().includes('back') ||
      d.label.toLowerCase().includes('rear') ||
      d.label.toLowerCase().includes('trasera') ||
      d.label.toLowerCase().includes('environment')
    )
    const deviceId = backCamera?.deviceId || videoDevices[0]?.deviceId
    if (!deviceId) throw new Error('No se encontró cámara disponible')

    stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } }
    })

    videoRef.value.srcObject = stream
    await videoRef.value.play()

    // Escaneo continuo usando decodeOnce, luego reiniciamos
    scanLoop(deviceId)
  } catch (err: any) {
    console.error(err)
    error.value = '❌ No se pudo iniciar la cámara. Verifica los permisos.'
    isScanning.value = false
  }
}

// Escaneo en loop para detectar múltiples códigos
const scanLoop = async (deviceId: string) => {
  if (!codeReader || !videoRef.value || !isScanning.value) return
  try {
    const result = await codeReader.decodeOnceFromVideoDevice(deviceId, videoRef.value)
    if (result) {
      const barcode = result.getText()
      scannedCode.value = barcode
      if ('vibrate' in navigator) navigator.vibrate(200)
      await searchProduct(barcode)
    }
  } catch (err) {
    // NotFoundException se ignora
  }
  // Llamamos nuevamente para continuar escaneando
  if (isScanning.value) scanLoop(deviceId)
}

// Buscar producto en backend
const searchProduct = async (barcode: string) => {
  isLoading.value = true
  error.value = null
  try {
    const product = await productApi.searchByBarcode(barcode)
    if (product) emit('productFound', product)
    else {
      emit('productNotFound', barcode)
      error.value = `Producto con código ${barcode} no encontrado`
    }
  } catch (err) {
    console.error(err)
    error.value = 'Error al buscar el producto'
  } finally {
    isLoading.value = false
  }
}

// Detener escáner y liberar recursos
const stopScanner = () => {
  isScanning.value = false
  scannedCode.value = null
  error.value = null
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
  if (videoRef.value) videoRef.value.srcObject = null
  codeReader = null
}

// Función de prueba
const testBarcode = async () => {
  const testCode = '7501052475011'
  scannedCode.value = testCode
  await searchProduct(testCode)
}

onUnmounted(() => stopScanner())
</script>

<style scoped>
video {
  aspect-ratio: 4 / 3;
  max-height: 400px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
