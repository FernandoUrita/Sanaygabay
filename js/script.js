// ============================================================
// LEARN PAGE - SANAYSAY LEARNING SYSTEM 2026
// WITH SUPABASE BACKEND INTEGRATION
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================================
    // API ENDPOINTS (Netlify Functions)
    // ============================================================
    const API_BASE = '/.netlify/functions';
    const API = {
        essays: {
            save: `${API_BASE}/save-essay`,
            get: `${API_BASE}/get-essays`
        }
    };

    // ============================================================
    // EMAILJS CONFIGURATION
    // ============================================================
    const EMAILJS_CONFIG = {
        publicKey: '9ij51SpdkUbjW348o',
        serviceID: 'service_f4ln0k7',
        templateIDStudent: 'template_at2sx1b',
        templateIDSystem: 'template_v3otl38',
        systemEmail: 'sanaysay.system2026@gmail.com'
    };

    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);

    // ============================================================
    // DEEP TAGALOG WORDS DATABASE
    // ============================================================
    const deepTagalogWords = {
        'maganda': 'marikit', 'ganda': 'kariktan', 'buhay': 'pamumuhay',
        'tao': 'katauhan', 'bahay': 'tahanan', 'araw': 'sikat ng araw',
        'gabi': 'dapit-hapon', 'lupa': 'kalupaan', 'tubig': 'katubigan',
        'hangin': 'hanging', 'apoy': 'ningas', 'pamilya': 'mag-anak',
        'kaibigan': 'kasamahan', 'pag-ibig': 'pagsinta', 'pagtulong': 'pagtangkilik',
        'kasiyahan': 'ligaya', 'kalungkutan': 'pighati', 'takot': 'pangamba',
        'lakas': 'lakas-loob', 'tiwala': 'pananalig', 'pag-asa': 'pag-asa',
        'pangarap': 'panaginip', 'edukasyon': 'pag-aaral', 'kaalaman': 'karunungan',
        'karanasan': 'karanasan', 'pagbabago': 'pagbabagong-buhay', 'pag-unlad': 'pagsulong',
        'kapayapaan': 'payapang pamumuhay', 'katarungan': 'katuwiran', 'pagkakaisa': 'pagtutulungan',
        'kalayaan': 'pagsasarili', 'dangal': 'karangalan', 'purihin': 'papurihan',
        'mabuti': 'marangal', 'masaya': 'maligaya', 'malungkot': 'mapaglungkot',
        'mahalaga': 'makabuluhan', 'mahirap': 'mapaghamon', 'madali': 'magaan',
        'bago': 'makabago', 'luma': 'sinauna', 'malaki': 'malawak',
        'maliit': 'makitid', 'mabilis': 'mabilis', 'mabagal': 'mabagal',
        'mainit': 'maalab', 'malamig': 'manlamig', 'guro': 'tagapagturo',
        'mag-aaral': 'disipulo', 'klase': 'silid-aralan', 'paaralan': 'institusyon',
        'libro': 'aklat', 'kwento': 'salaysay', 'sulat': 'liham',
        'tula': 'awit', 'awit': 'himig', 'sayaw': 'indak',
        'musika': 'tunog', 'sining': 'sining', 'kultura': 'kalinangan',
        'tradisyon': 'kaugalian', 'paniniwala': 'pananampalataya', 'relihiyon': 'pananampalataya',
        'kalikasan': 'kapaligiran', 'kapaligiran': 'kalikasan', 'hayop': 'nilalang',
        'halaman': 'tanim', 'bulaklak': 'rosas', 'prutas': 'bunga',
        'gulay': 'sariwa', 'karne': 'laman', 'isda': 'laman-dagat',
        'manok': 'ibon', 'ibon': 'may-pakpak', 'aso': 'alaga',
        'pusa': 'kuting', 'kalsada': 'daan', 'daan': 'landas',
        'bundok': 'kabuwanan', 'dagat': 'karagatan', 'ilog': 'agos',
        'lawa': 'lawa', 'ulan': 'patak', 'bagyo': 'sigwa',
        'lindol': 'pagyanig', 'baha': 'pagbaha', 'sunog': 'ningas',
        'sakuna': 'disgrasya', 'kalamidad': 'sakuna', 'pandemya': 'salot',
        'sakit': 'karamdaman', 'gamot': 'lunas', 'doktor': 'manggagamot',
        'nars': 'tagapag-alaga', 'ospital': 'pagamutan', 'parmasya': 'botika',
        'pagkain': 'pagkain', 'inumin': 'inom', 'kape': 'kapeng',
        'tsokolate': 'kakaw', 'tinapay': 'kakanin', 'kanin': 'bigas',
        'ulam': 'sabaw', 'sabaw': 'sabaw'
    };

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    const navLinks = document.querySelectorAll('.learn-nav ul li a');
    const sections = document.querySelectorAll('.section');
    const progressBar = document.getElementById('progressBar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // ============================================================
    // SCROLL PROGRESS BAR
    // ============================================================
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // ============================================================
    // SCROLL TO TOP
    // ============================================================
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // DARK MODE
    // ============================================================
    if (darkModeToggle) {
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }

        darkModeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('darkMode', 'disabled');
                this.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
                showToast('Light mode activated.', 'info', 'Tema');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
                this.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
                showToast('Dark mode activated.', 'info', 'Tema');
            }
        });
    }

    // ============================================================
    // TOAST NOTIFICATION SYSTEM
    // ============================================================
    function showToast(message, type = 'info', title = '') {
        const container = document.getElementById('toastContainer') || createToastContainer();
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        const titles = {
            success: 'Tagumpay!',
            error: 'Error!',
            warning: 'Babala!',
            info: 'Impormasyon'
        };
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon"><i class="${icons[type] || icons.info}"></i></div>
            <div class="toast-content">
                <h4>${title || titles[type] || ''}</h4>
                <p>${message}</p>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        container.appendChild(toast);
        
        const timeout = setTimeout(() => {
            removeToast(toast);
        }, 5000);
        
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timeout);
            removeToast(toast);
        });
        
        toast.addEventListener('click', (e) => {
            if (e.target === toast || e.target.closest('.toast-content')) {
                clearTimeout(timeout);
                removeToast(toast);
            }
        });
        
        return toast;
    }

    function createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    function removeToast(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // ============================================================
    // NAVIGATION
    // ============================================================
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));

                this.classList.add('active');

                const sectionId = this.getAttribute('data-section');
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    const navHeight = document.querySelector('.learn-nav')?.offsetHeight || 70;
                    const headerHeight = document.querySelector('.page-header')?.offsetHeight || 200;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - headerHeight + 100;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    // ============================================================
    // MODAL FUNCTIONALITY
    // ============================================================
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-close-btn');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modalOverlays.forEach(m => {
                    if (m !== modal) {
                        m.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modalOverlays.forEach(overlay => {
                if (overlay.classList.contains('active')) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // ============================================================
    // USER INFO MODAL
    // ============================================================
    let userInfo = {
        name: '',
        email: ''
    };

    const userInfoModal = document.getElementById('userInfoModal');
    const openUserInfoBtn = document.getElementById('openUserInfoModal');
    const closeUserInfoBtn = document.getElementById('closeUserInfoModal');
    const userInfoForm = document.getElementById('userInfoForm');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userInfoDisplay = document.getElementById('userInfoDisplay');
    const displayName = document.getElementById('displayName');
    const displayEmail = document.getElementById('displayEmail');
    const editUserInfoBtn = document.getElementById('editUserInfoBtn');
    const essayWritingArea = document.getElementById('essayWritingArea');

    function loadUserInfo() {
        const saved = localStorage.getItem('essayUserInfo');
        if (saved) {
            try {
                userInfo = JSON.parse(saved);
                displayName.textContent = userInfo.name;
                displayEmail.textContent = userInfo.email;
                userInfoDisplay.style.display = 'block';
                essayWritingArea.style.display = 'block';
                const btn = document.querySelector('#userInfoContainer .quiz-intro .primary-btn');
                if (btn) btn.style.display = 'none';
            } catch (e) {
                console.log('Error loading user info');
            }
        }
    }

    loadUserInfo();

    if (openUserInfoBtn) {
        openUserInfoBtn.addEventListener('click', function() {
            if (userInfo.name) {
                userNameInput.value = userInfo.name;
                userEmailInput.value = userInfo.email;
            } else {
                userNameInput.value = '';
                userEmailInput.value = '';
            }
            userInfoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeUserInfoBtn) {
        closeUserInfoBtn.addEventListener('click', function() {
            userInfoModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (userInfoForm) {
        userInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = userNameInput.value.trim();
            const email = userEmailInput.value.trim();
            
            if (!name || !email) {
                showToast('Mangyaring ilagay ang iyong pangalan at email.', 'warning', 'Kinakailangan');
                return;
            }
            
            userInfo.name = name;
            userInfo.email = email;
            
            localStorage.setItem('essayUserInfo', JSON.stringify(userInfo));
            
            displayName.textContent = name;
            displayEmail.textContent = email;
            userInfoDisplay.style.display = 'block';
            essayWritingArea.style.display = 'block';
            const btn = document.querySelector('#userInfoContainer .quiz-intro .primary-btn');
            if (btn) btn.style.display = 'none';
            
            userInfoModal.classList.remove('active');
            document.body.style.overflow = '';
            
            essayWritingArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showToast('Welcome, ' + name + '!', 'success', 'Maligayang Pagdating');
        });
    }

    if (editUserInfoBtn) {
        editUserInfoBtn.addEventListener('click', function() {
            userNameInput.value = userInfo.name;
            userEmailInput.value = userInfo.email;
            userInfoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // ============================================================
    // WORD COUNTER
    // ============================================================
    function addWordCounter(textarea) {
        const container = textarea.closest('.essay-input-area');
        const counter = document.createElement('div');
        counter.className = 'word-counter';
        counter.innerHTML = `
            <span><i class="fas fa-words"></i> Mga Salita: <span class="count-number" id="wordCount">0</span></span>
            <span><i class="fas fa-font"></i> Mga Karakter: <span class="count-number" id="charCount">0</span></span>
            <span><i class="fas fa-clock"></i> Oras ng Pagbasa: <span class="count-number" id="readTime">0</span> min</span>
        `;
        container.appendChild(counter);
        
        function updateCounts() {
            const text = textarea.value;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            const chars = text.length;
            const readTime = Math.ceil(words / 200);
            
            const wc = document.getElementById('wordCount');
            const cc = document.getElementById('charCount');
            const rt = document.getElementById('readTime');
            if (wc) wc.textContent = words;
            if (cc) cc.textContent = chars;
            if (rt) rt.textContent = readTime;
        }
        
        textarea.addEventListener('input', updateCounts);
        updateCounts();
    }

    // ============================================================
    // AUTO-SAVE DRAFT
    // ============================================================
    function setupAutoSave(titleInput, contentTextarea, saveKey) {
        let saveTimeout;
        const container = contentTextarea.closest('.essay-input-area');
        const indicator = document.createElement('div');
        indicator.className = 'auto-save-indicator';
        indicator.innerHTML = `
            <span class="save-dot"></span>
            <span>Auto-save</span>
        `;
        container.appendChild(indicator);
        
        function saveDraft() {
            const data = {
                title: titleInput.value,
                content: contentTextarea.value,
                timestamp: Date.now()
            };
            localStorage.setItem(saveKey, JSON.stringify(data));
            
            const dot = indicator.querySelector('.save-dot');
            dot.className = 'save-dot';
            indicator.querySelector('span:last-child').textContent = 'Na-save';
            
            setTimeout(() => {
                dot.className = 'save-dot';
                indicator.querySelector('span:last-child').textContent = 'Auto-save';
            }, 2000);
        }
        
        function loadDraft() {
            const saved = localStorage.getItem(saveKey);
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
                        titleInput.value = data.title || '';
                        contentTextarea.value = data.content || '';
                        showToast('Na-load ang iyong draft.', 'info', 'Draft');
                        contentTextarea.dispatchEvent(new Event('input'));
                        return true;
                    }
                } catch (e) {
                    console.log('Error loading draft');
                }
            }
            return false;
        }
        
        titleInput.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveDraft, 500);
            const dot = indicator.querySelector('.save-dot');
            dot.className = 'save-dot saving';
            indicator.querySelector('span:last-child').textContent = 'Sine-save...';
        });
        
        contentTextarea.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveDraft, 500);
            const dot = indicator.querySelector('.save-dot');
            dot.className = 'save-dot saving';
            indicator.querySelector('span:last-child').textContent = 'Sine-save...';
        });
        
        loadDraft();
        
        return { saveDraft };
    }

    // ============================================================
    // ESSAY SCORING SYSTEM
    // ============================================================
    function scoreEssay(text) {
        if (!text || text.trim().length < 10) {
            return {
                score: 0,
                grammar: 0,
                vocabulary: 0,
                coherence: 0,
                overall: 0,
                feedback: ['Masyadong maikli ang sanaysay. Kailangan ng mas maraming nilalaman.'],
                wordCount: 0,
                sentenceCount: 0,
                deepWordCount: 0,
                uniqueWords: 0
            };
        }
        
        const words = text.trim().split(/\s+/);
        const wordCount = words.length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const sentenceCount = sentences.length;
        
        let grammarScore = 80;
        if (text.match(/\s+[a-z]\s+/g)?.length > 5) grammarScore -= 5;
        if (text.match(/[.!?]{2,}/g)) grammarScore -= 5;
        if (text.match(/\s{2,}/g)) grammarScore -= 3;
        if (sentenceCount > 0 && wordCount / sentenceCount < 5) grammarScore -= 5;
        
        const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-zñáéíóú]/g, '')));
        const vocabRatio = uniqueWords.size / wordCount;
        let vocabScore = Math.min(100, Math.round(vocabRatio * 200));
        
        let deepWordCount = 0;
        words.forEach(word => {
            const clean = word.toLowerCase().replace(/[^a-zñáéíóú]/g, '');
            if (deepTagalogWords[clean]) deepWordCount++;
        });
        const deepRatio = deepWordCount / wordCount;
        vocabScore = Math.min(100, vocabScore + Math.round(deepRatio * 50));
        
        let coherenceScore = 70;
        if (sentenceCount > 3) coherenceScore += 10;
        if (wordCount > 50) coherenceScore += 10;
        if (text.includes('una') || text.includes('pangalawa') || text.includes('bukod') || text.includes('samantala')) {
            coherenceScore += 10;
        }
        coherenceScore = Math.min(100, coherenceScore);
        
        const overall = Math.round((grammarScore + vocabScore + coherenceScore) / 3);
        
        const feedback = [];
        if (grammarScore < 70) feedback.push('📝 Kailangan pang pagandahin ang gramatika.');
        else if (grammarScore < 85) feedback.push('📝 Maganda ang gramatika, pero may mga lugar na dapat pang pagbutihin.');
        else feedback.push('📝 Mahusay ang gramatika!');
        
        if (vocabScore < 70) feedback.push('📚 Subukang gumamit ng mas malalalim na salita.');
        else if (vocabScore < 85) feedback.push('📚 Maganda ang bokabularyo, pero maaari pang pagyamanin.');
        else feedback.push('📚 Napakayaman ng iyong bokabularyo!');
        
        if (coherenceScore < 70) feedback.push('🔄 Kailangan pang pagbutihin ang pagkakaugnay ng mga ideya.');
        else if (coherenceScore < 85) feedback.push('🔄 Maayos ang daloy ng mga ideya.');
        else feedback.push('🔄 Napakahusay ng pagkakaugnay ng mga ideya!');
        
        if (overall >= 90) feedback.push('🏆 Napakahusay! Isang kahanga-hangang sanaysay.');
        else if (overall >= 75) feedback.push('🌟 Magandang sanaysay! Patuloy na pagbutihin.');
        else if (overall >= 60) feedback.push('💪 May potensyal! Ipagpatuloy ang pagsasanay.');
        else feedback.push('📖 Kailangan pang magsanay. Basahin ang mga aralin at subukang muli.');
        
        return {
            score: overall,
            grammar: grammarScore,
            vocabulary: vocabScore,
            coherence: coherenceScore,
            overall: overall,
            feedback: feedback,
            wordCount: wordCount,
            sentenceCount: sentenceCount,
            deepWordCount: deepWordCount,
            uniqueWords: uniqueWords.size
        };
    }

    // ============================================================
    // DISPLAY SCORE
    // ============================================================
    function displayScore(score) {
        const existing = document.querySelector('.score-container');
        if (existing) existing.remove();
        
        const analysisResult = document.getElementById('aiAnalysisResult');
        if (!analysisResult) return;
        
        const container = document.createElement('div');
        container.className = 'score-container';
        container.innerHTML = `
            <h4><i class="fas fa-chart-bar" style="color: var(--primary);"></i> Pagsusuri ng Sanaysay</h4>
            <div class="score-grid">
                <div class="score-item">
                    <span class="score-label">Gramatika</span>
                    <span class="score-value">${score.grammar}%</span>
                    <div class="score-bar"><div class="bar-fill" style="width: ${score.grammar}%;"></div></div>
                </div>
                <div class="score-item">
                    <span class="score-label">Bokabularyo</span>
                    <span class="score-value">${score.vocabulary}%</span>
                    <div class="score-bar"><div class="bar-fill" style="width: ${score.vocabulary}%;"></div></div>
                </div>
                <div class="score-item">
                    <span class="score-label">Koherensya</span>
                    <span class="score-value">${score.coherence}%</span>
                    <div class="score-bar"><div class="bar-fill" style="width: ${score.coherence}%;"></div></div>
                </div>
                <div class="score-item" style="background: var(--primary); color: white; border-color: var(--primary);">
                    <span class="score-label" style="color: rgba(255,255,255,0.8);">Kabuuang Iskor</span>
                    <span class="score-value" style="color: white;">${score.overall}%</span>
                    <div class="score-bar"><div class="bar-fill" style="width: ${score.overall}%; background: white;"></div></div>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <h5 style="color: var(--text-dark); margin-bottom: 0.5rem;"><i class="fas fa-comment-dots" style="color: var(--primary);"></i> Feedback:</h5>
                <ul style="list-style: none; padding: 0;">
                    ${score.feedback.map(f => `<li style="padding: 0.3rem 0; color: var(--text-medium);"><i class="fas fa-chevron-right" style="color: var(--primary); font-size: 0.7rem; margin-right: 0.5rem;"></i>${f}</li>`).join('')}
                </ul>
            </div>
            <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-light);">
                <span><i class="fas fa-words"></i> ${score.wordCount} salita</span>
                <span style="margin-left: 1rem;"><i class="fas fa-pencil"></i> ${score.sentenceCount} pangungusap</span>
                <span style="margin-left: 1rem;"><i class="fas fa-book"></i> ${score.uniqueWords} natatanging salita</span>
                <span style="margin-left: 1rem;"><i class="fas fa-star" style="color: var(--primary);"></i> ${score.deepWordCount} malalim na salita</span>
            </div>
        `;
        
        analysisResult.appendChild(container);
    }

    // ============================================================
    // TRANSLATION FUNCTIONS
    // ============================================================
    function detectTranslatableWords(text) {
        const words = text.toLowerCase().split(/\s+/);
        const found = [];
        const uniqueWords = new Set();
        
        words.forEach(word => {
            const cleanWord = word.replace(/[^a-zA-ZñÑáéíóú]/g, '');
            if (deepTagalogWords[cleanWord] && !uniqueWords.has(cleanWord)) {
                uniqueWords.add(cleanWord);
                found.push({
                    original: cleanWord,
                    deep: deepTagalogWords[cleanWord]
                });
            }
        });
        
        return found;
    }

    function translateToDeepTagalog(text) {
        let sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        let translatedSentences = sentences.map(sentence => {
            let words = sentence.trim().split(/\s+/);
            let translatedWords = words.map(word => {
                let cleanWord = word.replace(/[^a-zA-ZñÑáéíóú]/g, '').toLowerCase();
                let punctuation = word.match(/[^a-zA-ZñÑáéíóú]/g) || [];
                if (deepTagalogWords[cleanWord]) {
                    let newWord = deepTagalogWords[cleanWord];
                    if (word[0] === word[0].toUpperCase()) {
                        newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
                    }
                    return newWord + punctuation.join('');
                }
                return word;
            });
            return translatedWords.join(' ');
        });
        
        return translatedSentences.join('. ') + '.';
    }

    // ============================================================
    // ESSAY MODULE
    // ============================================================
    const essayTitle = document.getElementById('essayTitle');
    const essayInput = document.getElementById('essayInput');
    const analyzeBtn = document.getElementById('analyzeEssayBtn');
    const clearBtn = document.getElementById('clearEssayBtn');
    const aiResult = document.getElementById('aiAnalysisResult');
    const analysisMessage = document.getElementById('analysisMessage');
    const deepTranslateSection = document.getElementById('deepTranslateSection');
    const deepTranslateBtn = document.getElementById('deepTranslateBtn');
    const comparisonView = document.getElementById('comparisonView');
    const originalEssayDisplay = document.getElementById('originalEssayDisplay');
    const deepTagalogDisplay = document.getElementById('deepTagalogDisplay');
    const submitBtn = document.getElementById('submitEssayBtn');
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = document.getElementById('closeSuccessModal');
    const newEssaySameUserBtn = document.getElementById('newEssaySameUserBtn');
    const newEssayDifferentUserBtn = document.getElementById('newEssayDifferentUserBtn');

    // Add word counter
    if (essayInput) {
        addWordCounter(essayInput);
    }

    // Setup auto-save
    if (essayTitle && essayInput) {
        setupAutoSave(essayTitle, essayInput, 'essayDraft');
    }

    // ============================================================
    // SAVE ESSAY TO SUPABASE
    // ============================================================
    async function saveEssayToSupabase(essayData) {
        try {
            const response = await fetch(API.essays.save, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(essayData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save essay');
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving essay:', error);
            throw error;
        }
    }

    // Analyze essay
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const title = essayTitle.value.trim();
            const text = essayInput.value.trim();
            
            if (!title) {
                showToast('Mangyaring maglagay ng pamagat para sa iyong sanaysay.', 'warning', 'Kinakailangan');
                return;
            }
            
            if (!text) {
                showToast('Mangyaring sumulat muna ng sanaysay bago ito suriin.', 'warning', 'Kinakailangan');
                return;
            }
            
            const translatableWords = detectTranslatableWords(text);
            const score = scoreEssay(text);
            
            displayScore(score);
            
            comparisonView.style.display = 'none';
            
            if (translatableWords.length > 0) {
                let message = '🔍 Natagpuan ang mga sumusunod na salita na maaaring isalin sa mas malalim na Tagalog:<br><br>';
                translatableWords.forEach(item => {
                    message += `<span class="highlight-word">${item.original}</span> → <strong>${item.deep}</strong><br>`;
                });
                message += '<br>💡 I-click ang "Isalin sa Mas Malalim na Tagalog" upang makita ang pinalalim na bersyon ng iyong sanaysay.';
                analysisMessage.innerHTML = message;
                deepTranslateSection.style.display = 'block';
                aiResult.style.display = 'block';
                
                window._originalEssayText = text;
                
            } else {
                analysisMessage.innerHTML = '✅ Ang iyong sanaysay ay gumagamit na ng malalim at wastong mga salitang Tagalog. Mahusay!';
                deepTranslateSection.style.display = 'none';
                aiResult.style.display = 'block';
                
                originalEssayDisplay.textContent = text;
                deepTagalogDisplay.textContent = text + '\n\n(Walang translation na kailangan - gumagamit ka na ng malalim na Tagalog.)';
                comparisonView.style.display = 'block';
            }
            
            if (comparisonView.style.display === 'none') {
                originalEssayDisplay.textContent = text;
                deepTagalogDisplay.textContent = text + '\n\n(Walang translation na ginawa.)';
                comparisonView.style.display = 'block';
            }
            
            aiResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast('Tapos na ang pagsusuri!', 'success', 'Sinuri ng AI');
        });
    }

    if (deepTranslateBtn) {
        deepTranslateBtn.addEventListener('click', function() {
            const text = essayInput.value.trim();
            if (!text) return;
            
            const translated = translateToDeepTagalog(text);
            originalEssayDisplay.textContent = text;
            deepTagalogDisplay.textContent = translated;
            comparisonView.style.display = 'block';
            comparisonView.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast('Na-translate na ang sanaysay sa mas malalim na Tagalog.', 'success', 'Pagsasalin');
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            essayTitle.value = '';
            essayInput.value = '';
            aiResult.style.display = 'none';
            comparisonView.style.display = 'none';
            deepTranslateSection.style.display = 'none';
            const scoreContainer = document.querySelector('.score-container');
            if (scoreContainer) scoreContainer.remove();
            showToast('Na-bura na ang sanaysay.', 'info', 'Burahin');
        });
    }

    // ============================================================
    // PDF GENERATOR
    // ============================================================
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;').replace(/\n/g, '<br>');
    }

    function generatePDFContent(name, email, title, original, translated, date, time) {
        // Tiyaking may laman
        const safeOriginal = original || 'Walang nilalaman.';
        const safeTranslated = translated || 'Walang translation na ginawa.';
        
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Sanaysay - ${escapeHtml(title)}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Arial', 'Helvetica', sans-serif;
                    padding: 40px;
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    color: #333;
                    font-size: 14px;
                    line-height: 1.8;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #b36722;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #5a3310;
                    font-size: 24px;
                    margin: 0;
                }
                .header p {
                    color: #6b5540;
                    font-size: 14px;
                    margin: 5px 0 0;
                }
                .info-box {
                    background: #fdf6f0;
                    padding: 15px 20px;
                    border-radius: 8px;
                    border-left: 4px solid #b36722;
                    margin-bottom: 30px;
                }
                .info-box p {
                    margin: 5px 0;
                }
                .info-box strong {
                    color: #5a3310;
                }
                .section-title {
                    color: #5a3310;
                    font-size: 20px;
                    border-bottom: 2px solid #ddd;
                    padding-bottom: 10px;
                    margin-top: 30px;
                    margin-bottom: 15px;
                }
                .content-box {
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    line-height: 1.8;
                    white-space: pre-wrap;
                    font-size: 14px;
                    min-height: 100px;
                }
                .content-box.translated {
                    background: #fdf6f0;
                    border: 1px solid #b36722;
                    border-left: 4px solid #b36722;
                }
                .footer {
                    text-align: center;
                    border-top: 2px solid #ddd;
                    padding-top: 20px;
                    margin-top: 30px;
                    color: #6b5540;
                    font-size: 12px;
                }
                .footer p { margin: 3px 0; }
                .page-break {
                    page-break-after: always;
                    margin-bottom: 30px;
                }
                .error-text {
                    color: #dc3545;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📝 Sanaysay Learning System 2026</h1>
                <p>Pagsusulit sa Pagsulat ng Sanaysay</p>
            </div>
            
            <div class="info-box">
                <p><strong>👤 Pangalan:</strong> ${escapeHtml(name)}</p>
                <p><strong>📧 Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>📝 Pamagat:</strong> ${escapeHtml(title)}</p>
                <p><strong>📅 Petsa:</strong> ${escapeHtml(date)} | ${escapeHtml(time)}</p>
            </div>
            
            <div class="page-break">
                <h2 class="section-title">📄 Orihinal na Sanaysay</h2>
                <div class="content-box">${escapeHtml(safeOriginal)}</div>
            </div>
            
            <div>
                <h2 class="section-title">🌿 Malalim na Tagalog (AI-Translated)</h2>
                <div class="content-box translated">${escapeHtml(safeTranslated)}</div>
            </div>
            
            <div class="footer">
                <p>© 2026 Sanaysay Learning System | Para sa asignaturang Filipino</p>
                <p>Ito ay isang awtomatikong nabuong PDF mula sa iyong isinumiteng sanaysay.</p>
            </div>
        </body>
        </html>
        `;
    }

    function generateAndDownloadPDF(name, email, title, original, translated, date, time) {
        const fullHtml = generatePDFContent(name, email, title, original, translated, date, time);
        
        const container = document.createElement('div');
        container.innerHTML = fullHtml;
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '800px';
        container.style.background = 'white';
        container.style.zIndex = '-1';
        document.body.appendChild(container);
        
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `Sanaysay_${name.replace(/\s/g, '_')}_${new Date().toISOString().slice(0,10)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                letterRendering: true,
                width: 800
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait' 
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        
        html2pdf()
            .set(opt)
            .from(container)
            .save()
            .then(function() {
                document.body.removeChild(container);
                console.log('✅ PDF downloaded successfully!');
            })
            .catch(function(error) {
                console.error('PDF Generation Error:', error);
                document.body.removeChild(container);
            });
    }

    // ============================================================
    // EXPORT FUNCTIONS
    // ============================================================
    function exportAsWord(name, email, title, original, translated, date, time) {
        const html = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #5a3310; border-bottom: 3px solid #b36722; padding-bottom: 15px; }
            .info { background: #fdf6f0; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #b36722; margin: 20px 0; }
            .section { margin: 30px 0; }
            .section h2 { color: #5a3310; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
            .content { padding: 20px; background: #f9f9f9; border-radius: 8px; border: 1px solid #ddd; line-height: 1.8; white-space: pre-wrap; }
            .translated { background: #fdf6f0; border: 1px solid #b36722; border-left: 4px solid #b36722; }
            .footer { text-align: center; border-top: 2px solid #ddd; padding-top: 20px; margin-top: 30px; color: #6b5540; font-size: 12px; }
        </style>
        </head>
        <body>
            <h1>📝 Sanaysay Learning System 2026</h1>
            <p style="color: #6b5540;">Pagsusulit sa Pagsulat ng Sanaysay</p>
            
            <div class="info">
                <p><strong>👤 Pangalan:</strong> ${escapeHtml(name)}</p>
                <p><strong>📧 Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>📝 Pamagat:</strong> ${escapeHtml(title)}</p>
                <p><strong>📅 Petsa:</strong> ${escapeHtml(date)} | ${escapeHtml(time)}</p>
            </div>
            
            <div class="section">
                <h2>📄 Orihinal na Sanaysay</h2>
                <div class="content">${escapeHtml(original)}</div>
            </div>
            
            <div class="section">
                <h2>🌿 Malalim na Tagalog (AI-Translated)</h2>
                <div class="content translated">${escapeHtml(translated || 'Walang translation na ginawa.')}</div>
            </div>
            
            <div class="footer">
                <p>© 2026 Sanaysay Learning System | Para sa asignaturang Filipino</p>
                <p>Ito ay isang awtomatikong nabuong dokumento mula sa iyong isinumiteng sanaysay.</p>
            </div>
        </body>
        </html>`;
        
        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Sanaysay_${name.replace(/\s/g, '_')}_${new Date().toISOString().slice(0,10)}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    window.exportCurrentEssay = function(format) {
        const title = essayTitle?.value || 'Walang Pamagat';
        const original = originalEssayDisplay?.textContent || '';
        const translated = deepTagalogDisplay?.textContent || '';
        const name = userInfo.name || 'Hindi Nakapangalan';
        const email = userInfo.email || 'Walang Email';
        
        if (!original || original.trim().length < 10) {
            showToast('Walang sanaysay na i-export. Sumulat muna ng sanaysay.', 'warning', 'Export');
            return;
        }
        
        const now = new Date();
        const dateStr = now.toLocaleDateString('tl-PH', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('tl-PH', {
            hour: '2-digit', minute: '2-digit'
        });
        
        switch(format) {
            case 'pdf':
                generateAndDownloadPDF(name, email, title, original, translated, dateStr, timeStr);
                break;
            case 'word':
                exportAsWord(name, email, title, original, translated, dateStr, timeStr);
                break;
            case 'txt':
                const content = `SANAYSAY LEARNING SYSTEM 2026
================================

Pangalan: ${name}
Email: ${email}
Pamagat: ${title}
Petsa: ${dateStr} | ${timeStr}

--- ORIHINAL NA SANAYSAY ---
${original}

--- MALALIM NA TAGALOG (AI-TRANSLATED) ---
${translated || 'Walang translation na ginawa.'}

© 2026 Sanaysay Learning System | Para sa asignaturang Filipino`;
                
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Sanaysay_${name.replace(/\s/g, '_')}_${now.toISOString().slice(0,10)}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                break;
        }
        
        showToast(`Na-export ang sanaysay bilang ${format.toUpperCase()}.`, 'success', 'Export');
    };

    // ============================================================
    // SUBMIT ESSAY - With Supabase Integration
    // ============================================================
    if (submitBtn) {
        submitBtn.addEventListener('click', async function() {
            const title = essayTitle.value.trim();
            const original = originalEssayDisplay.textContent;
            const translated = deepTagalogDisplay.textContent;
            
            if (!title || !original) {
                showToast('Walang sanaysay na ipapasa. Mangyaring suriin muna ang iyong sanaysay.', 'warning', 'Kinakailangan');
                return;
            }
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ipinapasa...';
            submitBtn.disabled = true;
            
            const now = new Date();
            const dateStr = now.toLocaleDateString('tl-PH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const timeStr = now.toLocaleTimeString('tl-PH', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const score = scoreEssay(original);
            
            try {
                const essayData = {
                    name: userInfo.name,
                    email: userInfo.email,
                    title: title,
                    original: original,
                    translated: translated || 'Walang translation na ginawa.',
                    score: score.overall,
                    date: dateStr,
                    time: timeStr
                };
                
                await saveEssayToSupabase(essayData);
                
                generateAndDownloadPDF(userInfo.name, userInfo.email, title, original, translated, dateStr, timeStr);
                
                saveToLocalHistory(userInfo.name, userInfo.email, title, original, translated, score.overall);
                
                const studentParams = {
                    to_name: userInfo.name,
                    to_email: userInfo.email,
                    title: title,
                    original: original,
                    translated: translated || 'Walang translation na ginawa.',
                    date: dateStr,
                    time: timeStr,
                    message: 'Ito ang iyong isinumiteng sanaysay.'
                };
                
                const systemParams = {
                    student_name: userInfo.name,
                    student_email: userInfo.email,
                    title: title,
                    original: original,
                    translated: translated || 'Walang translation na ginawa.',
                    date: dateStr,
                    time: timeStr,
                    message: 'May bagong sanaysay na naipasa mula kay ' + userInfo.name
                };
                
                await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateIDStudent, studentParams);
                await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateIDSystem, systemParams);
                
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Ipasa ang Sanaysay';
                submitBtn.disabled = false;
                
                document.getElementById('successName').textContent = userInfo.name;
                document.getElementById('successEmail').textContent = userInfo.email;
                document.getElementById('successTitle').textContent = title;
                document.getElementById('successDate').textContent = `${dateStr} | ${timeStr}`;
                
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                showToast('Matagumpay na naipasa ang sanaysay!', 'success', 'Tagumpay');
                
            } catch (error) {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Ipasa ang Sanaysay';
                submitBtn.disabled = false;
                showToast(error.message || 'May error sa pag-save. Pakisubukan muli.', 'error', 'Error');
                console.error('Error:', error);
            }
        });
    }

    // ============================================================
    // LOCAL HISTORY (Backup)
    // ============================================================
    function saveToLocalHistory(name, email, title, original, translated, score) {
        const history = JSON.parse(localStorage.getItem('essayHistory') || '[]');
        
        history.push({
            id: Date.now(),
            name: name,
            email: email,
            title: title,
            original: original,
            translated: translated || '',
            score: score || 0,
            date: new Date().toISOString(),
            timestamp: Date.now()
        });
        
        if (history.length > 50) {
            history.shift();
        }
        
        localStorage.setItem('essayHistory', JSON.stringify(history));
    }

    function getHistory() {
        return JSON.parse(localStorage.getItem('essayHistory') || '[]');
    }

    function deleteHistoryItem(id) {
        let history = getHistory();
        history = history.filter(item => item.id !== id);
        localStorage.setItem('essayHistory', JSON.stringify(history));
        return history;
    }

    window.renderHistory = function(filter = '') {
        const container = document.getElementById('historyContainer');
        if (!container) return;
        
        const history = getHistory();
        let filtered = history;
        
        if (filter) {
            const search = filter.toLowerCase();
            filtered = history.filter(item => 
                item.name.toLowerCase().includes(search) ||
                item.title.toLowerCase().includes(search) ||
                item.email.toLowerCase().includes(search)
            );
        }
        
        filtered.sort((a, b) => b.timestamp - a.timestamp);
        
        if (filtered.length === 0) {
            container.innerHTML = `<p style="color: var(--text-light); text-align: center; padding: 2rem;">
                <i class="fas fa-inbox"></i> Walang naitalang sanaysay.
            </p>`;
            return;
        }
        
        container.innerHTML = filtered.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-info">
                    <div class="history-title">${escapeHtml(item.title)}</div>
                    <div class="history-meta">
                        <span><i class="fas fa-user"></i> ${escapeHtml(item.name)}</span>
                        <span><i class="fas fa-envelope"></i> ${escapeHtml(item.email)}</span>
                        <span><i class="fas fa-calendar"></i> ${new Date(item.date).toLocaleDateString('tl-PH')}</span>
                        ${item.score > 0 ? `<span><i class="fas fa-star" style="color: var(--primary);"></i> ${item.score}/100</span>` : ''}
                    </div>
                </div>
                <div class="history-actions">
                    <button class="view-btn" onclick="viewHistoryItem(${item.id})"><i class="fas fa-eye"></i> Tingnan</button>
                    <button class="delete-btn" onclick="deleteHistoryItemUI(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    };

    window.viewHistoryItem = function(id) {
        const history = getHistory();
        const item = history.find(h => h.id === id);
        if (!item) return;
        
        const modal = document.getElementById('historyModal');
        if (modal) {
            document.getElementById('historyModalTitle').textContent = item.title;
            document.getElementById('historyModalAuthor').textContent = `${item.name} (${item.email})`;
            document.getElementById('historyModalDate').textContent = new Date(item.date).toLocaleDateString('tl-PH', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
            document.getElementById('historyModalOriginal').textContent = item.original;
            document.getElementById('historyModalTranslated').textContent = item.translated || 'Walang translation.';
            if (item.score > 0) {
                document.getElementById('historyModalScore').textContent = `${item.score}/100`;
            } else {
                document.getElementById('historyModalScore').textContent = 'Walang iskor';
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.deleteHistoryItemUI = function(id) {
        if (confirm('Sigurado ka bang gusto mong burahin ang sanaysay na ito?')) {
            deleteHistoryItem(id);
            renderHistory(document.getElementById('historySearch')?.value || '');
            showToast('Na-bura na ang sanaysay.', 'success', 'Burahin');
        }
    };

    window.exportHistory = function(format) {
        const history = getHistory();
        if (history.length === 0) {
            showToast('Walang naitalang sanaysay na i-export.', 'warning', 'Export');
            return;
        }
        
        let content = '';
        let filename = '';
        let mimeType = '';
        
        switch(format) {
            case 'txt':
                content = history.map(item => 
                    `PAMAGAT: ${item.title}\nPANGALAN: ${item.name}\nEMAIL: ${item.email}\nPETSA: ${new Date(item.date).toLocaleDateString('tl-PH')}\nSCORE: ${item.score}/100\n\n${item.original}\n\n---\n`
                ).join('\n');
                filename = `sanaysay_history_${new Date().toISOString().slice(0,10)}.txt`;
                mimeType = 'text/plain';
                break;
            case 'json':
                content = JSON.stringify(history, null, 2);
                filename = `sanaysay_history_${new Date().toISOString().slice(0,10)}.json`;
                mimeType = 'application/json';
                break;
            default:
                return;
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast(`Na-export ang ${history.length} na sanaysay.`, 'success', 'Export');
    };

    // ============================================================
    // SUCCESS MODAL
    // ============================================================
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (newEssaySameUserBtn) {
        newEssaySameUserBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
            
            essayTitle.value = '';
            essayInput.value = '';
            aiResult.style.display = 'none';
            comparisonView.style.display = 'none';
            deepTranslateSection.style.display = 'none';
            const scoreContainer = document.querySelector('.score-container');
            if (scoreContainer) scoreContainer.remove();
            
            userInfoDisplay.style.display = 'block';
            essayTitle.focus();
            essayWritingArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showToast('Gumawa ng bagong sanaysay gamit ang parehong account.', 'info', 'Bagong Sanaysay');
        });
    }

    if (newEssayDifferentUserBtn) {
        newEssayDifferentUserBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
            
            essayTitle.value = '';
            essayInput.value = '';
            aiResult.style.display = 'none';
            comparisonView.style.display = 'none';
            deepTranslateSection.style.display = 'none';
            const scoreContainer = document.querySelector('.score-container');
            if (scoreContainer) scoreContainer.remove();
            
            userInfo.name = '';
            userInfo.email = '';
            localStorage.removeItem('essayUserInfo');
            
            userInfoDisplay.style.display = 'none';
            const btn = document.querySelector('#userInfoContainer .quiz-intro .primary-btn');
            if (btn) btn.style.display = 'inline-flex';
            essayWritingArea.style.display = 'none';
            
            userNameInput.value = '';
            userEmailInput.value = '';
            userInfoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================================
    // KEYBOARD SHORTCUTS
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            if (analyzeBtn) analyzeBtn.click();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            if (essayTitle && essayInput) {
                const draft = setupAutoSave(essayTitle, essayInput, 'essayDraft');
                draft.saveDraft();
                showToast('Na-save ang draft.', 'success', 'Draft');
            }
        }
    });

    // ============================================================
    // INITIALIZE
    // ============================================================
    const firstNavLink = document.querySelector('.learn-nav ul li a');
    if (firstNavLink) {
        firstNavLink.click();
    }
    
    renderHistory();

    console.log('📝 Sanaysay Learning System 2026 loaded!');
    console.log('📧 EmailJS configured with your credentials!');
    console.log('💡 Keyboard shortcuts: Ctrl+Enter = Suriin, Ctrl+Shift+S = Save Draft');
    console.log('📄 PDF will be auto-downloaded upon submission!');
    console.log('☁️ Supabase integration enabled for essays!');
});