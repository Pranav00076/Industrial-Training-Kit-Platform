// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Custom Cursor if fine pointer
    if (window.matchMedia('(pointer: fine)').matches) {
        new CustomCursor();
    }
    
    // Initialize Particles
    new ParticleEngine();
    
    // Initialize Interactions
    new Interactions();
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // JS Fallback for Scroll Progress Indicator
    // If CSS Scroll-Driven animations are not supported, do it via JS
    if (!CSS.supports('animation-timeline: scroll()')) {
        const progressBar = document.getElementById('scroll-progress');
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const desktopNav = document.querySelector('.desktop-nav');
    
    if (menuToggle && desktopNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            
            // Simple inline styles for mobile menu since we didn't write full CSS for it
            if (menuToggle.classList.contains('active')) {
                desktopNav.style.display = 'flex';
                desktopNav.style.flexDirection = 'column';
                desktopNav.style.position = 'absolute';
                desktopNav.style.top = '100%';
                desktopNav.style.left = '0';
                desktopNav.style.width = '100%';
                desktopNav.style.background = 'var(--bg-glass)';
                desktopNav.style.backdropFilter = 'blur(16px)';
                desktopNav.style.webkitBackdropFilter = 'blur(16px)';
                desktopNav.style.padding = 'var(--spacing-md)';
                desktopNav.style.borderBottom = '1px solid var(--bg-glass-border)';
            } else {
                desktopNav.style.display = '';
                desktopNav.style.flexDirection = '';
                desktopNav.style.position = '';
                desktopNav.style.top = '';
                desktopNav.style.left = '';
                desktopNav.style.width = '';
                desktopNav.style.background = '';
                desktopNav.style.backdropFilter = '';
                desktopNav.style.webkitBackdropFilter = '';
                desktopNav.style.padding = '';
                desktopNav.style.borderBottom = '';
            }
        });
    }

    // Form submission prevent default
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Subscribed!";
            btn.style.background = "var(--color-ethereal-blue)";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                form.reset();
            }, 3000);
        });
    }
});
