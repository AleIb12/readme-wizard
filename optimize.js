const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
const csso = require('csso');
const { minify: terser } = require('terser');

// Configuración de minificación HTML
const htmlMinifyOptions = {
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortClassName: true,
  useShortDoctype: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  preserveLineBreaks: false,
  minifyCSS: true,
  minifyJS: true
};

// Función para minificar HTML
function minifyHTML(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const minified = minify(html, htmlMinifyOptions);
    
    // Crear versión minificada
    const minPath = filePath.replace('.html', '.min.html');
    fs.writeFileSync(minPath, minified);
    console.log(`✅ HTML minificado: ${minPath}`);
  } catch (error) {
    console.error(`❌ Error minificando HTML: ${error.message}`);
  }
}

// Función para minificar CSS
function minifyCSS(filePath) {
  try {
    const css = fs.readFileSync(filePath, 'utf8');
    const result = csso.minify(css);
    
    // Crear versión minificada
    const minPath = filePath.replace('.css', '.min.css');
    fs.writeFileSync(minPath, result.css);
    console.log(`✅ CSS minificado: ${minPath}`);
  } catch (error) {
    console.error(`❌ Error minificando CSS: ${error.message}`);
  }
}

// Función para minificar JS
async function minifyJS(filePath) {
  try {
    const js = fs.readFileSync(filePath, 'utf8');
    const result = await terser(js, {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: true
    });
    
    // Crear versión minificada
    const minPath = filePath.replace('.js', '.min.js');
    fs.writeFileSync(minPath, result.code);
    console.log(`✅ JS minificado: ${minPath}`);
  } catch (error) {
    console.error(`❌ Error minificando JS: ${error.message}`);
  }
}

// Ejecutar optimizaciones
console.log('🚀 Iniciando optimización para producción...\n');

// Minificar archivos principales
if (fs.existsSync('index.html')) {
  minifyHTML('index.html');
}

if (fs.existsSync('styles.css')) {
  minifyCSS('styles.css');
}

if (fs.existsSync('app.js')) {
  minifyJS('app.js');
}

console.log('\n✨ Optimización completada para Vercel!');
