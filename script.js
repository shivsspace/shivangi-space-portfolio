// Theme Management
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    return savedTheme;
};

const updateThemeIcon = (theme) => {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
};

// Create Theme Toggle Button in Navbar
const createThemeToggle = () => {
    const nav = document.querySelector('nav');
    
    // Check if nav-links exists
    const navLinks = nav.querySelector('.nav-links');
    if (!navLinks) return;
    
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle theme');
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    toggleBtn.innerHTML = `<span class="theme-icon">${currentTheme === 'dark' ? '☀️' : '🌙'}</span>`;
    toggleBtn.addEventListener('click', toggleTheme);
    
    // Create wrapper for nav-links and toggle
    const navRight = document.createElement('div');
    navRight.className = 'nav-right';
    
    // Insert wrapper before nav-links, then move nav-links into it
    nav.insertBefore(navRight, navLinks);
    navRight.appendChild(navLinks);
    navRight.appendChild(toggleBtn);
};

// Generate Starfield
const createStarfield = () => {
    const starfield = document.getElementById('starfield');
    const starCount = window.innerWidth < 768 ? 100 : 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }
};

// Custom Cursor with Stardust Trail
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

const initCursor = () => {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create stardust trail
        if (Math.random() > 0.7) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 800);
        }
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
};

// Enhanced Planet Interactions with Tooltips
const initPlanets = () => {
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach((planet, index) => {
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'planet-tooltip';
        const title = planet.querySelector('.planet-title').textContent;
        tooltip.textContent = `Explore ${title}`;
        planet.appendChild(tooltip);
        
        // Add click interaction
        planet.addEventListener('click', () => {
            const projectTitle = planet.querySelector('.planet-title').textContent;
            const projectDesc = planet.querySelector('.planet-desc').textContent;
            
            // Create modal or alert (you can enhance this with a custom modal)
            alert(`🚀 ${projectTitle}\n\n${projectDesc}\n\nClick to view full project details!`);
        });
        
        // Enhanced hover effects
        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });
        
        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });
};

// Smooth Scroll with Parallax
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Parallax Starfield Effect
const initParallax = () => {
    const starfield = document.getElementById('starfield');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        starfield.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
};

// Animated Stats Counter
const initStatsCounter = () => {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const target = parseInt(text);
                    const isPercent = text.includes('%');
                    const isPlus = text.includes('+');
                    let current = 0;
                    const increment = target / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + (isPercent ? '%' : isPlus ? '+' : '');
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + (isPercent ? '%' : isPlus ? '+' : '');
                        }
                    }, 30);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);
};

// Reveal animations on scroll
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for reveal animation
    const sections = document.querySelectorAll('.mission-log, .planet, .cockpit-panel');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
};

// Form Submission Handler
const initFormHandler = () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        // Show success message with animation
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '🚀 Transmission Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #45A29E, #66FCF1)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            form.reset();
        }, 3000);
        
        console.log('Form submitted:', { name, email, message });
    });
};

// Keyboard Navigation Enhancement
const initKeyboardNav = () => {
    document.addEventListener('keydown', (e) => {
        // Toggle theme with 'T' key
        if (e.key.toLowerCase() === 't') {
            toggleTheme();
        }
        
        // Navigate sections with arrow keys
        if (e.key === 'ArrowDown') {
            const sections = ['hero', 'about', 'portfolio', 'contact'];
            const currentSection = sections.find(id => {
                const el = document.getElementById(id);
                const rect = el.getBoundingClientRect();
                return rect.top >= -100 && rect.top <= 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                const nextSection = sections[currentIndex + 1];
                if (nextSection) {
                    document.getElementById(nextSection).scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        
        if (e.key === 'ArrowUp') {
            const sections = ['hero', 'about', 'portfolio', 'contact'];
            const currentSection = sections.find(id => {
                const el = document.getElementById(id);
                const rect = el.getBoundingClientRect();
                return rect.top >= -100 && rect.top <= 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                const prevSection = sections[currentIndex - 1];
                if (prevSection) {
                    document.getElementById(prevSection).scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
};

// Add floating particles effect
const createFloatingParticles = () => {
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--cursor-color)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.6';
        particle.style.zIndex = '1';
        
        const duration = Math.random() * 10 + 10;
        const drift = Math.random() * 100 - 50;
        
        particle.animate([
            { transform: 'translateY(0) translateX(0)', opacity: 0.6 },
            { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        }).onfinish = () => particle.remove();
        
        document.body.appendChild(particle);
    };
    
    // Create particles periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            createParticle();
        }
    }, 2000);
};

// Check for reduced motion preference
const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme first
    const currentTheme = initTheme();
    createThemeToggle();
    
    // Create visual elements
    createStarfield();
    
    // Initialize interactions
    initCursor();
    initPlanets();
    initSmoothScroll();
    initFormHandler();
    initKeyboardNav();
    
    // Initialize animations if motion is allowed
    if (!prefersReducedMotion()) {
        initParallax();
        initStatsCounter();
        initScrollAnimations();
        createFloatingParticles();
    }
    
    // Add loading fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Regenerate starfield on significant resize
        const starfield = document.getElementById('starfield');
        const currentStars = starfield.children.length;
        const targetStars = window.innerWidth < 768 ? 100 : 200;
        
        if (Math.abs(currentStars - targetStars) > 50) {
            starfield.innerHTML = '';
            createStarfield();
        }
    }, 250);
});