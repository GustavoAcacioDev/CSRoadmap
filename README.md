# 🗺️ CS Knowledge Map - MIT/Harvard

Um roadmap interativo para estudar Ciência da Computação baseado nos currículos das prestigiosas universidades MIT e Harvard.

## ✨ Características

### 🎯 **Mapa Interativo de Conhecimento**
- **Layout em rede** com nós conectados mostrando pré-requisitos
- **Visualização clara** da progressão entre cursos
- **Hover effects** que destacam conexões relacionadas

### 📊 **Sistema Completo de Progresso**
- **3 status por curso**: Não iniciado, Em progresso, Concluído
- **Progresso visual** com barra circular e estatísticas em tempo real
- **Sistema de níveis**: Iniciante → Intermediário → Avançado → Mestre CS

### 🎮 **Gamificação**
- **4 conquistas desbloqueáveis**:
  - 🏆 Primeiros Passos (completar 1 curso)
  - 🚀 Meio Caminho (completar 50% dos cursos)
  - 👑 Mestre CS (completar todos os cursos)
  - ⭐ Colecionador (favoritar 5+ cursos)

### 📝 **Funcionalidades Avançadas**
- **Notas personalizadas** para cada curso
- **Sistema de favoritos** com estrelas
- **Busca em tempo real** por nome ou código
- **Filtros inteligentes** (Todos, Concluídos, Em Progresso, etc.)
- **Dark/Light mode** toggle

### 📱 **Design Responsivo**
- **Mobile-first** - funciona perfeitamente em todos os dispositivos
- **Interface moderna** com glassmorphism e animações suaves
- **Acessibilidade** otimizada

## 🚀 Como Usar

### 1. **Setup**
```bash
# Clone ou baixe os arquivos
# Certifique-se de ter os 3 arquivos na mesma pasta:
# - index.html
# - styles.css  
# - script.js
```

### 2. **Executar**
- Abra o arquivo `index.html` em qualquer navegador moderno
- Não precisa de servidor local - funciona diretamente no navegador

### 3. **Navegação**
- **Clique nos cursos** para abrir o modal detalhado
- **Use os filtros** no topo para visualizar diferentes status
- **Hover nos cursos** para ver conexões de pré-requisitos
- **Busque cursos** usando a caixa de pesquisa

### 4. **Gerenciar Progresso**
- **Marque status** (Não iniciado/Em progresso/Concluído)
- **Adicione notas** personalizadas para cada curso
- **Favorite cursos** importantes com estrelas
- **Acompanhe estatísticas** no header e sidebar

## 📚 Currículo Incluído

### **1º Ano - Fundamentos**
- CS50 (Harvard)
- Intro to CS & Python (MIT 6.0001)
- Cálculo I (MIT 18.01)
- Álgebra Linear (MIT 18.06)

### **2º Ano - CS Básico**
- Intro to Algorithms (MIT 6.006)
- Computer Systems (MIT 6.033)
- Math for CS (MIT 6.1200J)

### **3º Ano - Avançado**
- Operating Systems (MIT 6.1810)
- Artificial Intelligence (MIT 6.034)
- Machine Learning (MIT 6.036)
- Computer Graphics (MIT 6.837)

### **4º Ano - Especialização**
- Projeto Final (Capstone)

## 💾 Persistência de Dados

Todos os dados são salvos automaticamente no **localStorage** do navegador:
- ✅ Progresso dos cursos
- 📝 Notas pessoais
- ⭐ Favoritos
- 🏆 Conquistas desbloqueadas
- 🎨 Preferência de tema

**Nota**: Os dados persistem entre sessões, mas são específicos por navegador/dispositivo.

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Design moderno com CSS Grid/Flexbox
- **JavaScript ES6+** - Lógica interativa e persistência
- **SVG** - Conexões visuais entre cursos
- **CSS Variables** - Sistema de temas dinâmico

## 🎨 Customização

### **Adicionar Novos Cursos**
Edite a função `loadCourses()` em `script.js`:

```javascript
'novo-curso': {
    title: 'Título do Curso',
    code: 'Código/Instituição',
    url: 'https://link-para-curso.com',
    estimatedTime: '12 semanas',
    prerequisites: ['curso-prerequisito']
}
```

### **Modificar Temas**
Edite as variáveis CSS em `styles.css`:

```css
:root {
    --accent-primary: #667eea; /* Cor principal */
    --accent-secondary: #764ba2; /* Cor secundária */
    --success: #10b981; /* Cor de sucesso */
    /* ... outras cores */
}
```

## 📈 Funcionalidades Futuras

- [ ] Export/Import de progresso
- [ ] Compartilhamento de progresso
- [ ] Integração com calendário
- [ ] Notificações de estudo
- [ ] Metas de tempo por curso
- [ ] Estatísticas detalhadas

## 🤝 Contribuições

Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novos cursos
- Melhorar o design
- Otimizar performance

## 📄 Licença

Este projeto é de código aberto. Use como quiser! 

## 🎓 Créditos

Baseado nos currículos oficiais de:
- **MIT OpenCourseWare** - Materiais de alta qualidade
- **Harvard CS** - Excelência em educação

---

**Feliz aprendizado! 🚀**