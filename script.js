class KnowledgeMap {
    constructor() {
        this.courses = this.loadCourses();
        this.progress = this.loadProgress();
        this.notes = this.loadNotes();
        this.favorites = this.loadFavorites();
        this.achievements = this.loadAchievements();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAllStats();
        this.restoreStates();
        this.updateTheme();
        
        // Draw connections after everything is loaded
        window.addEventListener('load', () => {
            this.drawConnections();
        });
        
        // Redraw connections on resize
        window.addEventListener('resize', () => {
            this.drawConnections();
        });
    }

    loadCourses() {
        return {
            'cs50': {
                title: 'CS50 - Introduction to Computer Science',
                code: 'Harvard',
                url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science',
                estimatedTime: '12 semanas',
                prerequisites: []
            },
            'mit-python': {
                title: 'Introduction to CS and Programming in Python',
                code: 'MIT 6.0001',
                url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
                estimatedTime: '10 semanas',
                prerequisites: []
            },
            'calculus1': {
                title: 'Cálculo I: Single Variable Calculus',
                code: 'MIT 18.01',
                url: 'https://ocw.mit.edu/courses/18-01-calculus-i-single-variable-calculus-fall-2020/',
                estimatedTime: '14 semanas',
                prerequisites: []
            },
            'physics1': {
                title: 'Physics I: Classical Mechanics',
                code: 'MIT 8.012',
                url: 'https://ocw.mit.edu/courses/8-012-physics-i-classical-mechanics-fall-2008/',
                estimatedTime: '14 semanas',
                prerequisites: []
            },
            'linear-algebra': {
                title: 'Linear Algebra',
                code: 'MIT 18.06',
                url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/',
                estimatedTime: '12 semanas',
                prerequisites: ['calculus1']
            },
            'discrete-math': {
                title: 'Mathematics for Computer Science',
                code: 'MIT 6.1200J',
                url: 'https://ocw.mit.edu/courses/6-1200j-mathematics-for-computer-science-spring-2024/',
                estimatedTime: '16 semanas',
                prerequisites: ['calculus1']
            },
            'intro-algorithms': {
                title: 'Introduction to Algorithms',
                code: 'MIT 6.006',
                url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
                estimatedTime: '12 semanas',
                prerequisites: ['mit-python', 'discrete-math']
            },
            'computer-systems': {
                title: 'Computer System Engineering',
                code: 'MIT 6.033',
                url: 'https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/',
                estimatedTime: '14 semanas',
                prerequisites: ['mit-python']
            },
            'operating-systems': {
                title: 'Operating System Engineering',
                code: 'MIT 6.1810',
                url: 'https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/',
                estimatedTime: '14 semanas',
                prerequisites: ['computer-systems', 'intro-algorithms']
            },
            'artificial-intelligence': {
                title: 'Artificial Intelligence',
                code: 'MIT 6.034',
                url: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/',
                estimatedTime: '12 semanas',
                prerequisites: ['intro-algorithms', 'discrete-math']
            },
            'machine-learning': {
                title: 'Introduction to Machine Learning',
                code: 'MIT 6.036',
                url: 'https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/',
                estimatedTime: '14 semanas',
                prerequisites: ['linear-algebra', 'intro-algorithms']
            },
            'computer-graphics': {
                title: 'Computer Graphics',
                code: 'MIT 6.837',
                url: 'https://ocw.mit.edu/courses/6-837-computer-graphics-fall-2012/',
                estimatedTime: '12 semanas',
                prerequisites: ['linear-algebra', 'intro-algorithms']
            },
            'capstone-project': {
                title: 'Projeto de Conclusão de Curso',
                code: 'Trabalho Final',
                url: '#',
                estimatedTime: '16 semanas',
                prerequisites: ['operating-systems', 'artificial-intelligence', 'machine-learning']
            }
        };
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
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

    openCourseModal(courseId) {
        const course = this.courses[courseId];
        if (!course) return;

        this.currentCourseId = courseId;

        document.getElementById('modalTitle').textContent = course.title;
        document.getElementById('modalCode').textContent = course.code;
        document.getElementById('estimatedTime').textContent = course.estimatedTime;
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
        favoriteBtn.title = isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos';

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
        favoriteBtn.classList.toggle('active', isFavorited);
        favoriteBtn.title = isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
        
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
            
            switch(filter) {
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