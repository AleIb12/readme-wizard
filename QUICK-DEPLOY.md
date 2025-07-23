# ⚡ Guía Rápida de Deployment - README Wizard

## 🚀 Opción 1: Script Automático (Recomendado)

```bash
# Ejecutar script de deployment
./deploy.sh
```

## 🌐 Opción 2: Vercel CLI Manual

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login en Vercel
vercel login

# 3. Deploy
vercel --prod
```

## 📱 Opción 3: GitHub Integration

1. **Push a GitHub**:
   ```bash
   git add .
   git commit -m "Deploy: README Wizard optimizado para Vercel"
   git push origin main
   ```

2. **Conectar en Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio GitHub
   - Configura el proyecto (usar configuración por defecto)
   - Deploy automático

## ⚙️ Configuración de Proyecto en Vercel

| Campo | Valor |
|:------|:------|
| **Framework Preset** | Other |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` (opcional) |
| **Output Directory** | `./` |
| **Install Command** | `npm install` |

## 🎯 URLs de Resultado

- **Preview**: `https://readme-wizard-[hash].vercel.app`
- **Production**: `https://readme-wizard.vercel.app`
- **Custom Domain**: Tu dominio personalizado

## ✅ Checklist Post-Deployment

- [ ] ✅ Verificar que la página principal carga
- [ ] ✅ Probar selección de templates
- [ ] ✅ Verificar formulario de personalización
- [ ] ✅ Testear descarga de README
- [ ] ✅ Comprobar responsive en móviles
- [ ] ✅ Validar performance con Lighthouse
- [ ] ✅ Verificar SEO básico

## 🔧 Troubleshooting

### Error de Build
```bash
# Limpiar cache
npm run build
vercel --prod --force
```

### Problemas de rutas
- Verificar `vercel.json` está presente
- Confirmar rutas en configuración

### Performance Issues
```bash
# Optimizar archivos
npm run optimize
```

## 🎉 ¡Listo!

Tu README Wizard está optimizado y listo para Vercel con:
- ⚡ Performance máximo
- 🛡️ Headers de seguridad
- 📱 PWA ready
- 🔍 SEO optimizado
- 🌐 CDN global
