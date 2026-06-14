// Custom Cursor Logic
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.follower = document.getElementById('cursor-follower');
        
        // If not on mobile device
        if (window.matchMedia('(pointer: fine)').matches && this.cursor && this.follower) {
            this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            this.mouse = { x: this.pos.x, y: this.pos.y };
            
            this.init();
        }
    }
    
    init() {
        // Track mouse
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Add hover effects to interactable elements
        const interactables = document.querySelectorAll('a, button, input, .magnetic-btn');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
        
        // Animation loop
        this.render();
    }
    
    render() {
        // Move the small cursor immediately
        this.cursor.style.left = `${this.mouse.x}px`;
        this.cursor.style.top = `${this.mouse.y}px`;
        
        // Lerp the follower for smooth lag
        this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
        this.pos.y += (this.mouse.y - this.pos.y) * 0.15;
        
        this.follower.style.left = `${this.pos.x}px`;
        this.follower.style.top = `${this.pos.y}px`;
        
        requestAnimationFrame(() => this.render());
    }
}
