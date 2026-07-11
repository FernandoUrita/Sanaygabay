// ============================================================
// SANAYSAY LEARNING SYSTEM 2026 - COMPLETE JAVASCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================================
    // EMAILJS CONFIGURATION
    // ============================================================
    const EMAILJS_CONFIG = {
        publicKey: 'KZg1auPTnCvcF5Ko3',
        serviceID: 'service_cxdhpih',
        templateIDStudent: 'template_kkza0yn',
        templateIDSystem: 'template_mr7yebw',
        systemEmail: 'sanaysay.system2026@gmail.com'
    };

    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    const progressBar = document.getElementById('progressBar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // ============================================================
    // SCROLL PROGRESS BAR
    // ============================================================
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';

        if (scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // ============================================================
    // SCROLL TO TOP
    // ============================================================
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================
    // DARK MODE
    // ============================================================
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
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'enabled');
            this.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
    });

    // ============================================================
    // NAVIGATION
    // ============================================================
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
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

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
                document.getElementById('userInfoContainer').querySelector('.quiz-intro .primary-btn').style.display = 'none';
            } catch (e) {
                console.log('Error loading user info');
            }
        }
    }

    loadUserInfo();

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

    closeUserInfoBtn.addEventListener('click', function() {
        userInfoModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    userInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = userNameInput.value.trim();
        const email = userEmailInput.value.trim();
        
        if (!name || !email) {
            alert('Mangyaring ilagay ang iyong pangalan at email.');
            return;
        }
        
        userInfo.name = name;
        userInfo.email = email;
        
        localStorage.setItem('essayUserInfo', JSON.stringify(userInfo));
        
        displayName.textContent = name;
        displayEmail.textContent = email;
        userInfoDisplay.style.display = 'block';
        essayWritingArea.style.display = 'block';
        document.getElementById('userInfoContainer').querySelector('.quiz-intro .primary-btn').style.display = 'none';
        
        userInfoModal.classList.remove('active');
        document.body.style.overflow = '';
        
        essayWritingArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    editUserInfoBtn.addEventListener('click', function() {
        userNameInput.value = userInfo.name;
        userEmailInput.value = userInfo.email;
        userInfoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // ============================================================
    // ESSAY MODULE - AI TRANSLATION
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

    // Deep Tagalog words database
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
        'lawà': 'lawa', 'ulan': 'patak', 'bagyo': 'sigwa',
        'lindol': 'pagyanig', 'baha': 'pagbaha', 'sunog': 'ningas',
        'sakuna': 'disgrasya', 'kalamidad': 'sakuna', 'pandemya': 'salot',
        'sakit': 'karamdaman', 'gamot': 'lunas', 'doktor': 'manggagamot',
        'nars': 'tagapag-alaga', 'ospital': 'pagamutan', 'parmasya': 'botika',
        'pagkain': 'pagkain', 'inumin': 'inom', 'kape': 'kapeng',
        'tsokolate': 'kakaw', 'tinapay': 'kakanin', 'kanin': 'bigas',
        'ulam': 'sabaw', 'sabaw': 'sabaw'
    };

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

    // Analyze essay
    analyzeBtn.addEventListener('click', function() {
        const title = essayTitle.value.trim();
        const text = essayInput.value.trim();
        
        if (!title) {
            alert('Mangyaring maglagay ng pamagat para sa iyong sanaysay.');
            return;
        }
        
        if (!text) {
            alert('Mangyaring sumulat muna ng sanaysay bago ito suriin.');
            return;
        }
        
        const translatableWords = detectTranslatableWords(text);
        
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
    });

    deepTranslateBtn.addEventListener('click', function() {
        const text = essayInput.value.trim();
        if (!text) return;
        
        const translated = translateToDeepTagalog(text);
        originalEssayDisplay.textContent = text;
        deepTagalogDisplay.textContent = translated;
        comparisonView.style.display = 'block';
        comparisonView.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    clearBtn.addEventListener('click', function() {
        essayTitle.value = '';
        essayInput.value = '';
        aiResult.style.display = 'none';
        comparisonView.style.display = 'none';
        deepTranslateSection.style.display = 'none';
    });

    // ============================================================
    // PDF GENERATOR
    // ============================================================
    function generatePDFContent(name, email, title, original, translated, date, time) {
        const escapeHtml = (str) => {
            if (!str) return '';
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                     .replace(/"/g, '&quot;').replace(/\n/g, '<br>');
        };
        
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
                <div class="content-box">${escapeHtml(original)}</div>
            </div>
            
            <div>
                <h2 class="section-title">🌿 Malalim na Tagalog (AI-Translated)</h2>
                <div class="content-box translated">${escapeHtml(translated || 'Walang translation na ginawa.')}</div>
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
                width: 800,
                height: container.scrollHeight || 1200
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
    // SUBMIT ESSAY
    // ============================================================
    submitBtn.addEventListener('click', function() {
        const title = essayTitle.value.trim();
        const original = originalEssayDisplay.textContent;
        const translated = deepTagalogDisplay.textContent;
        
        if (!title || !original) {
            alert('Walang sanaysay na ipapasa. Mangyaring suriin muna ang iyong sanaysay.');
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
        
        // Generate and download PDF
        setTimeout(function() {
            generateAndDownloadPDF(userInfo.name, userInfo.email, title, original, translated, dateStr, timeStr);
        }, 500);
        
        // Prepare email data
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
        
        // Send emails
        emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateIDStudent, studentParams)
            .then(() => {
                return emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateIDSystem, systemParams);
            })
            .then(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Ipasa ang Sanaysay';
                submitBtn.disabled = false;
                
                document.getElementById('successName').textContent = userInfo.name;
                document.getElementById('successEmail').textContent = userInfo.email;
                document.getElementById('successTitle').textContent = title;
                document.getElementById('successDate').textContent = `${dateStr} | ${timeStr}`;
                
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            })
            .catch(error => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Ipasa ang Sanaysay';
                submitBtn.disabled = false;
                alert('May error sa pagpapadala ng email. Pero ang iyong PDF ay na-download na.\nError: ' + (error.text || error.message));
                console.error('EmailJS Error:', error);
            });
    });

    // ============================================================
    // SUCCESS MODAL - TWO BUTTONS
    // ============================================================
    closeSuccessBtn.addEventListener('click', function() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    newEssaySameUserBtn.addEventListener('click', function() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
        
        essayTitle.value = '';
        essayInput.value = '';
        aiResult.style.display = 'none';
        comparisonView.style.display = 'none';
        deepTranslateSection.style.display = 'none';
        
        userInfoDisplay.style.display = 'block';
        essayTitle.focus();
        essayWritingArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    newEssayDifferentUserBtn.addEventListener('click', function() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
        
        essayTitle.value = '';
        essayInput.value = '';
        aiResult.style.display = 'none';
        comparisonView.style.display = 'none';
        deepTranslateSection.style.display = 'none';
        
        userInfo.name = '';
        userInfo.email = '';
        localStorage.removeItem('essayUserInfo');
        
        userInfoDisplay.style.display = 'none';
        document.getElementById('userInfoContainer').querySelector('.quiz-intro .primary-btn').style.display = 'inline-flex';
        essayWritingArea.style.display = 'none';
        
        userNameInput.value = '';
        userEmailInput.value = '';
        userInfoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================================
    // KEYBOARD SHORTCUTS
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            analyzeBtn.click();
        }
    });

    // ============================================================
    // INITIALIZE
    // ============================================================
    document.querySelector('nav ul li a').click();

    console.log('📝 Sanaysay Learning System 2026 loaded!');
    console.log('📧 EmailJS configured with your credentials!');
    console.log('💡 Keyboard shortcuts: Ctrl+Enter = Suriin');
    console.log('📄 PDF will be auto-downloaded upon submission!');
});