// Dark/Light Theme Manager
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.root = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        // Apply initial theme
        this.setTheme(this.currentTheme);
        
        // Listen for toggle clicks
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(this.currentTheme);
                
                // Optional: Trigger a view transition if supported
                if (document.startViewTransition) {
                    document.startViewTransition(() => this.updateDOM());
                } else {
                    this.updateDOM();
                }
            });
        }
    }
    
    setTheme(theme) {
        localStorage.setItem('theme', theme);
        this.root.setAttribute('data-theme', theme);
    }
    
    updateDOM() {
        // Just used for the view transition fallback
    }
}

// Initialize immediately to prevent flash of wrong theme
new ThemeManager();
