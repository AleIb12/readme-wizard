# ⚙️ GitHub Actions Setup

Configuraciones útiles de GitHub Actions para mejorar tu perfil de GitHub.

## 🐍 Snake Animation

Esta action genera la famosa animación de la serpiente que "come" tus contribuciones.

### Configuración

1. En tu repositorio de perfil, crea el archivo `.github/workflows/snake.yml`:

```yaml
name: Generate snake animation

on:
  # Se ejecuta cada 12 horas
  schedule:
    - cron: "0 */12 * * *"
  
  # Permite ejecutar manualmente
  workflow_dispatch:

  # Se ejecuta en push al main
  push:
    branches:
    - main

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    
    steps:
      # Genera el SVG de la serpiente
      - name: generate snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: dist/github-contribution-grid-snake.svg
          
      # Sube el archivo a la rama output
      - name: push snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Uso en README

```markdown
![Snake animation](https://github.com/TU_USERNAME/TU_USERNAME/blob/output/github-contribution-grid-snake.svg)
```

## 📝 Auto-Update Blog Posts

Actualiza automáticamente la lista de tus últimos posts de blog.

### Configuración

1. Crea `.github/workflows/blog-post-workflow.yml`:

```yaml
name: Latest blog post workflow
on:
  schedule:
    # Se ejecuta cada hora
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest blog posts
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: gautamkrishnar/blog-post-workflow@master
        with:
          comment_tag_name: "BLOG-POST-LIST"
          feed_list: "https://tu-blog.com/feed.xml,https://medium.com/feed/@tu-usuario"
```

### Uso en README

```markdown
## 📚 Últimos Posts del Blog

<!-- BLOG-POST-LIST:START -->
<!-- BLOG-POST-LIST:END -->
```

## 📊 WakaTime Stats

Muestra estadísticas de tu tiempo de programación con WakaTime.

### Configuración

1. Regístrate en [WakaTime](https://wakatime.com/)
2. Instala el plugin en tu IDE
3. Crea `.github/workflows/waka-readme.yml`:

```yaml
name: Waka Readme

on:
  schedule:
    # Se ejecuta a las 12:00 UTC todos los días
    - cron: '0 12 * * *'
  workflow_dispatch:

jobs:
  update-readme:
    name: Update Readme with Metrics
    runs-on: ubuntu-latest
    steps:
      - uses: anmol098/waka-readme-stats@master
        with:
          WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
          SHOW_OS: "True"
          SHOW_PROJECTS: "True"
          SHOW_PROFILE_VIEWS: "False"
          SHOW_EDITORS: "True"
          SHOW_LANGUAGE_PER_REPO: "True"
          SHOW_TIMEZONE: "True"
          SHOW_COMMIT: "True"
          SHOW_DAYS_OF_WEEK: "True"
          SHOW_LANGUAGE: "True"
          SHOW_LINES_OF_CODE: "True"
```

### Configurar Secrets

1. Ve a Settings > Secrets and variables > Actions
2. Añade:
   - `WAKATIME_API_KEY`: Tu API key de WakaTime
   - `GH_TOKEN`: Personal access token de GitHub

### Uso en README

```markdown
## ⏰ Estadísticas de Programación

<!--START_SECTION:waka-->
<!--END_SECTION:waka-->
```

## 🎵 Spotify Now Playing

Muestra lo que estás escuchando en Spotify.

### Configuración Manual

Usa este servicio: [Spotify GitHub Profile](https://spotify-github-profile.vercel.app/)

### Uso en README

```markdown
## 🎵 Actualmente escuchando

[![Spotify](https://spotify-github-profile.vercel.app/api/view?uid=TU_SPOTIFY_ID&cover_image=true&theme=novatorem&show_offline=false&background_color=121212)](https://spotify-github-profile.vercel.app/api/view?uid=TU_SPOTIFY_ID&redirect=true)
```

## 📈 GitHub Profile Trophy

Muestra trofeos basados en tu actividad de GitHub.

### Uso directo (sin Action)

```markdown
## 🏆 GitHub Trophies

[![trophy](https://github-profile-trophy.vercel.app/?username=TU_USERNAME&theme=onedark)](https://github.com/ryo-ma/github-profile-trophy)
```

### Temas disponibles

- `flat`
- `onedark`
- `gruvbox`
- `dracula`
- `monokai`
- `chalk`
- `nord`
- `alduin`
- `darkhub`
- `juicyfresh`
- `buddhism`
- `oldie`
- `radical`
- `onestar`
- `discord`
- `algolia`
- `gitdimmed`
- `tokyonight`
- `matrix`
- `apprentice`
- `dark_dimmed`

## 📊 GitHub Profile Summary Cards

Tarjetas resumen adicionales para tu perfil.

### Uso

```markdown
![](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=TU_USERNAME&theme=vue)
![](https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=TU_USERNAME&theme=vue)
![](https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=TU_USERNAME&theme=vue)
![](https://github-profile-summary-cards.vercel.app/api/cards/stats?username=TU_USERNAME&theme=vue)
![](https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=TU_USERNAME&theme=vue&utcOffset=8)
```

## 🔥 GitHub Streak Stats

Muestra tu racha de contribuciones.

### Uso

```markdown
![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=TU_USERNAME&theme=dark)
```

### Temas disponibles

- `default`
- `dark`
- `highcontrast`
- `radical`
- `merko`
- `gruvbox`
- `tokyonight`
- `onedark`
- `cobalt`
- `synthwave`
- `dracula`

## 🎯 Profile Views Counter

Contador de visitas a tu perfil.

### Uso

```markdown
![Profile Views](https://komarev.com/ghpvc/?username=TU_USERNAME&color=blue&style=flat-square&label=Profile+Views)
```

### Estilos disponibles

- `flat`
- `flat-square`
- `plastic`
- `for-the-badge`

### Colores disponibles

- `brightgreen`
- `green`
- `yellowgreen`
- `yellow`
- `orange`
- `red`
- `lightgrey`
- `blue`
- `blueviolet`

## 📅 Isometric Commit Calendar

Calendario de commits en vista isométrica 3D.

### Configuración

1. Crea `.github/workflows/3d-calendar.yml`:

```yaml
name: GitHub-Profile-3D-Contrib

on:
  schedule:
    - cron: "0 18 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    name: generate-github-profile-3d-contrib
    steps:
      - uses: actions/checkout@v2
      - uses: yoshi389111/github-profile-3d-contrib@0.7.1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          USERNAME: ${{ github.repository_owner }}
```

### Uso en README

```markdown
![](./profile-3d-contrib/profile-gitblock.svg)
```

## 🚀 Tips para GitHub Actions

### 1. Evita ejecuciones excesivas
```yaml
# Limita a cambios específicos
on:
  push:
    paths:
      - 'README.md'
      - '.github/workflows/**'
```

### 2. Usa secrets para información sensible
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### 3. Añade timeout para evitar trabajos colgados
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10
```

### 4. Permite ejecución manual
```yaml
on:
  workflow_dispatch:
  schedule:
    - cron: "0 12 * * *"
```

## 🔒 Configuración de Tokens

Para que las Actions funcionen, necesitas configurar tokens:

### GitHub Token (automático)
```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Personal Access Token (para más permisos)

1. Ve a GitHub Settings > Developer settings > Personal access tokens
2. Genera un nuevo token con permisos necesarios
3. Añádelo como secret en tu repositorio

## 📝 Ejemplo Completo

Un workflow que combina varias actualizaciones:

```yaml
name: Update Profile
on:
  schedule:
    - cron: "0 */6 * * *"
  workflow_dispatch:

jobs:
  update-profile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      # Blog posts
      - uses: gautamkrishnar/blog-post-workflow@master
        with:
          comment_tag_name: "BLOG-POST-LIST"
          
      # Snake animation
      - name: generate snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: dist/github-contribution-grid-snake.svg
          
      - name: push snake.svg
        uses: crazy-max/ghaction-github-pages@v3
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

¡Con estas configuraciones tu perfil de GitHub será dinámico y siempre actualizado! 🚀
