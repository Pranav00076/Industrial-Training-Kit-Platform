// Interactions: Magnetic Buttons, Tilt Cards, Scroll Reveal, Testimonials Carousel

class Interactions {
    constructor() {
        this.initMagneticButtons();
        this.initTiltCards();
        this.initScrollReveal();
        this.initTestimonials();
        this.initDashboardUnlock();
    }
    
    initMagneticButtons() {
        const magneticElements = document.querySelectorAll('.magnetic-btn');
        
        magneticElements.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Max movement 20px
                const moveX = (x / rect.width) * 20;
                const moveY = (y / rect.height) * 20;
                
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px)`;
                // Small transition for smooth return
                btn.style.transition = 'transform 0.3s ease-out';
                setTimeout(() => {
                    btn.style.transition = '';
                }, 300);
            });
        });
    }
    
    initTiltCards() {
        const cards = document.querySelectorAll('.tilt-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation based on mouse position relative to center
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'none';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.5s ease-out';
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease-out';
            });
        });
    }
    
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }
    
    initTestimonials() {
        const testimonials = [
            {
                text: "The virtual twins of the training kits are incredibly accurate. It felt exactly like configuring real PLCs on the factory floor.",
                author: "Sarah J.",
                role: "Automation Engineer"
            },
            {
                text: "Module 3 completely changed how I approach database design for high-frequency telemetry. Exceptional curriculum.",
                author: "David M.",
                role: "IoT Systems Architect"
            },
            {
                text: "I went from having no web dev experience to building full-stack HMIs that our enterprise clients actually love using.",
                author: "Elena R.",
                role: "Frontend Developer"
            }
        ];
        
        const track = document.getElementById('testimonial-track');
        const dotsContainer = document.getElementById('carousel-dots');
        if (!track || !dotsContainer) return;
        
        let currentIndex = 0;
        
        // Populate testimonials
        testimonials.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <p class="testimonial-content">"${item.text}"</p>
                <div class="testimonial-author">${item.author}</div>
                <div class="testimonial-role">${item.role}</div>
            `;
            track.appendChild(card);
            
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToTestimonial(index, track, dotsContainer));
            dotsContainer.appendChild(dot);
        });
        
        // Setup buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
                this.goToTestimonial(currentIndex, track, dotsContainer);
            });
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                this.goToTestimonial(currentIndex, track, dotsContainer);
            });
        }
        
        // Auto-play
        setInterval(() => {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            this.goToTestimonial(currentIndex, track, dotsContainer);
        }, 5000);
    }
    
    goToTestimonial(index, track, dotsContainer) {
        track.style.transform = `translateX(-${index * 100}%)`;
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    initDashboardUnlock() {
        // Simulate unlocking a module via intersection observer to show animation
        const unlockItem = document.querySelector('.unlock-animation');
        if (!unlockItem) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        const overlay = unlockItem.querySelector('.lock-overlay');
                        if(overlay) {
                            overlay.style.opacity = '0';
                            setTimeout(() => overlay.remove(), 500);
                            
                            // Simulate achievement badge unlock sync
                            const lockedBadge = document.querySelector('.badge-item.locked');
                            if (lockedBadge) {
                                lockedBadge.classList.remove('locked');
                                lockedBadge.classList.add('active');
                                lockedBadge.title = "AI Guru";
                            }
                        }
                    }, 1500); // Wait 1.5s after seeing it to unlock
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(unlockItem);
    }
}
