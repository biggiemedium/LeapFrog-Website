/**
 * Font utility class matching the client's FontUtil implementation
 */
class FontUtil {
    /**
     * Initialize font management system
     */
    constructor() {
        this.fonts = new Map();
        this.setupFonts();
    }

    /**
     * Setup all font variants
     */
    setupFonts() {
        this.fonts.set('regular16', {
            family: '"SF Pro Display", "SF UI Display", -apple-system, BlinkMacSystemFont, sans-serif',
            size: 16,
            weight: 400
        });

        this.fonts.set('regular14', {
            family: '"SF Pro Display", "SF UI Display", -apple-system, BlinkMacSystemFont, sans-serif',
            size: 14,
            weight: 400
        });

        this.fonts.set('regular18', {
            family: '"SF Pro Display", "SF UI Display", -apple-system, BlinkMacSystemFont, sans-serif',
            size: 18,
            weight: 400
        });
    }

    /**
     * Get font by name
     * @param {string} name - Font name to retrieve
     * @returns {Object} Font configuration
     */
    getFont(name) {
        return this.fonts.get(name) || this.fonts.get('regular16');
    }

    /**
     * Get string width using canvas measurement
     * @param {string} text - Text to measure
     * @param {string} fontName - Font name to use
     * @returns {number} Width of text in pixels
     */
    getStringWidth(text, fontName = 'regular16') {
        const font = this.getFont(fontName);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `${font.weight} ${font.size}px ${font.family}`;
        return ctx.measureText(text).width;
    }

    /**
     * Get font height
     * @param {string} text - Text to measure (unused but kept for API consistency)
     * @param {string} fontName - Font name to use
     * @returns {number} Height of text in pixels
     */
    getFontHeight(text, fontName = 'regular16') {
        const font = this.getFont(fontName);
        return font.size * 1.2;
    }

    /**
     * Get CSS font string
     * @param {string} fontName - Font name to use
     * @returns {string} CSS font string
     */
    getCSSFont(fontName = 'regular16') {
        const font = this.getFont(fontName);
        return `${font.weight} ${font.size}px ${font.family}`;
    }

    /**
     * Get regular 16px font instance
     * @returns {Object} Font configuration
     */
    static get regular16() {
        return FontUtil.getInstance().getFont('regular16');
    }

    /**
     * Get global FontUtil instance
     * @returns {FontUtil} Singleton instance
     */
    static getInstance() {
        if (!FontUtil.instance) {
            FontUtil.instance = new FontUtil();
        }
        return FontUtil.instance;
    }
}

/**
 * Global instance
 */
FontUtil.instance = null;

/**
 * Initialize when DOM is ready
 */
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.fontUtil = FontUtil.getInstance();
    });
}