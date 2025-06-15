/**
 * user interaction management and button effects
 */
class InteractionManager {
    constructor() {
        this.init();
    }

    /**
     * Initialize interaction handlers
     */
    init() {
        this.setupButtonEffects();
        this.setupDownloadHandlers();
        this.setupCounterAnimations();
        this.setupAccessibility();
    }

    /**
     * Setup button hover and glow effects
     */
    setupButtonEffects() {
        const glowButtons = document.querySelectorAll('.glow-btn');
        glowButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.6), 0 0 60px rgba(0, 255, 136, 0.3)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
            });
        });
    }

    /**
     * Setup download button handlers
     */
    setupDownloadHandlers() {
        const downloadButtons = document.querySelectorAll('.btn-primary');
        downloadButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.showDownloadModal();
            });
        });
    }

    /**
     * Show download modal placeholder
     */
    showDownloadModal() {
        alert('Download will start shortly!\n\nNote: This is a demo website. In a real implementation, this would trigger the actual download.');
    }

    /**
     * Setup animated counters for statistics
     */
    setupCounterAnimations() {
        const downloadSection = document.querySelector('#download');
        if (downloadSection) {
            const downloadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounters();
                        downloadObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            downloadObserver.observe(downloadSection);
        }
    }

    /**
     * Animate counter numbers
     */
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = counter.textContent;
            const isNumber = target.match(/\d+/);

            if (isNumber) {
                const numericValue = parseInt(isNumber[0]);
                const suffix = target.replace(numericValue.toString(), '');
                let current = 0;
                const increment = numericValue / 100;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = numericValue + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 20);
            }
        });
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        this.trapFocus = (element) => {
            const focusables = element.querySelectorAll(focusableElements);
            const firstFocusable = focusables[0];
            const lastFocusable = focusables[focusables.length - 1];

            element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        };
    }
}