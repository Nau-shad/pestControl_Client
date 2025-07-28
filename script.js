// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = '#f5b301';
    } else {
        navbar.style.background = '#f5b301';
    }
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Enhanced card hover effects and scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.service-card, .about-content, .about-image, .stat-item, .review-card, .fade-in').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    let hasStarted = false;
    
    const timer = setInterval(() => {
        if (!hasStarted) {
            hasStarted = true;
        }
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target === 99.9) {
            element.textContent = current.toFixed(1) + '%';
        } else if (target >= 1000) {
            element.textContent = Math.floor(current) + '+';
        } else if (element.textContent === '24/7') {
            return; // Don't animate 24/7
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 40);
}

// Trigger counter when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                const target = parseFloat(num.getAttribute('data-target'));
                if (target) {
                    animateCounter(num, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.stats-container'));

// Service cards animation with staggered effect
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.zIndex = '1';
    });
});

// Manual carousel controls
const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentIndex = 0;
const cardWidth = 340; // 320px + 20px margin

if (nextButton && prevButton) {
    nextButton.addEventListener('click', e => {
        currentIndex++;
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

        if (currentIndex >= cards.length / 2) {
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0px)';
                currentIndex = 0;
            }, 500);
        }
    });

    prevButton.addEventListener('click', e => {
        if (currentIndex === 0) {
            track.style.transition = 'none';
            currentIndex = Math.floor(cards.length / 2);
            track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                currentIndex--;
                track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
            }, 50);
        } else {
            currentIndex--;
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
        }
    });
}

// Pause auto-scroll on hover
const servicesSection = document.querySelector('.services');
if (servicesSection) {
    servicesSection.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    servicesSection.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}

// Review cards staggered animation
document.querySelectorAll('.review-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Intersection Observer for service cards
const serviceCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => {
    serviceCardsObserver.observe(card);
});

// Smooth scroll behavior for all internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add click outside to close mobile menu
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped up - could trigger some action
            console.log('Swiped up');
        } else {
            // Swiped down - could trigger some action
            console.log('Swiped down');
        }
    }
}

// Lazy loading for images (if you add images later)
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// Add scroll progress indicator
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #f5b301;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// Initialize scroll indicator
createScrollIndicator();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-based animations or effects here
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);