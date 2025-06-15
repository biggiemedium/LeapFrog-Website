/**
 * Main application entry point
 * Initializes all components and manages application state
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Initialize all application components
     */
    const navigation = new Navigation();
    const animationManager = new AnimationManager();
    const colorManager = new ColorManager();
    const interactionManager = new InteractionManager();

    console.log('Leapfrog website with enhanced modular architecture loaded successfully!');
});