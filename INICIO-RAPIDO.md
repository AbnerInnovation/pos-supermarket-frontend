# 🚀 Guía de Inicio Rápido - Market POS

## 📋 Pasos para ejecutar el proyecto

### 1. Instalar dependencias

Abre una terminal en la carpeta `frontend` y ejecuta:

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto frontend:

```bash
cp .env.example .env
```

O crea manualmente el archivo `.env` con el siguiente contenido:

```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

---

## 🎯 Cómo usar el sistema

### Opción 1: Usar con datos de prueba (sin backend)

El frontend está listo para funcionar. Si no tienes un backend configurado, las búsquedas de productos devolverán resultados vacíos, pero puedes:

1. Ver la interfaz completa
2. Probar el escáner de códigos de barras
3. Agregar productos manualmente al inventario (se guardarán en memoria)

### Opción 2: Conectar con un backend

Para tener funcionalidad completa, necesitas un backend REST API con los siguientes endpoints:

```
GET    /api/products                    # Listar productos
GET    /api/products/search?q=          # Buscar por nombre
GET    /api/products/barcode/:barcode   # Buscar por código de barras
POST   /api/products                    # Crear producto
PUT    /api/products/:id                # Actualizar producto
DELETE /api/products/:id                # Eliminar producto
```

---

## 📱 Probar el escáner de códigos de barras

### Requisitos:
- Navegador con cámara (Chrome, Firefox, Safari, Edge)
- HTTPS o localhost (para acceso a la cámara)
- Permisos de cámara habilitados

### Pasos:
1. Ve a **Punto de Venta**
2. Haz clic en **Iniciar cámara**
3. Permite el acceso a la cámara cuando el navegador lo solicite
4. Apunta la cámara a un código de barras

### Códigos de barras compatibles:
- EAN-13 (códigos de productos europeos)
- UPC-A (códigos de productos norteamericanos)
- Code 128
- QR codes
- Y muchos más formatos

---

## 🛠️ Comandos útiles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con hot-reload

# Producción
npm run build        # Compilar para producción
npm run preview      # Vista previa del build de producción
```

---

## 🎨 Características implementadas

✅ **Escáner de códigos de barras** con @zxing/browser  
✅ **Sistema de carrito** con Pinia store  
✅ **Gestión de inventario** completa (CRUD)  
✅ **Búsqueda de productos** por nombre o código  
✅ **UI responsive** con TailwindCSS  
✅ **TypeScript** para type safety  
✅ **Iconos modernos** con Lucide Vue  

---

## 📂 Estructura del proyecto

```
frontend/
├── src/
│   ├── components/
│   │   └── BarcodeScanner.vue      # Componente del escáner
│   ├── views/
│   │   ├── HomeView.vue            # Página de inicio
│   │   ├── POSView.vue             # Punto de venta
│   │   └── InventoryView.vue       # Gestión de inventario
│   ├── stores/
│   │   └── cart.ts                 # Store del carrito
│   ├── services/
│   │   └── api.ts                  # Cliente API
│   └── types/
│       └── index.ts                # Tipos TypeScript
```

---

## 🔧 Solución de problemas

### La cámara no funciona
- Verifica que estés en HTTPS o localhost
- Revisa los permisos de cámara en tu navegador
- Prueba en Chrome/Edge que tienen mejor soporte

### Los productos no se cargan
- Verifica que el backend esté corriendo
- Revisa la URL en el archivo `.env`
- Abre la consola del navegador para ver errores

### Errores de compilación
- Elimina `node_modules` y ejecuta `npm install` nuevamente
- Verifica que tengas Node.js 18+ instalado

---

## 💡 Próximos pasos

1. **Crear un backend** con FastAPI, Express, o tu framework preferido
2. **Agregar autenticación** para múltiples usuarios
3. **Implementar reportes** de ventas y estadísticas
4. **Agregar impresión** de tickets de venta
5. **Sincronización offline** con Service Workers

---

¡Listo! Ya tienes un sistema POS moderno funcionando 🎉
