# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar cualquier template de README para crear un perfil único y profesional.

## 📋 Lista de Verificación Rápida

### ✅ Información Básica
- [ ] Reemplazar `[Tu Nombre]` con tu nombre real
- [ ] Cambiar `TU_USERNAME` por tu nombre de usuario de GitHub
- [ ] Actualizar `tu-email@ejemplo.com` con tu email real
- [ ] Personalizar la descripción en "Sobre mí"

### ✅ Enlaces y Redes Sociales
- [ ] LinkedIn: `https://linkedin.com/in/tu-perfil`
- [ ] Twitter: `https://twitter.com/tu-usuario`
- [ ] Portfolio: `https://tu-portfolio.com`
- [ ] Email: `mailto:tu-email@ejemplo.com`

### ✅ Proyectos
- [ ] Reemplazar proyectos de ejemplo con tus propios trabajos
- [ ] Actualizar enlaces de demos y repositorios
- [ ] Añadir tecnologías reales utilizadas
- [ ] Incluir métricas o resultados si es posible

### ✅ Tecnologías
- [ ] Modificar badges según tu stack tecnológico
- [ ] Eliminar tecnologías que no uses
- [ ] Añadir nuevas tecnologías que domines
- [ ] Ordenar por nivel de experiencia

## 🎨 Personalización Avanzada

### 🌈 Cambiar Temas de Color

Los templates incluyen diferentes temas. Puedes cambiarlos modificando el parámetro `theme` en las URLs:

```markdown
<!-- Temas disponibles -->
&theme=dark
&theme=radical  
&theme=merko
&theme=gruvbox
&theme=tokyonight
&theme=onedark
&theme=cobalt
&theme=synthwave
&theme=highcontrast
&theme=dracula
```

### 📊 Configurar GitHub Stats

Para que las estadísticas funcionen correctamente:

1. Reemplaza `TU_USERNAME` con tu usuario de GitHub
2. Las stats se actualizarán automáticamente
3. Si quieres privacidad, añade `&include_all_commits=false&count_private=false`

### 🐍 Snake Animation

Para añadir la animación de la serpiente:

1. Ve a tu repositorio de perfil (mismo nombre que tu usuario)
2. Crea `.github/workflows/snake.yml`:

```yaml
name: Generate snake animation

on:
  schedule: # execute every 12 hours
    - cron: "* */12 * * *"
  workflow_dispatch:

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    
    steps:
      - name: generate snake.svg
        uses: Platane/snk/svg-only@v2
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: dist/github-contribution-grid-snake.svg
          
      - name: push snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v2.6.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 🎵 Spotify Integration

Para mostrar tu música actual en Spotify:

1. Ve a [Spotify for Developers](https://developer.spotify.com/dashboard/)
2. Crea una aplicación
3. Usa tu Spotify ID en el template
4. Reemplaza `TU_SPOTIFY_ID` con tu ID real

## 🎯 Tips Específicos por Template

### 👨‍💻 Professional Templates
- Enfócate en logros cuantificables
- Incluye certificaciones relevantes
- Mantén un tono profesional
- Destaca tecnologías demandadas en el mercado

### 🎨 Creative Templates
- Usa emojis libremente
- Experimenta con colores y GIFs
- Incluye elementos visuales llamativos
- Muestra tu personalidad

### 🎓 Student Templates
- Enfatiza el aprendizaje continuo
- Incluye proyectos escolares
- Menciona cursos y certificaciones
- Destaca tu motivación y objetivos

### 🎮 Gaming Templates
- Incluye tus juegos favoritos
- Menciona plataformas de gaming
- Destaca logros en game development
- Usa referencias gaming

## 🔧 Modificaciones Comunes

### Añadir Nuevas Secciones

```markdown
## 🆕 Nueva Sección
Contenido de tu nueva sección...

### Subsección
Más contenido específico...
```

### Cambiar Badges

Visita [Shields.io](https://shields.io/) para crear badges personalizados:

```markdown
![Custom Badge](https://img.shields.io/badge/Custom-Text-color?style=for-the-badge&logo=logoname&logoColor=white)
```

### Modificar Layout de Stats

```markdown
<!-- Layout horizontal -->
<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=dark"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&theme=dark"/>
</div>

<!-- Layout vertical -->
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=dark"/><br>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&theme=dark"/>
</div>
```

## 🚀 Consejos Pro

### 📝 Escritura Efectiva
- Usa bullet points para mejor legibilidad
- Mantén párrafos cortos
- Incluye keywords relevantes a tu área
- Sé específico con los logros

### 📊 Métricas y Números
- Incluye números cuando sea posible ("Mejoró performance en 30%")
- Menciona el alcance de tus proyectos ("Aplicación con 1000+ usuarios")
- Cuantifica tu experiencia ("3+ años en React")

### 🔗 Enlaces Estratégicos
- Todos los enlaces deben funcionar
- Usa demos en vivo cuando sea posible
- Enlaza a repositorios limpios y documentados
- Incluye documentación de proyectos

### 🎨 Visual Appeal
- Mantén consistencia en el formato
- No sobrecargues con emojis
- Usa alignment para mejor presentación
- Equilibra texto e imágenes

## ❓ Solución de Problemas

### Stats no se muestran
- Verifica que tu repositorio sea público
- Asegúrate de que TU_USERNAME esté correcto
- Espera unos minutos para que se actualice

### Badges no aparecen
- Verifica la sintaxis del badge
- Asegúrate de que los nombres de tecnologías estén correctos
- Usa shields.io para verificar badges

### GIFs muy pesados
- Usa GIFs optimizados (< 1MB)
- Considera usar SVG animations en su lugar
- Verifica que las URLs sean estables

## 🎉 ¡Listo para Brillar!

Recuerda que tu README es tu primera impresión. Tómate el tiempo para:

- ✨ Personalizarlo completamente
- 🔍 Revisar todos los enlaces
- 📝 Corregir ortografía y gramática
- 🎯 Mantenerlo actualizado

¡Tu perfil de GitHub será increíble! 🚀
