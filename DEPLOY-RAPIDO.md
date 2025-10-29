# 🚀 Deploy Rápido a Vercel

## Opción 1: Deploy desde la Web (Más Fácil)

1. **Ve a** https://vercel.com y haz login con GitHub

2. **Clic en "Add New"** → "Project"

3. **Importa tu repositorio** de GitHub

4. **Configura el proyecto:**
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: `npm run build` (ya viene por defecto)
   - Output Directory: `dist` (ya viene por defecto)

5. **Clic en "Deploy"** ✨

6. **Espera 1-2 minutos** y listo!

## Opción 2: Deploy desde la Terminal

```bash
# 1. Instalar Vercel CLI (solo una vez)
npm i -g vercel

# 2. Ir a la carpeta frontend
cd frontend

# 3. Login en Vercel
vercel login

# 4. Deploy
vercel

# 5. Para producción
vercel --prod
```

## 📱 Probar en tu Móvil

1. **Copia la URL** que te da Vercel (ejemplo: `https://tu-proyecto.vercel.app`)

2. **Abre la URL en tu móvil** (Chrome o Safari)

3. **Ve a "Punto de Venta"**

4. **Haz clic en "Iniciar cámara"**

5. **Permite el acceso a la cámara**

6. **Apunta a un código de barras** 📷

## ✅ Checklist

- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Root Directory configurado como `frontend`
- [ ] Deploy completado exitosamente
- [ ] URL funcionando
- [ ] Probado en móvil
- [ ] Cámara funcionando
- [ ] Códigos detectándose correctamente

## 🎯 Tips para el Escáner

- **Distancia:** 15-25 cm del código
- **Luz:** Buena iluminación
- **Estabilidad:** Mantén quieto 2-3 segundos
- **Cámara:** Usa la trasera (mejor enfoque)

## 🐛 Si algo falla

### La cámara no funciona
- ✅ Verifica que estés en HTTPS (Vercel lo hace automático)
- ✅ Da permisos de cámara cuando te lo pida
- ✅ Prueba en Chrome o Safari
- ✅ Recarga la página

### No detecta códigos
- ✅ Mejora la iluminación
- ✅ Aleja/acerca el código
- ✅ Mantén quieto más tiempo
- ✅ Usa el botón "🧪 Probar con código de ejemplo"

### Error de build
- ✅ Verifica que Root Directory sea `frontend`
- ✅ Asegúrate de que `package.json` esté en `frontend/`

---

**¡Listo para escanear en móvil!** 📱✨
