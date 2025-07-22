// README Wizard - JavaScript Application
class ReadmeWizard {
    constructor() {
        this.selectedTemplate = null;
        this.templateData = {};
        this.technologies = this.getTechnologies();
        this.templates = this.getTemplates();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTechnologies();
    }

    bindEvents() {
        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectTemplate(e.currentTarget.dataset.template);
            });
        });

        // Form submission
        document.getElementById('readme-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateReadme();
        });

        // Navigation buttons
        document.getElementById('back-to-templates').addEventListener('click', () => {
            this.showSection('template-selection');
        });

        document.getElementById('back-to-form').addEventListener('click', () => {
            this.showSection('customization-form');
        });

        // Add project button
        document.getElementById('add-project').addEventListener('click', () => {
            this.addProjectField();
        });

        // Tab switching
        document.getElementById('preview-tab').addEventListener('click', () => {
            this.showPreviewTab();
        });

        document.getElementById('code-tab').addEventListener('click', () => {
            this.showCodeTab();
        });

        // Copy and download buttons
        document.getElementById('copy-readme').addEventListener('click', () => {
            this.copyToClipboard();
        });

        document.getElementById('download-readme').addEventListener('click', () => {
            this.downloadReadme();
        });
    }

    selectTemplate(templateName) {
        this.selectedTemplate = templateName;
        
        // Update visual selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-template="${templateName}"]`);
        selectedCard.classList.add('selected');

        // Add loading animation
        selectedCard.classList.add('loading');

        // Show customization form with delay for better UX
        setTimeout(() => {
            selectedCard.classList.remove('loading');
            this.showSection('customization-form');
            this.loadTemplateDefaults(templateName);
        }, 500);
    }

    loadTemplateDefaults(templateName) {
        const defaults = this.getTemplateDefaults(templateName);
        
        // Pre-fill some fields based on template
        Object.keys(defaults).forEach(key => {
            const element = document.getElementById(key);
            if (element && !element.value) {
                element.value = defaults[key];
            }
        });
    }

    getTemplateDefaults(templateName) {
        const defaults = {
            'frontend-developer': {
                role: 'Frontend Developer',
                learning: 'React 18, Next.js 13'
            },
            'backend-developer': {
                role: 'Backend Developer', 
                learning: 'Microservices, Kubernetes'
            },
            'fullstack-developer': {
                role: 'Full Stack Developer',
                learning: 'Cloud Architecture, DevOps'
            },
            'data-scientist': {
                role: 'Data Scientist',
                learning: 'Machine Learning, Deep Learning'
            },
            'gaming-profile': {
                role: 'Game Developer',
                learning: 'Unity 2023, Unreal Engine 5'
            },
            'student-profile': {
                role: 'Computer Science Student',
                learning: 'Data Structures, Algorithms'
            }
        };

        return defaults[templateName] || {};
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show target section
        document.getElementById(sectionId).classList.remove('hidden');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderTechnologies() {
        const container = document.getElementById('tech-selection');
        
        this.technologies.forEach(tech => {
            const techElement = document.createElement('div');
            techElement.className = 'tech-item cursor-pointer p-2 border border-gray-300 rounded-md text-center transition-colors hover:bg-blue-50 hover:border-blue-300';
            techElement.innerHTML = `
                <input type="checkbox" name="technologies[]" value="${tech.name}" class="hidden">
                <div class="text-xs font-medium">${tech.name}</div>
                <div class="text-xs text-gray-500">${tech.category}</div>
            `;

            techElement.addEventListener('click', () => {
                const checkbox = techElement.querySelector('input');
                checkbox.checked = !checkbox.checked;
                
                if (checkbox.checked) {
                    techElement.classList.add('selected');
                } else {
                    techElement.classList.remove('selected');
                }
            });

            container.appendChild(techElement);
        });
    }

    addProjectField() {
        const container = document.getElementById('projects-container');
        const projectCount = container.children.length;
        
        if (projectCount >= 5) {
            alert('Máximo 5 proyectos permitidos');
            return;
        }

        const projectElement = document.createElement('div');
        projectElement.className = 'project-item bg-gray-50 p-4 rounded-lg mb-4';
        projectElement.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                <h4 class="font-medium text-gray-700">Proyecto ${projectCount + 1}</h4>
                <button type="button" class="remove-project text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del Proyecto</label>
                    <input type="text" name="project_name[]" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                           placeholder="Mi Proyecto Increíble">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Enlace del Proyecto</label>
                    <input type="url" name="project_link[]" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                           placeholder="https://github.com/tu-usuario/proyecto">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tecnologías Usadas</label>
                    <input type="text" name="project_tech[]" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                           placeholder="React, Node.js, MongoDB">
                </div>
            </div>
            <div class="mt-3">
                <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea name="project_desc[]" rows="2" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Breve descripción del proyecto..."></textarea>
            </div>
        `;

        // Add remove functionality
        projectElement.querySelector('.remove-project').addEventListener('click', () => {
            projectElement.remove();
        });

        container.appendChild(projectElement);
    }

    generateReadme() {
        // Add loading state
        const submitButton = document.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generando...';
        submitButton.classList.add('loading');

        const formData = new FormData(document.getElementById('readme-form'));
        this.templateData = this.processFormData(formData);
        
        // Simulate processing time for better UX
        setTimeout(() => {
            const readmeContent = this.buildReadmeContent();
            this.displayPreview(readmeContent);
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('loading');
            
            this.showSection('preview-section');
        }, 1000);
    }

    processFormData(formData) {
        const data = {};
        
        // Basic fields
        for (let [key, value] of formData.entries()) {
            if (key.includes('[]')) {
                const cleanKey = key.replace('[]', '');
                if (!data[cleanKey]) data[cleanKey] = [];
                data[cleanKey].push(value);
            } else {
                data[key] = value;
            }
        }

        // Process projects
        if (data.project_name) {
            data.projects = [];
            for (let i = 0; i < data.project_name.length; i++) {
                if (data.project_name[i].trim()) {
                    data.projects.push({
                        name: data.project_name[i],
                        link: data.project_link[i] || '#',
                        tech: data.project_tech[i] || '',
                        description: data.project_desc[i] || ''
                    });
                }
            }
        }

        // Process technologies
        data.selectedTechnologies = data.technologies || [];

        return data;
    }

    buildReadmeContent() {
        const template = this.templates[this.selectedTemplate];
        let content = template.content;

        // Replace placeholders
        content = content.replace(/\[Tu Nombre\]/g, this.templateData.name || '[Tu Nombre]');
        content = content.replace(/TU_USERNAME/g, this.templateData.username || 'TU_USERNAME');
        content = content.replace(/\[Tu Especialidad\]/g, this.templateData.role || '[Tu Especialidad]');
        content = content.replace(/\[Tu Ciudad, País\]/g, this.templateData.location || '[Tu Ubicación]');
        content = content.replace(/tu-email@ejemplo\.com/g, this.templateData.email || 'tu-email@ejemplo.com');
        content = content.replace(/mailto:tu-email@gmail\.com/g, `mailto:${this.templateData.email || 'tu-email@gmail.com'}`);
        
        // Social links
        if (this.templateData.linkedin) {
            content = content.replace(/https:\/\/linkedin\.com\/in\/tu-perfil/g, this.templateData.linkedin);
        }
        if (this.templateData.twitter) {
            content = content.replace(/https:\/\/twitter\.com\/tu-usuario/g, this.templateData.twitter);
        }
        if (this.templateData.portfolio) {
            content = content.replace(/https:\/\/tu-portfolio\.com/g, this.templateData.portfolio);
        }

        // Current project and learning
        if (this.templateData.currentProject) {
            content = content.replace(/\[Proyecto actual\]/g, this.templateData.currentProject);
            content = content.replace(/\[Proyecto\/trabajo actual\]/g, this.templateData.currentProject);
        }
        if (this.templateData.learning) {
            content = content.replace(/\[Nueva tecnología\/skill\]/g, this.templateData.learning);
            content = content.replace(/\[Tecnologías que estás aprendiendo\]/g, this.templateData.learning);
        }
        if (this.templateData.funFact) {
            content = content.replace(/\[Algo interesante sobre ti\]/g, this.templateData.funFact);
        }

        // About section
        if (this.templateData.about) {
            const aboutRegex = /Desarrollador.*?\./g;
            content = content.replace(aboutRegex, this.templateData.about);
        }

        // Replace projects if any
        if (this.templateData.projects && this.templateData.projects.length > 0) {
            content = this.replaceProjects(content);
        }

        return content;
    }

    replaceProjects(content) {
        // This is a simplified version - in a real implementation you'd want more sophisticated project replacement
        const projects = this.templateData.projects;
        
        // Replace first project
        if (projects[0]) {
            content = content.replace(/\[Proyecto Estrella\]/g, projects[0].name);
            content = content.replace(/link-proyecto/g, projects[0].link);
        }
        
        return content;
    }

    displayPreview(content) {
        // Store the content
        this.generatedContent = content;
        
        // Display in code tab
        document.getElementById('readme-code').textContent = content;
        
        // For preview tab, we'll show a simplified HTML version
        const htmlPreview = this.markdownToHtml(content);
        document.getElementById('markdown-preview').innerHTML = htmlPreview;
    }

    markdownToHtml(markdown) {
        // Simple markdown to HTML conversion for preview
        let html = markdown
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 200px;">')
            .replace(/```[\s\S]*?```/g, '<pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;"><code>$&</code></pre>')
            .replace(/`([^`]+)`/g, '<code style="background: #f4f4f4; padding: 2px 4px; border-radius: 3px;">$1</code>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .replace(/\n/g, '<br>');

        return `<div style="max-width: 800px; margin: 0 auto; line-height: 1.6;">${html}</div>`;
    }

    showPreviewTab() {
        document.getElementById('preview-tab').classList.add('border-b-2', 'border-purple-500', 'text-purple-600');
        document.getElementById('code-tab').classList.remove('border-b-2', 'border-purple-500', 'text-purple-600');
        
        document.getElementById('markdown-preview').classList.remove('hidden');
        document.getElementById('markdown-code').classList.add('hidden');
    }

    showCodeTab() {
        document.getElementById('code-tab').classList.add('border-b-2', 'border-purple-500', 'text-purple-600');
        document.getElementById('preview-tab').classList.remove('border-b-2', 'border-purple-500', 'text-purple-600');
        
        document.getElementById('markdown-code').classList.remove('hidden');
        document.getElementById('markdown-preview').classList.add('hidden');
    }

    copyToClipboard() {
        navigator.clipboard.writeText(this.generatedContent).then(() => {
            // Show success feedback
            const button = document.getElementById('copy-readme');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check mr-2"></i>¡Copiado!';
            button.classList.add('success');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('success');
            }, 2000);
        }).catch(err => {
            // Fallback for older browsers
            this.fallbackCopyToClipboard();
        });
    }

    fallbackCopyToClipboard() {
        const textArea = document.createElement('textarea');
        textArea.value = this.generatedContent;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('¡Copiado al portapapeles!', 'success');
        } catch (err) {
            this.showNotification('Error al copiar. Inténtalo manualmente.', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    downloadReadme() {
        const blob = new Blob([this.generatedContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getTechnologies() {
        return [
            // Frontend
            { name: 'HTML5', category: 'Frontend' },
            { name: 'CSS3', category: 'Frontend' },
            { name: 'JavaScript', category: 'Frontend' },
            { name: 'TypeScript', category: 'Frontend' },
            { name: 'React', category: 'Frontend' },
            { name: 'Vue.js', category: 'Frontend' },
            { name: 'Angular', category: 'Frontend' },
            { name: 'Svelte', category: 'Frontend' },
            { name: 'Next.js', category: 'Frontend' },
            { name: 'Tailwind CSS', category: 'Frontend' },
            { name: 'Bootstrap', category: 'Frontend' },
            { name: 'SASS', category: 'Frontend' },
            
            // Backend
            { name: 'Node.js', category: 'Backend' },
            { name: 'Python', category: 'Backend' },
            { name: 'Java', category: 'Backend' },
            { name: 'C#', category: 'Backend' },
            { name: 'PHP', category: 'Backend' },
            { name: 'Go', category: 'Backend' },
            { name: 'Rust', category: 'Backend' },
            { name: 'Express.js', category: 'Backend' },
            { name: 'Django', category: 'Backend' },
            { name: 'Flask', category: 'Backend' },
            { name: 'FastAPI', category: 'Backend' },
            { name: 'Spring Boot', category: 'Backend' },
            
            // Database
            { name: 'MySQL', category: 'Database' },
            { name: 'PostgreSQL', category: 'Database' },
            { name: 'MongoDB', category: 'Database' },
            { name: 'Redis', category: 'Database' },
            { name: 'Firebase', category: 'Database' },
            { name: 'SQLite', category: 'Database' },
            
            // Cloud & DevOps
            { name: 'AWS', category: 'Cloud' },
            { name: 'Google Cloud', category: 'Cloud' },
            { name: 'Azure', category: 'Cloud' },
            { name: 'Docker', category: 'DevOps' },
            { name: 'Kubernetes', category: 'DevOps' },
            { name: 'Git', category: 'Tools' },
            { name: 'GitHub', category: 'Tools' },
            
            // Mobile
            { name: 'React Native', category: 'Mobile' },
            { name: 'Flutter', category: 'Mobile' },
            { name: 'Swift', category: 'Mobile' },
            { name: 'Kotlin', category: 'Mobile' },
            
            // Game Dev
            { name: 'Unity', category: 'Game Dev' },
            { name: 'Unreal Engine', category: 'Game Dev' },
            { name: 'Godot', category: 'Game Dev' },
            
            // Data Science
            { name: 'Pandas', category: 'Data Science' },
            { name: 'NumPy', category: 'Data Science' },
            { name: 'TensorFlow', category: 'ML/AI' },
            { name: 'PyTorch', category: 'ML/AI' },
            { name: 'Scikit-learn', category: 'ML/AI' }
        ];
    }

    getTemplates() {
        // In a real implementation, these would be loaded from the actual template files
        return {
            'classic-professional': {
                name: 'Classic Professional',
                content: `# 👋 Hola, soy [Tu Nombre]

## 🚀 Sobre mí

Soy un desarrollador apasionado con experiencia en [Tu Especialidad]. Me encanta crear soluciones innovadoras y contribuir a proyectos que marquen la diferencia.

- 🔭 Actualmente trabajando en **[Proyecto actual]**
- 🌱 Aprendiendo **[Nueva tecnología/skill]**
- 💬 Pregúntame sobre **[Tus especialidades]**
- 📫 Cómo contactarme: **tu-email@ejemplo.com**
- ⚡ Dato curioso: **[Algo interesante sobre ti]**

## 📊 Estadísticas de GitHub

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=dracula&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&langs_count=7&theme=dracula"/>
</div>

## 🌐 Conéctate conmigo

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:tu-email@gmail.com)`
            },
            'minimal-clean': {
                name: 'Minimal Clean',
                content: `# [Tu Nombre]

**[Tu Especialidad]** | **[Tu Ubicación]**

---

## Acerca de mí

Desarrollador enfocado en crear soluciones elegantes y eficientes.

**Actualmente:** [Proyecto actual]  
**Aprendiendo:** [Nueva tecnología/skill]  

---

## Estadísticas

<img align="center" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=minimal&hide_border=true" />

---

## Contacto

**Email:** tu-email@ejemplo.com  
**LinkedIn:** [tu-perfil](https://linkedin.com/in/tu-perfil)`
            },
            'creative-colorful': {
                name: 'Creative Colorful',
                content: `# 🎨✨ ¡Hola Mundo! Soy [Tu Nombre] ✨🎨

<div align="center">
  
  ![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&pause=1000&color=FF6B6B&center=true&vCenter=true&random=false&width=600&lines=%C2%A1Hola!+Soy+[Tu+Nombre];Desarrollador+Creativo;%C2%A1Vamos+a+crear+algo+incre%C3%ADble!)

</div>

## 🌈 Sobre mí

\`\`\`javascript
const developer = {
    name: "[Tu Nombre]",
    role: "[Tu Especialidad]",
    location: "[Tu Ubicación]",
    currentFocus: "[Proyecto actual]",
    funFact: "[Algo interesante sobre ti]"
};
\`\`\`

## 📊 Mis Stats de GitHub

<div align="center">
  <img height="200em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true"/>
  <img height="200em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&langs_count=8&theme=tokyonight"/>
</div>

## 🌐 ¡Conectemos!

<div align="center">
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
  [![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu-email@gmail.com)

</div>`
            },
            'frontend-developer': {
                name: 'Frontend Developer',
                content: `# 🎨 Frontend Developer

<div align="center">
  <h1>¡Hola! Soy [Tu Nombre] 👋</h1>
  <h3>🎨 Frontend Developer | 💻 UI/UX Enthusiast | 🚀 React Specialist</h3>
</div>

## 👨‍💻 Sobre mí

Soy un desarrollador frontend apasionado por crear experiencias de usuario excepcionales.

- 🔭 Trabajando en **[Proyecto actual]**
- 🌱 Perfeccionando mis habilidades en **[Nueva tecnología/skill]**
- 💬 Pregúntame sobre **React, Vue, CSS, JavaScript, UX/UI**
- 📫 Contacto: **tu-email@ejemplo.com**

## 📊 GitHub Stats

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=react&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&langs_count=7&theme=react"/>
</div>

## 🌐 Conéctate conmigo

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu-email@gmail.com)`
            },
            'backend-developer': {
                name: 'Backend Developer',
                content: `# ⚙️ Backend Developer

<div align="center">
  <h1>👋 ¡Hola! Soy [Tu Nombre]</h1>
  <h3>⚙️ Backend Engineer | 🏗️ System Architect | 🚀 API Specialist</h3>
</div>

## 🎯 Sobre mí

Desarrollador backend especializado en crear sistemas escalables y robustos.

- 🔭 Construyendo **[Proyecto actual]**
- 🌱 Profundizando en **[Nueva tecnología/skill]**
- 💬 Pregúntame sobre **APIs, Databases, DevOps, System Design**
- 📫 Contacto: **tu-email@ejemplo.com**

## 📊 GitHub Analytics

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=algolia&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&langs_count=7&theme=algolia"/>
</div>

## 🌐 Conecta conmigo

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu-email@gmail.com)`
            },
            'fullstack-developer': {
                name: 'Full Stack Developer',
                content: `# 🚀 Full Stack Developer

<div align="center">
  <h1>👋 ¡Hola! Soy [Tu Nombre]</h1>
  <h3>🚀 Full Stack Engineer | 🌐 End-to-End Solutions | 💡 Problem Solver</h3>
</div>

## 🎯 Sobre mí

Desarrollador full stack con pasión por crear aplicaciones completas desde el concepto hasta el despliegue.

- 🔭 Desarrollando **[Proyecto actual]**
- 🌱 Explorando **[Nueva tecnología/skill]**
- 💬 Pregúntame sobre **React, Node.js, Python, DevOps, System Design**
- 📫 Contacto: **tu-email@ejemplo.com**

## 📊 GitHub Stats

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=radical&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&langs_count=8&theme=radical"/>
</div>

## 🌐 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu-email@gmail.com)`
            },
            'data-scientist': {
                name: 'Data Scientist',
                content: `# 📊 Data Scientist

<div align="center">
  <h1>👋 ¡Hola! Soy [Tu Nombre]</h1>
  <h3>📊 Data Scientist | 🤖 ML Engineer | 📈 Analytics Expert</h3>
</div>

## 🎯 About Me

Data Scientist apasionado por extraer insights valiosos de los datos y construir modelos de machine learning.

- 🔬 Trabajando en **[Proyecto actual]**
- 🧠 Investigando **[Nueva tecnología/skill]**
- 💬 Pregúntame sobre **Python, Machine Learning, Statistics, Data Viz**
- 📫 Contacto: **tu-email@ejemplo.com**

## 📊 GitHub Analytics

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=material-palenight&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&langs_count=8&theme=material-palenight"/>
</div>

## 🌐 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu-email@gmail.com)`
            },
            'gaming-profile': {
                name: 'Gaming Profile',
                content: `# 🎮 Gaming Profile

<div align="center">
  <h1>🎮 ¡Game On! Soy [Tu Nombre] 🎮</h1>
  <h3>🕹️ Game Developer | 🎨 Interactive Designer | 🚀 Unity Expert</h3>
</div>

## 🎯 Player Profile

Desarrollador de videojuegos apasionado por crear experiencias interactivas increíbles.

- 🎮 Trabajando en **[Proyecto actual]**
- 🌟 Masterizando **[Nueva tecnología/skill]**
- 💬 Pregúntame sobre **Unity, C#, Game Design, Shaders**
- 📫 Contact: **tu-email@ejemplo.com**

## 📊 Developer Stats

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=synthwave&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&langs_count=7&theme=synthwave"/>
</div>

## 🌐 Gaming Community

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu-email@gmail.com)`
            },
            'student-profile': {
                name: 'Student Profile',
                content: `# 🎓 Student Developer

<div align="center">
  <h1>👋 ¡Hola! Soy [Tu Nombre]</h1>
  <h3>🎓 Computer Science Student | 💻 Aspiring Developer | 🚀 Always Learning</h3>
</div>

## 📚 About Me

Estudiante de Ciencias de la Computación apasionado por la tecnología y el desarrollo de software.

- 🎓 Estudiando **Computer Science** 
- 🌱 Actualmente aprendiendo **[Nueva tecnología/skill]**
- 🔭 Trabajando en **[Proyecto actual]**
- 💬 Pregúntame sobre **[Tus materias favoritas/tecnologías]**
- 📫 Contacto: **tu-email@ejemplo.com**

## 📊 GitHub Stats

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=TU_USERNAME&show_icons=true&theme=github_dark&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TU_USERNAME&layout=compact&langs_count=7&theme=github_dark"/>
</div>

## 🌐 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu-email@gmail.com)`
            }
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReadmeWizard();
});
