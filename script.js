// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 52, 96, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = '#0f3460';
        navbar.style.backdropFilter = 'none';
    }
});

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach((counter, index) => {
                    const targetId = counter.getAttribute('id');
                    let target = 0;
                    let suffix = '';
                    
                    if (targetId === 'members') target = 150;
                    else if (targetId === 'rr') { target = 85; suffix = '%'; }
                    else if (targetId === 'awards') target = 12;
                    else if (targetId === 'events') { target = 35; suffix = '+'; }
                    
                    let count = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            counter.textContent = target + suffix;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(count) + suffix;
                        }
                    }, 30);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats');
    observer.observe(statsSection);
}

// Events tabs functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tab-btn.active').classList.remove('active');
        document.querySelector('.tab-content.active').classList.remove('active');
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Events slider
let currentSlide = 0;
const slides = document.querySelectorAll('.event-slide');
const sliderTrack = document.querySelector('.slider-track');
const totalSlides = slides.length;

function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 24; // including margin
    sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

document.querySelector('.slider-btn.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

document.querySelector('.slider-btn.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

// Auto slider
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}, 5000);

// Contact form
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Simulate form submission
    alert('Thank you! Your message has been sent to ieee.cs.rit@gmail.com\nWe\'ll get back to you within 24 hours.');
    e.target.reset();
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Successfully subscribed to IEEE CS SB-RIT newsletter!\nYou\'ll receive event updates and tech news.');
    e.target.reset();
});

// Form validation & focus effects
document.querySelectorAll('input[required], textarea[required]').forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4757';
        } else {
            input.style.borderColor = '#00d4ff';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#00d4ff';
    });
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    if (slides.length > 0) updateSlider();
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.about, .events, .team, .contact').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});
