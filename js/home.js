// ============================================================
// HOME PAGE - SANAYSAY LEARNING SYSTEM 2026
// WITH SUPABASE BACKEND INTEGRATION
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================================
    // API ENDPOINTS (Netlify Functions)
    // ============================================================
    const API_BASE = '/.netlify/functions';
    const API = {
        testimonials: {
            get: `${API_BASE}/get-testimonials`,
            post: `${API_BASE}/save-testimonial`
        }
    };

    // ============================================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-container')) {
                navLinks.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }

    // ============================================================
    // DARK MODE TOGGLE
    // ============================================================
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    const navContainer = document.querySelector('.nav-links');
    if (navContainer) {
        let darkModeLi = document.querySelector('#homeDarkModeToggle');
        if (!darkModeLi) {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="#" id="homeDarkModeToggle" style="cursor: pointer;">
                    <i class="fas fa-moon"></i> <span id="darkModeLabel">Dark Mode</span>
                </a>
            `;
            navContainer.appendChild(li);

            const darkModeToggle = document.getElementById('homeDarkModeToggle');
            if (darkModeToggle) {
                if (localStorage.getItem('darkMode') === 'enabled') {
                    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> <span id="darkModeLabel">Light Mode</span>';
                }

                darkModeToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    if (isDark) {
                        document.documentElement.removeAttribute('data-theme');
                        localStorage.setItem('darkMode', 'disabled');
                        this.innerHTML = '<i class="fas fa-moon"></i> <span id="darkModeLabel">Dark Mode</span>';
                    } else {
                        document.documentElement.setAttribute('data-theme', 'dark');
                        localStorage.setItem('darkMode', 'enabled');
                        this.innerHTML = '<i class="fas fa-sun"></i> <span id="darkModeLabel">Light Mode</span>';
                    }
                });
            }
        }
    }

    // ============================================================
    // SCROLL TO TOP
    // ============================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

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
    // ANIMATE ELEMENTS ON SCROLL
    // ============================================================
    const featureCards = document.querySelectorAll('.feature-card');
    const researcherCards = document.querySelectorAll('.researcher-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    function animateElements(elements, delay = 100) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * delay);
                }
            });
        }, observerOptions);

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    animateElements(featureCards, 100);
    animateElements(researcherCards, 100);

    // ============================================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.home-nav')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // PARALLAX EFFECT ON HERO
    // ============================================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop < window.innerHeight) {
                hero.style.backgroundPositionY = scrollTop * 0.3 + 'px';
            }
        });
    }

    // ============================================================
    // ============================================================
    // TESTIMONIALS / FEEDBACK SYSTEM - WITH SUPABASE BACKEND
    // ============================================================
    // ============================================================

    // ============================================================
    // LOAD TESTIMONIALS FROM BACKEND
    // ============================================================
    async function loadTestimonials() {
        const grid = document.getElementById('testimonialsGrid');
        if (!grid) return;

        try {
            const response = await fetch(API.testimonials.get);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const testimonials = await response.json();

            if (testimonials.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-light);">
                        <i class="fas fa-comment-slash" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                        <p>Wala pang mga patotoo. Maging una na mag-iwan ng iyong mensahe!</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = testimonials.map(item => `
                <div class="testimonial-card">
                    <div class="testimonial-stars">${getStars(item.rating)}</div>
                    <div class="testimonial-icon">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <p>${escapeHtml(item.message)}</p>
                    <div class="testimonial-author">
                        <strong>${escapeHtml(item.name)}</strong>
                        <span>${escapeHtml(item.role || 'Gumagamit')}</span>
                    </div>
                    <div class="testimonial-date">📅 ${formatDate(item.created_at)}</div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading testimonials:', error);
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-light);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #ffc107;"></i>
                    <p>Hindi makakonek sa server. Pakisubukan muli mamaya.</p>
                    <button onclick="location.reload()" class="hero-btn primary" style="margin-top: 1rem; font-size: 0.9rem; padding: 0.5rem 1.5rem;">
                        <i class="fas fa-sync"></i> Subukan Muli
                    </button>
                </div>
            `;
        }
    }

    // ============================================================
    // SAVE TESTIMONIAL TO BACKEND
    // ============================================================
    async function saveTestimonial(data) {
        try {
            const response = await fetch(API.testimonials.post, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save testimonial');
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving testimonial:', error);
            throw error;
        }
    }

    // ============================================================
    // HELPER FUNCTIONS
    // ============================================================
    function getStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<span class="star-filled">★</span>';
            } else {
                stars += '<span class="star-empty">★</span>';
            }
        }
        return stars;
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatDate(dateString) {
        if (!dateString) return 'Kasalukuyan';
        const date = new Date(dateString);
        return date.toLocaleDateString('tl-PH', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // ============================================================
    // STAR RATING SYSTEM
    // ============================================================
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingLabel = document.getElementById('ratingLabel');
    const ratingInput = document.getElementById('testimonialRating');
    let selectedRating = 0;

    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                selectedRating = value;
                ratingInput.value = value;
                updateStars(value);
                updateRatingLabel(value);
            });

            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.getAttribute('data-value'));
                updateStars(value, true);
            });

            star.addEventListener('mouseleave', function() {
                updateStars(selectedRating);
            });
        });
    }

    function updateStars(rating, hover = false) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            if (value <= rating) {
                star.classList.add('active');
                star.textContent = '★';
            } else {
                star.classList.remove('active');
                star.textContent = '☆';
            }
        });
    }

    function updateRatingLabel(rating) {
        const labels = {
            0: 'Pumili ng rating',
            1: '⭐ Sobrang Kulang',
            2: '⭐⭐ Kulang',
            3: '⭐⭐⭐ Katamtaman',
            4: '⭐⭐⭐⭐ Maganda',
            5: '⭐⭐⭐⭐⭐ Napakahusay!'
        };
        ratingLabel.textContent = labels[rating] || labels[0];
    }

    // ============================================================
    // SUBMIT TESTIMONIAL
    // ============================================================
    const testimonialForm = document.getElementById('testimonialForm');

    if (testimonialForm) {
        testimonialForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('testimonialName').value.trim();
            const role = document.getElementById('testimonialRole').value.trim();
            const message = document.getElementById('testimonialMessage').value.trim();
            const rating = parseInt(ratingInput.value) || 0;

            // Validation
            if (!name || !role || !message) {
                showToast('Mangyaring kumpletuhin ang lahat ng field.', 'warning', 'Kinakailangan');
                return;
            }

            if (rating === 0) {
                showToast('Mangyaring pumili ng rating.', 'warning', 'Kinakailangan');
                return;
            }

            // Show loading state
            const submitBtn = document.getElementById('submitTestimonialBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ipinapasa...';
            submitBtn.disabled = true;

            try {
                // Save to backend
                await saveTestimonial({
                    name: name,
                    role: role,
                    message: message,
                    rating: rating
                });

                // Show success message
                const successDiv = document.querySelector('.testimonial-success');
                if (successDiv) {
                    successDiv.classList.add('show');
                    setTimeout(() => {
                        successDiv.classList.remove('show');
                    }, 5000);
                }

                // Reset form
                testimonialForm.reset();
                selectedRating = 0;
                ratingInput.value = 0;
                updateStars(0);
                updateRatingLabel(0);

                // Reload testimonials
                await loadTestimonials();

                showToast('Salamat sa iyong patotoo!', 'success', 'Na-save');

            } catch (error) {
                showToast(error.message || 'May error sa pag-save. Pakisubukan muli.', 'error', 'Error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================================
    // TOAST NOTIFICATIONS
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
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
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
    // INITIALIZE - Load testimonials on page load
    // ============================================================
    loadTestimonials();

    console.log('🏠 Home page loaded successfully!');
    console.log('📝 Testimonials system connected to Supabase!');
});