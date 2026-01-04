document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeButtonAnimations();
    initializeFormAnimations();
    
    console.log('🎉 Blog loaded with animated buttons!');
});

// ==================== BUTTON ANIMATIONS ====================

function initializeButtonAnimations() {
    // Animate all buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit, .btn-cancel, .btn-nav');
    
    buttons.forEach((btn, index) => {
        btn.style.animationDelay = `${index * 0.05}s`;
        
        // Ripple effect on click
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
        
        // Hover animation
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.4s ease';
        });
        
        // Mouse move effect
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    if (!element.style.position || element.style.position === 'static') {
        element.style.position = 'relative';
    }
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// ==================== PAGE ANIMATIONS ====================

function initializeAnimations() {
    // Animate posts with stagger
    const posts = document.querySelectorAll('.post-card');
    posts.forEach((post, index) => {
        post.style.animationDelay = `${index * 0.1}s`;
    });

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.post-card, .section-header, .form-container');
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealOnScroll.unobserve(entry.target);
            }
        });
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealOnScroll.observe(el);
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
        }
    });
}

// ==================== FORM ANIMATIONS ====================

function initializeFormAnimations() {
    const form = document.querySelector('form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach((input, index) => {
        input.style.animationDelay = `${index * 0.1}s`;
        
        // Label animation on focus
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            input.addEventListener('focus', function() {
                label.style.color = '#e94560';
                label.style.transform = 'scale(1.05)';
                label.style.transition = 'all 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.color = 'var(--primary)';
                    label.style.transform = 'scale(1)';
                }
            });
        }
        
        // Input fill animation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#0f3460';
                this.style.boxShadow = '0 0 0 3px rgba(15, 52, 96, 0.1)';
            }
        });
    });

    // Submit button loading animation
    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('.btn-submit');
        if (submitBtn && !form.querySelector('[style*="color: var(--highlight)"]')) {
            submitBtn.style.animation = 'heartBeat 0.5s ease';
        }
    });
}

// ==================== UTILITY FUNCTIONS ====================

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function bounce(element) {
    element.style.animation = 'bounce 0.5s ease';
    setTimeout(() => { element.style.animation = ''; }, 500);
}

console.log('✨ All animations initialized!');

// Format date with animation
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Truncate text with animation
function truncateText(text, length) {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
}

// Smooth scroll to element
function smoothScroll(target) {
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Animate numbers counting up
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Fade in element with delay
function fadeInElement(element, delay = 0) {
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease';
        element.style.opacity = '1';
    }, delay);
}

// Bounce animation
function bounce(element) {
    element.style.animation = 'bounce 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Flash animation
function flash(element) {
    element.style.animation = 'flash 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Shake animation for errors
function shake(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Loading spinner animation
function showLoadingSpinner(container) {
    const spinner = document.createElement('div');
    spinner.className = 'loading';
    spinner.style.cssText = `
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 4px solid #ecf0f1;
        border-top-color: #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    container.appendChild(spinner);
    return spinner;
}

// Search with animation
const searchInput = document.getElementById('search-posts');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const posts = document.querySelectorAll('.post-card');
        let visibleCount = 0;
        
        posts.forEach(post => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const content = post.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                post.style.display = 'block';
                post.style.animation = 'slideIn 0.4s ease';
                visibleCount++;
            } else {
                post.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Mouse follow animation
document.addEventListener('mousemove', (e) => {
    const posts = document.querySelectorAll('.post-card');
    posts.forEach(post => {
        const rect = post.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleToMouse = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = 5;
        
        // Subtle shadow effect following mouse
        post.style.boxShadow = `${Math.cos(angleToMouse) * distance}px ${Math.sin(angleToMouse) * distance}px 20px rgba(0, 0, 0, 0.2)`;
    });
});

console.log('✨ All animations initialized successfully!');
