/**
 * Utility functions for common operations
 */
const Utils = {
    /**
     * Convert RGB string to RGBA with opacity
     * @param {string} rgb - RGB color string
     * @param {number} opacity - Opacity value (0-1)
     * @returns {string} RGBA color string
     */
    rgbToRgba(rgb, opacity) {
        const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
        return rgb;
    },

    /**
     * Create a ripple effect element
     * @param {Event} e - Click event
     * @param {HTMLElement} element - Target element
     */
    createRipple(e, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s linear';

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    },

    /**
     * Add CSS keyframes to document
     * @param {string} name - Animation name
     * @param {string} keyframes - CSS keyframes
     */
    addKeyframes(name, keyframes) {
        const style = document.createElement('style');
        style.textContent = `@keyframes ${name} { ${keyframes} }`;
        document.head.appendChild(style);
    },

    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Delay in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};