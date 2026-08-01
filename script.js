/**
 * script.js - Portfolio Interactive Elements
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle (Dark/Light Mode) ---
   const themeToggle = document.getElementById('theme-toggle');

if (!themeToggle) {
    console.error("Theme button not found");
    return;
}

const body = document.body;
const themeIcon = themeToggle.querySelector('i');
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.className = savedTheme;
updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {console.log("Theme button clicked");
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon('light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark-mode') {
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // --- 3. Sticky Header & Active Link Highlighting ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- 4. Typing Effect ---
    const typeWriterElement = document.getElementById('typewriter');
    const textToType = "CHINTU PANDA";
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typeWriterElement.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 150);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    // --- 5. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealFunction = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealFunction);
    // Trigger once on load
    revealFunction();

    // --- 6. Form Submission Animation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalContent = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';
            btn.style.opacity = '0.8';
            
            // Simulate sending (replace with actual form submission logic)
            setTimeout(() => {
                btn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
                btn.style.background = '#10b981'; // success color
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // --- 7. Background Particles Effect for Hero Section ---
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.querySelector('.hero').offsetHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x > width || this.x < 0) this.speedX *= -1;
                if (this.y > height || this.y < 0) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`; // Accent blue
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createParticles() {
            particles = [];
            const numberOfParticles = Math.floor(width / 15);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Draw lines between close particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance/1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        // Initialize and handle resize
        initCanvas();
        createParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            initCanvas();
            createParticles();
        });
    }
});
window.addEventListener("load", function () {

    setTimeout(function () {

        document
        .getElementById("splash-screen")
        .classList.add("fade-out");

    },3000);

});