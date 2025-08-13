class KnowledgeMap {
    constructor() {
        this.courses = this.loadCourses();
        this.progress = this.loadProgress();
        this.notes = this.loadNotes();
        this.favorites = this.loadFavorites();
        this.achievements = this.loadAchievements();
        this.currentFilter = 'all';
        this.currentLanguage = this.loadLanguage();
        this.translations = this.loadTranslations();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAllStats();
        this.restoreStates();
        this.updateTheme();
        this.updateLanguage();

        // Draw connections after everything is loaded
        window.addEventListener('load', () => {
            this.drawConnections();
        });

        // Redraw connections on resize
        window.addEventListener('resize', () => {
            this.drawConnections();
        });
    }

    loadTranslations() {
        return {
            pt: {
                // Header
                searchPlaceholder: "Buscar curso...",
                completed: "Concluídos",
                inProgress: "Em Progresso",
                total: "Total",

                // Filters
                all: "Todos",
                completedFilter: "Concluídos",
                inProgressFilter: "Em Progresso",
                notStarted: "Não Iniciados",
                favorited: "Favoritos",
                tipsResources: "💡 Dicas & Recursos",
                backToMap: "🗺️ Voltar ao Mapa",

                // Levels
                beginner: "Iniciante",
                intermediate: "📚 Intermediário",
                advanced: "🚀 Avançado",
                master: "👑 Mestre CS",

                // Achievements
                achievements: "Conquistas",
                firstSteps: "🏆 Primeiros Passos",
                halfway: "🚀 Meio Caminho",
                masterCS: "👑 Mestre CS",
                collector: "⭐ Colecionador",

                // Modal
                courseStatus: "Status do Curso",
                notStartedStatus: "Não Iniciado",
                inProgressStatus: "Em Progresso",
                completedStatus: "Concluído",
                myNotes: "Minhas Anotações",
                notesPlaceholder: "Adicione suas anotações sobre este curso...",
                courseAccess: "Acesso ao Curso",
                accessMaterial: "Acessar Material →",
                addToFavorites: "Adicionar aos favoritos",
                removeFromFavorites: "Remover dos favoritos",

                // Years
                year1: "1º Ano - Fundamentos",
                year2: "2º Ano - CS Básico",
                year3: "3º Ano - Avançado",
                year4: "4º Ano - Especialização",

                // Tips Section
                tipsTitle: "💡 Dicas & Recursos para o Sucesso",
                tipsSubtitle: "Guia completo para maximizar seu aprendizado em Ciência da Computação",

                complementaryResources: "Recursos Complementares",
                youtubeLessons: "📺 Aulas no YouTube: Para explicações adicionais e diferentes perspectivas",
                onlineCommunities: "💬 Comunidades Online: Reddit r/compsci, Stack Overflow, GitHub",
                practicePlatforms: "🏋️ Plataformas para Praticar: LeetCode, HackerRank, Codeforces",
                openSource: "🔓 Open Source: Experiência de desenvolvimento no mundo real",

                mathPreparation: "Preparação Matemática",
                mathContent: "Um bom domínio da matemática é imprescindível. Os alunos que têm dificuldade com conceitos matemáticos devem dedicar tempo extra à matemática discreta, álgebra linear e probabilidade antes de tentar cursos avançados.",
                mathTip: "💡 Dica: Pratique problemas matemáticos diariamente por pelo menos 30 minutos",

                programmingPractice: "Prática de Programação",
                programmingContent: "A codificação regular em várias linguagens (Python, C, Java, JavaScript) desenvolve a fluência necessária. Participe de competições de programação e contribua para projetos de código aberto.",
                programmingGoal: "🎯 Meta: Code pelo menos 1 hora por dia, todos os dias",

                projectBasedLearning: "Aprendizagem Baseada em Projetos",
                projectContent: "Crie projetos substanciais que integrem vários conceitos de ciência da computação:",
                compilerProject: "🔧 Implementação de um compilador",
                databaseProject: "🗃️ Construção de um banco de dados distribuído",
                mlProject: "🤖 Criação de um aplicativo de machine learning",
                webProject: "🌐 Sistema web completo com backend",

                communityEngagement: "Envolvimento com a Comunidade",
                communityContent: "Participe de grupos de estudo, encontros virtuais e comunidades online. O aprendizado da ciência da computação se beneficia significativamente da interação e colaboração entre colegas.",

                continuousLearning: "Aprendizagem Contínua",
                learningContent: "A ciência da computação evolui rapidamente. Desenvolva hábitos de:",
                readPapers: "📖 Ler artigos de pesquisa regularmente",
                followDevelopments: "🔄 Acompanhar desenvolvimentos do setor",
                experimentTech: "🧪 Experimentar novas tecnologias",
                takeCourses: "📚 Fazer cursos complementares",
                changeConstant: "⚡ Lembre-se: A única constante em CS é a mudança!",

                successFactors: "🏆 Fatores Críticos de Sucesso",
                consistency: "Consistência",
                consistencyDesc: "Estude um pouco todos os dias ao invés de grandes maratonas esporádicas",
                handsOnPractice: "Prática Hands-on",
                handsOnDesc: "Sempre implemente o que você aprende - teoria sem prática não fixa",
                networking: "Networking",
                networkingDesc: "Conecte-se com outros estudantes e profissionais da área",
                curiosity: "Curiosidade",
                curiosityDesc: "Mantenha-se curioso e sempre questione como as coisas funcionam",
            },
            en: {
                // Header
                searchPlaceholder: "Search course...",
                completed: "Completed",
                inProgress: "In Progress",
                total: "Total",

                // Filters  
                all: "All",
                completedFilter: "Completed",
                inProgressFilter: "In Progress",
                notStarted: "Not Started",
                favorited: "Favorites",
                tipsResources: "💡 Tips & Resources",
                backToMap: "🗺️ Back to Map",

                // Levels
                beginner: "Beginner",
                intermediate: "📚 Intermediate",
                advanced: "🚀 Advanced",
                master: "👑 CS Master",

                // Achievements
                achievements: "Achievements",
                firstSteps: "🏆 First Steps",
                halfway: "🚀 Halfway There",
                masterCS: "👑 CS Master",
                collector: "⭐ Collector",

                // Modal
                courseStatus: "Course Status",
                notStartedStatus: "Not Started",
                inProgressStatus: "In Progress",
                completedStatus: "Completed",
                estimatedTime: "Estimated Time",
                myNotes: "My Notes",
                notesPlaceholder: "Add your notes about this course...",
                courseAccess: "Course Access",
                accessMaterial: "Access Material →",
                addToFavorites: "Add to favorites",
                removeFromFavorites: "Remove from favorites",

                // Years
                year1: "1st Year - Fundamentals",
                year2: "2nd Year - CS Basics",
                year3: "3rd Year - Advanced",
                year4: "4th Year - Specialization",

                // Tips Section
                tipsTitle: "💡 Tips & Resources for Success",
                tipsSubtitle: "Complete guide to maximize your Computer Science learning",

                complementaryResources: "Complementary Resources",
                youtubeLessons: "📺 YouTube Lessons: For additional explanations and different perspectives",
                onlineCommunities: "💬 Online Communities: Reddit r/compsci, Stack Overflow, GitHub",
                practicePlatforms: "🏋️ Practice Platforms: LeetCode, HackerRank, Codeforces",
                openSource: "🔓 Open Source: Real-world development experience",

                mathPreparation: "Mathematical Preparation",
                mathContent: "A good mastery of mathematics is essential. Students who struggle with mathematical concepts should dedicate extra time to discrete mathematics, linear algebra, and probability before attempting advanced courses.",
                mathTip: "💡 Tip: Practice math problems daily for at least 30 minutes",

                programmingPractice: "Programming Practice",
                programmingContent: "Regular coding in multiple languages (Python, C, Java, JavaScript) develops necessary fluency. Participate in programming competitions and contribute to open source projects.",
                programmingGoal: "🎯 Goal: Code at least 1 hour per day, every day",

                projectBasedLearning: "Project-Based Learning",
                projectContent: "Create substantial projects that integrate various computer science concepts:",
                compilerProject: "🔧 Compiler implementation",
                databaseProject: "🗃️ Distributed database construction",
                mlProject: "🤖 Machine learning application creation",
                webProject: "🌐 Complete web system with backend",

                communityEngagement: "Community Engagement",
                communityContent: "Participate in study groups, virtual meetups, and online communities. Computer science learning benefits significantly from interaction and collaboration with peers.",

                continuousLearning: "Continuous Learning",
                learningContent: "Computer science evolves rapidly. Develop habits of:",
                readPapers: "📖 Reading research papers regularly",
                followDevelopments: "🔄 Following industry developments",
                experimentTech: "🧪 Experimenting with new technologies",
                takeCourses: "📚 Taking complementary courses",
                changeConstant: "⚡ Remember: The only constant in CS is change!",

                successFactors: "🏆 Critical Success Factors",
                consistency: "Consistency",
                consistencyDesc: "Study a little every day instead of large sporadic marathons",
                handsOnPractice: "Hands-on Practice",
                handsOnDesc: "Always implement what you learn - theory without practice doesn't stick",
                networking: "Networking",
                networkingDesc: "Connect with other students and professionals in the field",
                curiosity: "Curiosity",
                curiosityDesc: "Stay curious and always question how things work"
            }
        };
    }

    loadCourses() {
        return {
            'cs50': {
                title: 'CS50 - Introduction to Computer Science',
                code: 'Harvard',
                url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science',
                prerequisites: []
            },
            'mit-python': {
                title: 'Introduction to CS and Programming in Python',
                code: 'MIT 6.0001',
                url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
                prerequisites: []
            },
            'calculus1': {
                title: 'Calculus I: Single Variable Calculus',
                code: 'MIT 18.01',
                url: 'https://ocw.mit.edu/courses/18-01-calculus-i-single-variable-calculus-fall-2020/',
                prerequisites: []
            },
            'physics1': {
                title: 'Physics I: Classical Mechanics',
                code: 'MIT 8.012',
                url: 'https://ocw.mit.edu/courses/8-012-physics-i-classical-mechanics-fall-2008/',
                prerequisites: []
            },
            'linear-algebra': {
                title: 'Linear Algebra',
                code: 'MIT 18.06',
                url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/',
                prerequisites: ['calculus1']
            },
            'discrete-math': {
                title: 'Mathematics for Computer Science',
                code: 'MIT 6.1200J',
                url: 'https://ocw.mit.edu/courses/6-1200j-mathematics-for-computer-science-spring-2024/',
                prerequisites: ['calculus1']
            },
            'intro-algorithms': {
                title: 'Introduction to Algorithms',
                code: 'MIT 6.006',
                url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
                prerequisites: ['mit-python', 'discrete-math']
            },
            'computer-systems': {
                title: 'Computer System Engineering',
                code: 'MIT 6.033',
                url: 'https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/',
                prerequisites: ['mit-python']
            },
            'operating-systems': {
                title: 'Operating System Engineering',
                code: 'MIT 6.1810',
                url: 'https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/',
                prerequisites: ['computer-systems', 'intro-algorithms']
            },
            'artificial-intelligence': {
                title: 'Artificial Intelligence',
                code: 'MIT 6.034',
                url: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/',
                prerequisites: ['intro-algorithms', 'discrete-math']
            },
            'machine-learning': {
                title: 'Introduction to Machine Learning',
                code: 'MIT 6.036',
                url: 'https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/',
                prerequisites: ['linear-algebra', 'intro-algorithms']
            },
            'computer-graphics': {
                title: 'Computer Graphics',
                code: 'MIT 6.837',
                url: 'https://ocw.mit.edu/courses/6-837-computer-graphics-fall-2012/',
                prerequisites: ['linear-algebra', 'intro-algorithms']
            },
            'capstone-project': {
                title: 'Projeto de Conclusão de Curso',
                code: 'Trabalho Final',
                url: '#',
                prerequisites: ['operating-systems', 'artificial-intelligence', 'machine-learning']
            }
        };
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Language toggle
        document.getElementById('languageToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Tips toggle
        document.getElementById('tipsBtn').addEventListener('click', () => {
            this.toggleTips();
        });

        // Course nodes
        document.querySelectorAll('.course-node').forEach(node => {
            node.addEventListener('click', (e) => {
                const courseId = e.currentTarget.dataset.course;
                this.openCourseModal(courseId);
            });

            node.addEventListener('mouseenter', () => {
                this.highlightConnections(node.dataset.course);
            });

            node.addEventListener('mouseleave', () => {
                this.unhighlightConnections();
            });
        });

        // Modal controls
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeCourseModal();
        });

        document.getElementById('courseModal').addEventListener('click', (e) => {
            if (e.target.id === 'courseModal') {
                this.closeCourseModal();
            }
        });

        // Status buttons
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const status = e.target.dataset.status;
                this.setModalStatus(status);
            });
        });

        // Favorite button
        document.getElementById('favoriteBtn').addEventListener('click', () => {
            this.toggleFavorite();
        });

        // Notes
        document.getElementById('courseNotes').addEventListener('input', (e) => {
            this.saveNoteForCurrentCourse(e.target.value);
        });

        // Search
        document.getElementById('searchBox').addEventListener('input', (e) => {
            this.searchCourses(e.target.value);
        });

        // Filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.dataset.theme = newTheme;
        document.getElementById('themeToggle').textContent = newTheme === 'dark' ? '🌙' : '☀️';

        localStorage.setItem('theme', newTheme);
        this.drawConnections(); // Redraw with new theme colors
    }

    updateTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.dataset.theme = savedTheme;
        document.getElementById('themeToggle').textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'pt' ? 'en' : 'pt';
        this.saveLanguage();
        this.updateLanguage();
    }

    updateLanguage() {
        const lang = this.translations[this.currentLanguage];
        const langToggle = document.getElementById('languageToggle');

        // Update language toggle button
        langToggle.textContent = this.currentLanguage === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN';

        // Update search placeholder
        document.getElementById('searchBox').placeholder = lang.searchPlaceholder;

        // Update header stats labels
        document.querySelector('[id="completedStat"]').parentElement.querySelector('.stat-label').textContent = lang.completed;
        document.querySelector('[id="inProgressStat"]').parentElement.querySelector('.stat-label').textContent = lang.inProgress;
        document.querySelector('[id="totalStat"]').parentElement.querySelector('.stat-label').textContent = lang.total;

        // Update filter buttons
        document.querySelector('[data-filter="all"]').textContent = lang.all;
        document.querySelector('[data-filter="completed"]').textContent = lang.completedFilter;
        document.querySelector('[data-filter="in-progress"]').textContent = lang.inProgressFilter;
        document.querySelector('[data-filter="not-started"]').textContent = lang.notStarted;
        document.querySelector('[data-filter="favorited"]').textContent = lang.favorited;

        // Update tips button
        const tipsBtn = document.getElementById('tipsBtn');
        const tipsSection = document.getElementById('tipsSection');
        if (tipsSection.style.display === 'none') {
            tipsBtn.textContent = lang.tipsResources;
        } else {
            tipsBtn.textContent = lang.backToMap;
        }

        // Update year labels
        document.querySelector('[data-year="1"] .year-label').textContent = lang.year1;
        document.querySelector('[data-year="2"] .year-label').textContent = lang.year2;
        document.querySelector('[data-year="3"] .year-label').textContent = lang.year3;
        document.querySelector('[data-year="4"] .year-label').textContent = lang.year4;

        // Update sidebar
        document.querySelector('.sidebar-title').textContent = lang.achievements;
        document.getElementById('achievement1').textContent = lang.firstSteps;
        document.getElementById('achievement2').textContent = lang.halfway;
        document.getElementById('achievement3').textContent = lang.masterCS;
        document.getElementById('achievement4').textContent = lang.collector;

        // Update tips section content
        this.updateTipsContent(lang);

        // Update level display
        this.updateLevelDisplay();

        // Update modal content if open
        if (this.currentCourseId) {
            this.updateModalLanguage(lang);
        }
    }

    updateModalLanguage(lang) {
        // Update modal section titles and buttons
        const statusTitle = document.querySelector('.modal-content .section-title');
        if (statusTitle) statusTitle.textContent = lang.courseStatus;

        const statusButtons = document.querySelectorAll('.status-btn');
        if (statusButtons.length >= 3) {
            statusButtons[0].textContent = lang.notStartedStatus;
            statusButtons[1].textContent = lang.inProgressStatus;
            statusButtons[2].textContent = lang.completedStatus;
        }

        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles.length >= 3) {
            sectionTitles[1].textContent = lang.myNotes;
            sectionTitles[2].textContent = lang.courseAccess;
        }

        // Update notes placeholder
        document.getElementById('courseNotes').placeholder = lang.notesPlaceholder;

        // Update course link text
        const courseLink = document.getElementById('courseLink');
        if (courseLink && courseLink.href !== '#') {
            courseLink.textContent = lang.accessMaterial;
        }

        // Update favorite button title
        const favoriteBtn = document.getElementById('favoriteBtn');
        const isFavorited = favoriteBtn.classList.contains('active');
        favoriteBtn.title = isFavorited ? lang.removeFromFavorites : lang.addToFavorites;
    }

    updateTipsContent(lang) {
        // Tips header
        const tipsHeader = document.querySelector('.tips-header h2');
        if (tipsHeader) tipsHeader.textContent = lang.tipsTitle;

        const tipsSubtitle = document.querySelector('.tips-header p');
        if (tipsSubtitle) tipsSubtitle.textContent = lang.tipsSubtitle;

        // Tips cards
        const tipCards = document.querySelectorAll('.tip-card');
        if (tipCards.length >= 6) {
            // Complementary Resources
            tipCards[0].querySelector('h3').textContent = lang.complementaryResources;
            const resourceItems = tipCards[0].querySelectorAll('.resource-item');
            if (resourceItems.length >= 4) {
                resourceItems[0].innerHTML = `<strong>📺 ${lang.youtubeLessons.split(': ')[0]}:</strong> ${lang.youtubeLessons.split(': ')[1]}`;
                resourceItems[1].innerHTML = `<strong>💬 ${lang.onlineCommunities.split(': ')[0]}:</strong> ${lang.onlineCommunities.split(': ')[1]}`;
                resourceItems[2].innerHTML = `<strong>🏋️ ${lang.practicePlatforms.split(': ')[0]}:</strong> ${lang.practicePlatforms.split(': ')[1]}`;
                resourceItems[3].innerHTML = `<strong>🔓 ${lang.openSource.split(': ')[0]}:</strong> ${lang.openSource.split(': ')[1]}`;
            }

            // Math Preparation
            tipCards[1].querySelector('h3').textContent = lang.mathPreparation;
            tipCards[1].querySelector('p').textContent = lang.mathContent;
            tipCards[1].querySelector('.tip-highlight').innerHTML = lang.mathTip;

            // Programming Practice
            tipCards[2].querySelector('h3').textContent = lang.programmingPractice;
            tipCards[2].querySelector('p').textContent = lang.programmingContent;
            tipCards[2].querySelector('.tip-highlight').innerHTML = lang.programmingGoal;

            // Project-based Learning
            tipCards[3].querySelector('h3').textContent = lang.projectBasedLearning;
            tipCards[3].querySelector('p').textContent = lang.projectContent;
            const projectItems = tipCards[3].querySelectorAll('.project-list li');
            if (projectItems.length >= 4) {
                projectItems[0].textContent = lang.compilerProject;
                projectItems[1].textContent = lang.databaseProject;
                projectItems[2].textContent = lang.mlProject;
                projectItems[3].textContent = lang.webProject;
            }

            // Community Engagement
            tipCards[4].querySelector('h3').textContent = lang.communityEngagement;
            tipCards[4].querySelector('p').textContent = lang.communityContent;

            // Continuous Learning
            tipCards[5].querySelector('h3').textContent = lang.continuousLearning;
            tipCards[5].querySelector('p').textContent = lang.learningContent;
            const habitItems = tipCards[5].querySelectorAll('.habit-item');
            if (habitItems.length >= 4) {
                habitItems[0].textContent = lang.readPapers;
                habitItems[1].textContent = lang.followDevelopments;
                habitItems[2].textContent = lang.experimentTech;
                habitItems[3].textContent = lang.takeCourses;
            }
            tipCards[5].querySelector('.tip-highlight').innerHTML = lang.changeConstant;
        }

        // Success factors
        const successSection = document.querySelector('.success-section h3');
        if (successSection) successSection.textContent = lang.successFactors;

        const successFactors = document.querySelectorAll('.success-factor');
        if (successFactors.length >= 4) {
            successFactors[0].querySelector('h4').textContent = lang.consistency;
            successFactors[0].querySelector('p').textContent = lang.consistencyDesc;

            successFactors[1].querySelector('h4').textContent = lang.handsOnPractice;
            successFactors[1].querySelector('p').textContent = lang.handsOnDesc;

            successFactors[2].querySelector('h4').textContent = lang.networking;
            successFactors[2].querySelector('p').textContent = lang.networkingDesc;

            successFactors[3].querySelector('h4').textContent = lang.curiosity;
            successFactors[3].querySelector('p').textContent = lang.curiosityDesc;
        }
    }

    updateLevelDisplay() {
        const totalCourses = Object.keys(this.courses).length;
        const completed = Object.values(this.progress).filter(s => s === 'completed').length;
        const percentage = totalCourses > 0 ? Math.round((completed / totalCourses) * 100) : 0;

        const lang = this.translations[this.currentLanguage];
        let level = lang.beginner;
        if (percentage >= 75) level = lang.master;
        else if (percentage >= 50) level = lang.advanced;
        else if (percentage >= 25) level = lang.intermediate;

        document.getElementById('levelDisplay').textContent = level;
    }

    // Storage methods for language
    saveLanguage() {
        localStorage.setItem('cs-map-language', this.currentLanguage);
    }

    loadLanguage() {
        return localStorage.getItem('cs-map-language') || 'pt';
    }

    toggleTips() {
        const tipsSection = document.getElementById('tipsSection');
        const knowledgeMap = document.querySelector('.knowledge-map');
        const tipsBtn = document.getElementById('tipsBtn');
        const lang = this.translations[this.currentLanguage];

        if (tipsSection.style.display === 'none') {
            // Show tips, hide map
            tipsSection.style.display = 'block';
            knowledgeMap.style.display = 'none';
            tipsBtn.classList.add('active');
            tipsBtn.textContent = lang.backToMap;

            // Deactivate filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        } else {
            // Show map, hide tips
            tipsSection.style.display = 'none';
            knowledgeMap.style.display = 'block';
            tipsBtn.classList.remove('active');
            tipsBtn.textContent = lang.tipsResources;

            // Reactivate the current filter
            document.querySelector(`[data-filter="${this.currentFilter}"]`).classList.add('active');
        }
    }

    openCourseModal(courseId) {
        const course = this.courses[courseId];
        if (!course) return;

        this.currentCourseId = courseId;
        const lang = this.translations[this.currentLanguage];

        document.getElementById('modalTitle').textContent = course.title;
        document.getElementById('modalCode').textContent = course.code;
        document.getElementById('courseLink').href = course.url;
        document.getElementById('courseNotes').value = this.notes[courseId] || '';

        // Update status buttons
        const currentStatus = this.progress[courseId] || 'not-started';
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.status === currentStatus);
        });

        // Update favorite button
        const favoriteBtn = document.getElementById('favoriteBtn');
        const isFavorited = this.favorites[courseId] || false;
        favoriteBtn.classList.toggle('active', isFavorited);
        favoriteBtn.title = isFavorited ? lang.removeFromFavorites : lang.addToFavorites;

        // Apply language to modal content
        this.updateModalLanguage(lang);

        document.getElementById('courseModal').style.display = 'flex';
    }

    closeCourseModal() {
        document.getElementById('courseModal').style.display = 'none';
        this.currentCourseId = null;
    }

    setModalStatus(status) {
        if (!this.currentCourseId) return;

        this.progress[this.currentCourseId] = status;
        this.saveProgress();

        // Update modal buttons
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.status === status);
        });

        // Update course node
        this.updateCourseNode(this.currentCourseId);
        this.updateAllStats();
        this.checkAchievements();
    }

    toggleFavorite() {
        if (!this.currentCourseId) return;

        const isFavorited = !this.favorites[this.currentCourseId];
        this.favorites[this.currentCourseId] = isFavorited;
        this.saveFavorites();

        const favoriteBtn = document.getElementById('favoriteBtn');
        const lang = this.translations[this.currentLanguage];
        favoriteBtn.classList.toggle('active', isFavorited);
        favoriteBtn.title = isFavorited ? lang.removeFromFavorites : lang.addToFavorites;

        // Trigger animation when favoriting
        if (isFavorited) {
            favoriteBtn.style.animation = 'none';
            setTimeout(() => {
                favoriteBtn.style.animation = 'favoriteAdded 0.4s ease';
            }, 10);
        }

        this.updateCourseNode(this.currentCourseId);
        this.checkAchievements();
    }

    updateCourseNode(courseId) {
        const node = document.querySelector(`[data-course="${courseId}"]`);
        if (!node) return;

        const status = this.progress[courseId] || 'not-started';
        const isFavorited = this.favorites[courseId] || false;

        // Update classes
        node.classList.remove('completed', 'in-progress');
        if (status !== 'not-started') {
            node.classList.add(status);
        }

        const wasFavorited = node.classList.contains('favorited');
        node.classList.toggle('favorited', isFavorited);

        // Trigger animation for newly favorited items
        if (isFavorited && !wasFavorited) {
            // Force reflow to restart animation
            node.style.animation = 'none';
            setTimeout(() => {
                node.style.animation = '';
            }, 10);
        }

        // Update status indicator
        const indicator = node.querySelector('.status-indicator');
        indicator.classList.remove('completed', 'in-progress');
        if (status !== 'not-started') {
            indicator.classList.add(status);
        }
    }

    saveNoteForCurrentCourse(note) {
        if (!this.currentCourseId) return;
        this.notes[this.currentCourseId] = note;
        this.saveNotes();
    }

    drawConnections() {
        const svg = document.getElementById('connectionLines');
        svg.innerHTML = '';

        // Wait for layout to be rendered
        setTimeout(() => {
            Object.entries(this.courses).forEach(([courseId, course]) => {
                course.prerequisites.forEach(prereqId => {
                    // Only draw connection if both courses are visible
                    const fromNode = document.querySelector(`[data-course="${prereqId}"]`);
                    const toNode = document.querySelector(`[data-course="${courseId}"]`);

                    if (fromNode && toNode &&
                        fromNode.style.display !== 'none' &&
                        toNode.style.display !== 'none' &&
                        fromNode.style.opacity !== '0.3' &&
                        toNode.style.opacity !== '0.3') {
                        this.drawConnection(prereqId, courseId);
                    }
                });
            });
        }, 100);
    }

    drawConnection(fromId, toId) {
        const fromNode = document.querySelector(`[data-course="${fromId}"]`);
        const toNode = document.querySelector(`[data-course="${toId}"]`);

        if (!fromNode || !toNode) return;

        const svg = document.getElementById('connectionLines');
        const mapRect = svg.closest('.knowledge-map').getBoundingClientRect();
        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();

        const fromX = fromRect.left + fromRect.width / 2 - mapRect.left;
        const fromY = fromRect.bottom - mapRect.top;
        const toX = toRect.left + toRect.width / 2 - mapRect.left;
        const toY = toRect.top - mapRect.top;

        // Create path for connection
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const controlY = fromY + (toY - fromY) * 0.6;
        const pathData = `M ${fromX} ${fromY} Q ${fromX} ${controlY} ${toX} ${toY}`;

        path.setAttribute('d', pathData);
        path.setAttribute('class', 'connection-line');
        path.dataset.from = fromId;
        path.dataset.to = toId;

        svg.appendChild(path);
    }

    highlightConnections(courseId) {
        document.querySelectorAll('.connection-line').forEach(line => {
            const isConnected = line.dataset.from === courseId || line.dataset.to === courseId;
            line.classList.toggle('active', isConnected);
        });
    }

    unhighlightConnections() {
        document.querySelectorAll('.connection-line').forEach(line => {
            line.classList.remove('active');
        });
    }

    updateAllStats() {
        const totalCourses = Object.keys(this.courses).length;
        const completed = Object.values(this.progress).filter(s => s === 'completed').length;
        const inProgress = Object.values(this.progress).filter(s => s === 'in-progress').length;
        const percentage = totalCourses > 0 ? Math.round((completed / totalCourses) * 100) : 0;

        // Update header stats
        document.getElementById('completedStat').textContent = completed;
        document.getElementById('inProgressStat').textContent = inProgress;
        document.getElementById('totalStat').textContent = totalCourses;
        document.getElementById('progressPercent').textContent = `${percentage}%`;

        // Update progress ring
        const circumference = 157; // 2 * PI * 25
        const offset = circumference - (percentage / 100) * circumference;
        document.getElementById('progressRing').style.strokeDashoffset = offset;

        // Update level
        let level = 'Iniciante';
        if (percentage >= 75) level = '👑 Mestre CS';
        else if (percentage >= 50) level = '🚀 Avançado';
        else if (percentage >= 25) level = '📚 Intermediário';

        document.getElementById('levelDisplay').textContent = level;
    }

    checkAchievements() {
        const completed = Object.values(this.progress).filter(s => s === 'completed').length;
        const favorited = Object.values(this.favorites).filter(Boolean).length;
        const total = Object.keys(this.courses).length;

        const achievements = [
            { id: 'achievement1', condition: completed >= 1, name: '🏆 Primeiros Passos' },
            { id: 'achievement2', condition: completed >= Math.floor(total / 2), name: '🚀 Meio Caminho' },
            { id: 'achievement3', condition: completed === total, name: '👑 Mestre CS' },
            { id: 'achievement4', condition: favorited >= 5, name: '⭐ Colecionador' }
        ];

        achievements.forEach(achievement => {
            if (achievement.condition && !this.achievements[achievement.id]) {
                this.achievements[achievement.id] = true;
                this.saveAchievements();
                this.showAchievementNotification(achievement.name);
            }

            const element = document.getElementById(achievement.id);
            element.classList.toggle('unlocked', this.achievements[achievement.id]);
            element.classList.toggle('locked', !this.achievements[achievement.id]);
        });
    }

    showAchievementNotification(name) {
        // Implementation for achievement notification
        console.log(`Achievement unlocked: ${name}`);
    }

    setFilter(filter) {
        // If tips section is open, ignore filter changes
        const tipsSection = document.getElementById('tipsSection');
        if (tipsSection.style.display !== 'none') {
            return;
        }

        this.currentFilter = filter;

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // First, show all year layers
        document.querySelectorAll('.year-layer').forEach(yearLayer => {
            yearLayer.style.display = 'flex';
        });

        document.querySelectorAll('.course-node').forEach(node => {
            const courseId = node.dataset.course;
            const status = this.progress[courseId] || 'not-started';
            const isFavorited = this.favorites[courseId] || false;

            let show = true;

            switch (filter) {
                case 'completed':
                    show = status === 'completed';
                    break;
                case 'in-progress':
                    show = status === 'in-progress';
                    break;
                case 'not-started':
                    show = status === 'not-started';
                    break;
                case 'favorited':
                    show = isFavorited;
                    break;
            }

            node.style.display = show ? 'block' : 'none';
        });

        // Hide year layers that have no visible courses (only if not showing all)
        if (filter !== 'all') {
            document.querySelectorAll('.year-layer').forEach(yearLayer => {
                const courseNodes = yearLayer.querySelectorAll('.course-node');
                const hasVisibleCourses = Array.from(courseNodes).some(node =>
                    node.style.display !== 'none'
                );
                yearLayer.style.display = hasVisibleCourses ? 'flex' : 'none';
            });
        }

        // Redraw connections after filter is applied
        this.drawConnections();
    }

    searchCourses(query) {
        const searchTerm = query.toLowerCase();

        // First, show all year layers
        document.querySelectorAll('.year-layer').forEach(yearLayer => {
            yearLayer.style.display = 'flex';
        });

        document.querySelectorAll('.course-node').forEach(node => {
            const courseId = node.dataset.course;
            const course = this.courses[courseId];
            const matches = course.title.toLowerCase().includes(searchTerm) ||
                course.code.toLowerCase().includes(searchTerm);

            node.style.opacity = matches || searchTerm === '' ? '1' : '0.3';
        });

        // If searching, hide year layers with no matching courses
        if (searchTerm !== '') {
            document.querySelectorAll('.year-layer').forEach(yearLayer => {
                const courseNodes = yearLayer.querySelectorAll('.course-node');
                const hasMatchingCourses = Array.from(courseNodes).some(node =>
                    node.style.opacity === '1'
                );
                yearLayer.style.display = hasMatchingCourses ? 'flex' : 'none';
            });
        }

        // Redraw connections after search to hide lines to non-matching courses
        this.drawConnections();
    }

    restoreStates() {
        Object.keys(this.courses).forEach(courseId => {
            this.updateCourseNode(courseId);
        });

        this.checkAchievements();
    }

    // Storage methods
    saveProgress() { localStorage.setItem('cs-map-progress', JSON.stringify(this.progress)); }
    loadProgress() { return JSON.parse(localStorage.getItem('cs-map-progress') || '{}'); }

    saveNotes() { localStorage.setItem('cs-map-notes', JSON.stringify(this.notes)); }
    loadNotes() { return JSON.parse(localStorage.getItem('cs-map-notes') || '{}'); }

    saveFavorites() { localStorage.setItem('cs-map-favorites', JSON.stringify(this.favorites)); }
    loadFavorites() { return JSON.parse(localStorage.getItem('cs-map-favorites') || '{}'); }

    saveAchievements() { localStorage.setItem('cs-map-achievements', JSON.stringify(this.achievements)); }
    loadAchievements() { return JSON.parse(localStorage.getItem('cs-map-achievements') || '{}'); }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new KnowledgeMap();
});