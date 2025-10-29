# 🚀 Guía de Deploy en Vercel

## 📱 Optimizado para Móviles

Este proyecto está optimizado para funcionar en dispositivos móviles con:
- ✅ Detección automática de cámara trasera
- ✅ Auto-focus continuo
- ✅ Vibración al detectar códigos
- ✅ Interfaz responsive

## 🔧 Pasos para Deploy

### 1. Preparar el proyecto

Asegúrate de que todos los cambios estén guardados:
```bash
git add .
git commit -m "Optimizado para móviles y listo para deploy"
```

### 2. Subir a GitHub (si aún no lo has hecho)

```bash
git init
git remote add origin https://github.com/TU_USUARIO/market-pos.git
git branch -M main
git push -u origin main
```

### 3. Deploy en Vercel

#### Opción A: Desde la web de Vercel

1. Ve a https://vercel.com
2. Haz clic en "Add New" → "Project"
3. Importa tu repositorio de GitHub
4. Configura:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Agrega variables de entorno (opcional):
   - `VITE_API_URL`: URL de tu backend (si tienes uno)
6. Haz clic en "Deploy"

#### Opción B: Desde la CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Ir a la carpeta frontend
cd frontend

# Deploy
vercel

# Para producción
vercel --prod
```

### 4. Configurar variables de entorno en Vercel

Si tienes un backend, configura la variable de entorno:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega: `VITE_API_URL` con el valor de tu API backend
4. Redeploy el proyecto

## 📱 Probar en Móvil

Una vez desplegado:

1. **Abre la URL en tu móvil** (Chrome o Safari)
2. Ve a **Punto de Venta**
3. Haz clic en **Iniciar cámara**
4. **Permite el acceso a la cámara** cuando te lo pida
5. Apunta la cámara trasera a un código de barras

### Tips para mejor detección:
- 📏 Mantén el código a 15-25 cm de la cámara
- 💡 Buena iluminación
- 🎯 Mantén el código centrado y quieto
- ⏱️ Espera 2-3 segundos sin mover

## 🔒 Importante: HTTPS

Vercel automáticamente proporciona HTTPS, que es **requerido** para acceder a la cámara en navegadores modernos.

## 🐛 Troubleshooting

### La cámara no funciona en móvil
- Verifica que hayas dado permisos de cámara
- Asegúrate de estar en HTTPS (Vercel lo hace automático)
- Prueba en Chrome o Safari (mejor compatibilidad)
- Recarga la página y vuelve a dar permisos

### No detecta códigos
- Asegúrate de usar la cámara trasera (mejor enfoque)
- Mejora la iluminación
- Mantén el código a la distancia correcta
- Usa el botón "🧪 Probar con código de ejemplo" para verificar que todo funciona

### Backend no responde
- Verifica que la variable `VITE_API_URL` esté configurada
- Asegúrate de que tu backend acepte CORS desde tu dominio de Vercel
- Revisa la consola del navegador para ver errores

## 📊 Monitoreo

Vercel proporciona:
- Analytics de uso
- Logs en tiempo real
- Métricas de rendimiento

Accede a ellos desde el dashboard de tu proyecto.

## 🔄 Actualizar el Deploy

Cada vez que hagas push a tu rama principal, Vercel automáticamente:
1. Detecta los cambios
2. Hace un nuevo build
3. Despliega la nueva versión

---

¡Listo para probar en móvil! 📱✨
