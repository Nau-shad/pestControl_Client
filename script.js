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

// Enhanced card hover effects
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.zIndex = '1';
    });

    // Staggered animation on load
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// Scroll animations
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
document.querySelectorAll('.service-card, .about-content, .stat-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toFixed(0) + (target === 99.9 ? '.9' : '') + (element.nextElementSibling.textContent.includes('%') ? '%' : target > 100 ? '+' : '');
    }, 40);
}

// Trigger counter when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                const target = parseFloat(num.textContent);
                animateCounter(num, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.stats-container'));

// Carousel functionality
const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const cardWidth = cards[0].getBoundingClientRect().width;
let currentIndex = 0;

// Clone cards for infinite loop
const clonedCards = cards.map(card => card.cloneNode(true));
clonedCards.forEach(card => track.appendChild(card));

// Arrange the cards next to one another
const setCardPosition = (card, index) => {
    card.style.left = cardWidth * index + 'px';
};

// When I click left, move cards to the left
prevButton.addEventListener('click', e => {
    currentIndex--;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(' + (-cardWidth * currentIndex) + 'px)';

    if (currentIndex === 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform = 'translateX(' + (-cardWidth * cards.length) + 'px)';
            currentIndex = cards.length;
        }, 500);
    }
});

// When I click right, move cards to the right
nextButton.addEventListener('click', e => {
    currentIndex++;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(' + (-cardWidth * currentIndex) + 'px)';

    if (currentIndex === cards.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0px)';
            currentIndex = 0;
        }, 500);
    }
});