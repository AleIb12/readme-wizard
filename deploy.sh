#!/bin/bash

# 🚀 Script de Deployment para README Wizard en Vercel

echo "🎨 README Wizard - Deployment Script"
echo "======================================"

# Verificar si estamos en el directorio correcto
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html no encontrado. Ejecuta desde el directorio raíz del proyecto."
    exit 1
fi

echo "📋 Verificando archivos necesarios..."

# Verificar archivos críticos
files=("index.html" "app.js" "styles.css" "vercel.json" "package.json")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file encontrado"
    else
        echo "❌ $file no encontrado"
        exit 1
    fi
done

echo ""
echo "🔧 Preparando para deployment..."

# Instalar dependencias si existe package.json
if [ -f "package.json" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Ejecutar optimizaciones
if [ -f "optimize.js" ]; then
    echo "⚡ Optimizando archivos..."
    npm run optimize
fi

echo ""
echo "🌐 Iniciando deployment en Vercel..."

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📥 Vercel CLI no encontrado. Instalando..."
    npm install -g vercel
fi

# Deploy a Vercel
echo "🚀 Deploying..."
vercel --prod

echo ""
echo "✨ ¡Deployment completado!"
echo "🌐 Tu aplicación está disponible en Vercel"
echo ""
echo "🔗 Próximos pasos:"
echo "   1. Verifica tu aplicación en la URL proporcionada"
echo "   2. Configura un dominio personalizado si lo deseas"
echo "   3. Testea todas las funcionalidades"
echo ""
echo "🎉 ¡README Wizard está online!"
