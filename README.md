# 🛒 Market POS - Sistema de Punto de Venta Moderno

Sistema de punto de venta (POS) moderno para supermercados desarrollado con Vue 3, TypeScript y TailwindCSS. Incluye escáner de códigos de barras en tiempo real usando la cámara del dispositivo.

## ✨ Características

- 📷 **Escáner de códigos de barras** - Usa la cámara del dispositivo para escanear códigos EAN-13, UPC, Code128, QR y más
- 📱 **Optimizado para móviles** - Detección automática de cámara trasera, auto-focus y vibración
- 🛍️ **Sistema de ventas rápido** - Interfaz optimizada para procesar ventas de manera ágil
- 📦 **Gestión de inventario** - CRUD completo de productos con búsqueda y filtros
- 🎨 **UI moderna y responsive** - Diseño atractivo que funciona en móviles, tablets y desktop
- ⚡ **Rendimiento optimizado** - Construido con Vite para desarrollo y builds ultra rápidos
- 🔒 **TypeScript** - Código type-safe para mayor confiabilidad

## 🚀 Tecnologías

- **Vue 3** - Framework progresivo de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool de nueva generación
- **Pinia** - State management oficial para Vue 3
- **Vue Router** - Enrutamiento oficial para Vue
- **TailwindCSS** - Framework CSS utility-first
- **@zxing/browser** - Librería para escaneo de códigos de barras
- **Lucide Vue** - Iconos modernos y elegantes
- **Axios** - Cliente HTTP para peticiones al backend

## 📋 Requisitos previos

- Node.js 18+ y npm/yarn/pnpm
- Navegador moderno con soporte para cámara (Chrome, Firefox, Safari, Edge)
- HTTPS o localhost (requerido para acceso a la cámara)

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   cd market-pos/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` y configura la URL de tu backend:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 📦 Scripts disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Genera build optimizado para producción
npm run preview      # Preview del build de producción
```

## 🏗️ Estructura del proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   └── BarcodeScanner.vue
│   ├── views/              # Vistas/páginas
│   │   ├── HomeView.vue
│   │   ├── POSView.vue
│   │   └── InventoryView.vue
│   ├── stores/             # Stores de Pinia
│   │   └── cart.ts
│   ├── services/           # Servicios y API
│   │   └── api.ts
│   ├── types/              # Tipos TypeScript
│   │   └── index.ts
│   ├── router/             # Configuración de rutas
│   │   └── index.ts
│   ├── App.vue             # Componente raíz
│   ├── main.ts             # Punto de entrada
│   └── style.css           # Estilos globales
├── public/                 # Archivos estáticos
├── index.html              # HTML principal
├── vite.config.ts          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias y scripts
```

## 🎯 Uso

### Punto de Venta (POS)

1. Navega a la sección **Punto de Venta**
2. Haz clic en **Iniciar cámara** para activar el escáner
3. Apunta la cámara al código de barras del producto
4. El producto se agregará automáticamente al carrito
5. Ajusta cantidades según necesites
6. Haz clic en **Procesar venta** para completar la transacción

### Gestión de Inventario

1. Navega a **Inventario**
2. Usa el botón **Nuevo producto** para agregar productos
3. Completa el formulario con:
   - Código de barras
   - Nombre del producto
   - Precio y stock
   - Categoría (opcional)
4. Usa la búsqueda para filtrar productos
5. Edita o elimina productos según necesites

## 🔌 Integración con Backend

El frontend se conecta a un backend REST API. Configura la URL en el archivo `.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

### Endpoints esperados

```
GET    /products              # Listar todos los productos
GET    /products/search?q=    # Buscar productos por nombre
GET    /products/barcode/:id  # Buscar producto por código de barras
POST   /products              # Crear nuevo producto
PUT    /products/:id          # Actualizar producto
DELETE /products/:id          # Eliminar producto
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (Desktop y Android)
- ✅ Safari (Desktop y iOS)
- ✅ Firefox (Desktop y Android)
- ⚠️ Requiere HTTPS en producción para acceso a la cámara

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar los colores del tema:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Tus colores personalizados
      }
    }
  }
}
```

### Componentes

Los estilos de botones y componentes están en `src/style.css` usando las directivas `@apply` de Tailwind.

## 🚀 Deploy

### Deploy en Vercel (Recomendado)

**Ver guía completa:** [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

O desde la web:
1. Ve a https://vercel.com
2. Importa tu repositorio
3. Configura Root Directory: `frontend`
4. Deploy automático ✨

### Build de producción local

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Otras opciones de deploy

- **Netlify** - Arrastra la carpeta `dist`
- **GitHub Pages** - Usa GitHub Actions
- **Servidor propio** - Sirve la carpeta `dist` con nginx/apache

⚠️ **Importante:** El escáner de códigos requiere HTTPS en producción. Vercel y Netlify lo proporcionan automáticamente.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para modernizar los sistemas de punto de venta

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o consulta la documentación de las tecnologías utilizadas.
