/**
 * Animation controllers and effects
 */
class AnimationManager {
    constructor() {
        this.init();
    }

    /**
     * Initialize all animations
     */
    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupTypingEffect();
        this.addCustomKeyframes();
    }

    /**
     * Setup scroll-triggered animations using Intersection Observer
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.feature-card, .gallery-item, .community-link');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        this.addAnimationStyles();
    }

    /**
     * Add CSS animation styles
     */
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .feature-card,
            .gallery-item,
            .community-link {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .feature-card.animate-in,
            .gallery-item.animate-in,
            .community-link.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .feature-card:nth-child(even).animate-in {
                transition-delay: 0.1s;
            }

            .feature-card:nth-child(3n).animate-in {
                transition-delay: 0.2s;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Setup parallax effects for floating cubes
     */
    setupParallaxEffects() {
        const floatingCubes = document.querySelectorAll('.floating-cube');

        const handleScroll = Utils.debounce(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;

            floatingCubes.forEach((cube, index) => {
                const speed = (index + 1) * 0.3;
                cube.style.transform = `translateY(${parallax * speed}px)`;
            });
        }, 10);

        window.addEventListener('scroll', handleScroll);
    }

    /**
     * Add typing effect to hero title
     */
    setupTypingEffect() {
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title .glow-text');
            if (heroTitle) {
                const text = heroTitle.textContent;
                heroTitle.textContent = '';

                let i = 0;
                const typeWriter = setInterval(() => {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeWriter);
                    }
                }, 100);
            }
        }, 500);
    }

    /**
     * Add custom keyframes for animations
     */
    addCustomKeyframes() {
        Utils.addKeyframes('ripple', `
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        `);
    }
}