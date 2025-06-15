class ColorShowcase {
    constructor() {
        this.colorManager = null;
        this.currentColorIndex = 0;
        this.isInitialized = false;
        this.animationFrameId = null;
        this.gradientElements = [];
        this.paletteElements = [];

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;

        try {
            this.waitForColorManager();
        } catch (error) {
            console.error('ColorShowcase initialization error:', error);
        }
    }

    waitForColorManager() {
        if (window.colorManager && window.colorManager.accentColors) {
            this.colorManager = window.colorManager;
            this.setupColorShowcase();
            this.setupClientColorInterpolation();
            this.isInitialized = true;
        } else {
            setTimeout(() => this.waitForColorManager(), 100);
        }
    }

    setupColorShowcase() {
        this.generatePalette();
        this.setupKeyboardNavigation();

        /**
         * Set Northern Lights as default theme
         */
        const northernLightsIndex = this.colorManager.accentColors.findIndex(
            color => color.name === "Northern Lights"
        );

        if (northernLightsIndex !== -1) {
            this.selectColor(northernLightsIndex);
        } else {
            this.selectColor(0);
        }
    }

    /**
     * Setup client-style color interpolation animation
     */
    setupClientColorInterpolation() {
        setTimeout(() => {
            this.collectAnimatedElements();
            this.disableConflictingAnimations();
            this.startInterpolationAnimation();
            this.setupGradientInteractions();
        }, 100);
    }

    /**
     * Disable CSS animations that conflict with JavaScript interpolation
     */
    disableConflictingAnimations() {
        const gradientSample = document.getElementById('gradientSample');
        if (gradientSample) {
            gradientSample.style.animation = 'none';
            gradientSample.style.backgroundSize = 'auto';
            console.log('Disabled CSS animation for gradientSample');
        }

        const previewGradient = document.getElementById('previewGradient');
        if (previewGradient) {
            previewGradient.style.animation = 'none';
            previewGradient.style.backgroundSize = 'auto';
            console.log('Disabled CSS animation for previewGradient');
        }
    }

    /**
     * Collect all elements that need animation
     */
    collectAnimatedElements() {
        const gradientSample = document.getElementById('gradientSample');
        const previewGradient = document.getElementById('previewGradient');

        this.gradientElements = [];

        if (gradientSample) {
            this.gradientElements.push(gradientSample);
            console.log('Found gradientSample element');
        } else {
            console.error('gradientSample element not found');
        }

        if (previewGradient) {
            this.gradientElements.push(previewGradient);
            console.log('Found previewGradient element');
        } else {
            console.error('previewGradient element not found');
        }

        this.paletteElements = [...document.querySelectorAll('.palette-color')];

        console.log('Total gradient elements collected:', this.gradientElements.length);
        console.log('Total palette elements collected:', this.paletteElements.length);
    }

    /**
     * Start the continuous interpolation animation
     */
    startInterpolationAnimation() {
        const animate = () => {
            this.updateGradientInterpolation();
            this.updatePaletteInterpolation();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        console.log('Started interpolation animation');
    }

    /**
     * Update gradient interpolation to match the grid's corner interpolation technique
     * Uses the same independent corner color calculation as the palette grid
     */
    updateGradientInterpolation() {
        if (!this.colorManager || this.gradientElements.length === 0) return;

        const currentColor = this.colorManager.accentColors[this.currentColorIndex];
        if (!currentColor) return;

        this.gradientElements.forEach((element, index) => {
            this.applyGridStyleGradient(element, currentColor);
        });
    }

    /**
     * Update palette color interpolation with separate corner interpolation
     */
    updatePaletteInterpolation() {
        if (!this.colorManager || this.paletteElements.length === 0) return;

        this.paletteElements.forEach((element, index) => {
            const colorData = this.colorManager.accentColors[index];
            if (!colorData) return;

            const cornerColors = this.getIndependentCornerColors(colorData);
            const gradientString = this.createCornerGradient(cornerColors);

            element.style.setProperty('--animated-gradient', gradientString);
        });
    }

    /**
     * Apply the same grid-style gradient technique to gradient samples
     * This ensures the gradient card matches the interpolation used by the palette grid
     *
     * @param {HTMLElement} element - The element to apply the gradient to
     * @param {Object} accentColor - The accent color object containing mainColor and alternativeColor
     */
    applyGridStyleGradient(element, accentColor) {
        const cornerColors = this.getIndependentCornerColors(accentColor);
        const gradientString = this.createCornerGradient(cornerColors);

        element.style.setProperty('background', gradientString, 'important');
        element.style.setProperty('background-image', gradientString, 'important');
    }

    /**
     * Get independent interpolation for each corner
     * This method creates four different interpolated colors, one for each corner
     * Each corner has its own timing offset to create the dynamic animation effect
     *
     * @param {Object} accentColor - The accent color object containing mainColor and alternativeColor
     * @return {Array} Array of four corner colors [topLeft, topRight, bottomLeft, bottomRight]
     */
    getIndependentCornerColors(accentColor) {
        const mainColor = this.parseRgbColor(accentColor.mainColor);
        const altColor = this.parseRgbColor(accentColor.alternativeColor);

        const topLeft = this.interpolateColorsBackAndForth(15, 0, mainColor, altColor);
        const topRight = this.interpolateColorsBackAndForth(15, 90, mainColor, altColor);
        const bottomLeft = this.interpolateColorsBackAndForth(15, 180, mainColor, altColor);
        const bottomRight = this.interpolateColorsBackAndForth(15, 270, mainColor, altColor);

        return [topLeft, topRight, bottomLeft, bottomRight];
    }

    /**
     * Create gradient with independent corner colors using radial gradients
     * This creates a complex multi-layered gradient that mimics the palette grid effect
     *
     * @param {Array} cornerColors - Array of four corner colors
     * @return {String} CSS gradient string combining multiple radial gradients
     */
    createCornerGradient(cornerColors) {
        const colorStrings = cornerColors.map(color =>
            `rgba(${color.r}, ${color.g}, ${color.b}, ${(color.a || 255) / 255})`
        );

        return `
            radial-gradient(circle at 0% 0%, ${colorStrings[0]} 0%, transparent 70%),
            radial-gradient(circle at 100% 0%, ${colorStrings[1]} 0%, transparent 70%),
            radial-gradient(circle at 0% 100%, ${colorStrings[2]} 0%, transparent 70%),
            radial-gradient(circle at 100% 100%, ${colorStrings[3]} 0%, transparent 70%),
            linear-gradient(135deg, ${colorStrings[0]}, ${colorStrings[3]})
        `.replace(/\s+/g, ' ').trim();
    }

    /**
     * Exact replica of Java getClientColorInterpolation method
     * This method is kept for legacy compatibility but gradient samples now use grid-style interpolation
     *
     * @param {Object} accentColor - The accent color object
     * @return {Array} Array of four interpolated colors
     */
    getClientColorInterpolation(accentColor) {
        const mainColor = this.parseRgbColor(accentColor.mainColor);
        const altColor = this.parseRgbColor(accentColor.alternativeColor);

        const color1 = this.interpolateColorsBackAndForth(15, 0, mainColor, altColor);
        const color2 = this.interpolateColorsBackAndForth(15, 90, mainColor, altColor);
        const color3 = this.interpolateColorsBackAndForth(15, 180, mainColor, altColor);
        const color4 = this.interpolateColorsBackAndForth(15, 270, mainColor, altColor);

        return [color1, color2, color3, color4];
    }

    /**
     * Modified interpolateColorsBackAndForth with smoother curve for less harsh transitions
     * Creates a back-and-forth interpolation pattern based on time and index offset
     *
     * @param {number} speed - Animation speed factor
     * @param {number} index - Index offset for timing variation
     * @param {Object} start - Starting color object {r, g, b, a}
     * @param {Object} end - Ending color object {r, g, b, a}
     * @return {Object} Interpolated color object
     */
    interpolateColorsBackAndForth(speed, index, start, end) {
        let angle = Math.floor(((Date.now()) / speed + index) % 360);
        angle = (angle >= 180 ? 360 - angle : angle) * 2;

        let normalizedAngle = angle / 360;
        normalizedAngle = this.smoothStep(normalizedAngle);

        return this.interpolateColorC(start, end, normalizedAngle);
    }

    /**
     * Smooth step function for smoother interpolation curve
     * Creates less harsh transitions by using a sigmoid-like curve
     *
     * @param {number} t - Input value between 0 and 1
     * @return {number} Smoothed value between 0 and 1
     */
    smoothStep(t) {
        const clampedT = Math.min(1, Math.max(0, t));
        return clampedT * clampedT * (3.0 - 2.0 * clampedT);
    }

    /**
     * Enhanced interpolateColorC method with softer blending
     *
     * @param {Object} color1 - First color object {r, g, b, a}
     * @param {Object} color2 - Second color object {r, g, b, a}
     * @param {number} amount - Interpolation amount between 0 and 1
     * @return {Object} Interpolated color object
     */
    interpolateColorC(color1, color2, amount) {
        amount = Math.min(1, Math.max(0, amount));

        const blendedAmount = this.softBlend(amount);

        const interpolatedColor = {
            r: this.interpolateInt(color1.r, color2.r, blendedAmount),
            g: this.interpolateInt(color1.g, color2.g, blendedAmount),
            b: this.interpolateInt(color1.b, color2.b, blendedAmount),
            a: this.interpolateInt(color1.a || 255, color2.a || 255, blendedAmount)
        };

        return this.applyColorHarmonization(interpolatedColor, color1, color2, amount);
    }

    /**
     * Apply soft blending curve to reduce harsh transitions
     *
     * @param {number} t - Input value between 0 and 1
     * @return {number} Blended value
     */
    softBlend(t) {
        const easeInOut = t * t * (3.0 - 2.0 * t);
        const soften = 0.3;
        return t * (1 - soften) + easeInOut * soften;
    }

    /**
     * Apply color harmonization to reduce sharp contrasts
     *
     * @param {Object} interpolatedColor - The interpolated color
     * @param {Object} color1 - First source color
     * @param {Object} color2 - Second source color
     * @param {number} amount - Interpolation amount
     * @return {Object} Harmonized color object
     */
    applyColorHarmonization(interpolatedColor, color1, color2, amount) {
        const harmonizationStrength = 0.15;

        const midtone = {
            r: (color1.r + color2.r) / 2,
            g: (color1.g + color2.g) / 2,
            b: (color1.b + color2.b) / 2,
            a: (color1.a + color2.a) / 2
        };

        return {
            r: Math.round(interpolatedColor.r * (1 - harmonizationStrength) + midtone.r * harmonizationStrength),
            g: Math.round(interpolatedColor.g * (1 - harmonizationStrength) + midtone.g * harmonizationStrength),
            b: Math.round(interpolatedColor.b * (1 - harmonizationStrength) + midtone.b * harmonizationStrength),
            a: interpolatedColor.a
        };
    }

    /**
     * Exact replica of Java interpolate method
     *
     * @param {number} oldValue - Starting value
     * @param {number} newValue - Ending value
     * @param {number} interpolationValue - Interpolation factor between 0 and 1
     * @return {number} Interpolated value
     */
    interpolate(oldValue, newValue, interpolationValue) {
        return (oldValue + (newValue - oldValue) * interpolationValue);
    }

    /**
     * Exact replica of Java interpolateInt method
     *
     * @param {number} oldValue - Starting integer value
     * @param {number} newValue - Ending integer value
     * @param {number} interpolationValue - Interpolation factor between 0 and 1
     * @return {number} Interpolated integer value
     */
    interpolateInt(oldValue, newValue, interpolationValue) {
        return Math.round(this.interpolate(oldValue, newValue, interpolationValue));
    }

    /**
     * Apply client-style gradient with enhanced blending
     * This method is now used only for legacy support, gradient samples use grid-style interpolation
     *
     * @param {HTMLElement} element - Element to apply gradient to
     * @param {Array} colors - Array of color objects
     */
    applyClientGradient(element, colors) {
        const colorStrings = colors.map(color =>
            `rgba(${color.r}, ${color.g}, ${color.b}, ${(color.a || 255) / 255})`
        );

        const gradientStops = this.createSmoothGradientStops(colorStrings);
        const gradient = `linear-gradient(45deg, ${gradientStops})`;

        element.style.setProperty('background', gradient, 'important');
        element.style.setProperty('background-image', gradient, 'important');
    }

    /**
     * Create smooth gradient stops to reduce harsh transitions
     *
     * @param {Array} colorStrings - Array of color strings
     * @return {String} Gradient stops string
     */
    createSmoothGradientStops(colorStrings) {
        const stops = [];
        const stepSize = 100 / (colorStrings.length + 1);

        colorStrings.forEach((color, index) => {
            const position = stepSize * (index + 1);
            const prevPosition = position - stepSize * 0.5;
            const nextPosition = position + stepSize * 0.5;

            if (index === 0) {
                stops.push(`${color} 0%`);
            }

            stops.push(`${color} ${Math.max(0, prevPosition)}%`);
            stops.push(`${color} ${Math.min(100, nextPosition)}%`);

            if (index === colorStrings.length - 1) {
                stops.push(`${color} 100%`);
            }
        });

        return stops.join(', ');
    }

    /**
     * Parse RGB color string to color object
     *
     * @param {String} rgbString - RGB color string like "rgb(255, 0, 0)"
     * @return {Object} Color object with r, g, b, a properties
     */
    parseRgbColor(rgbString) {
        const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3]),
                a: 255
            };
        }
        return { r: 0, g: 255, b: 136, a: 255 };
    }

    /**
     * Setup interactions for gradient samples
     */
    setupGradientInteractions() {
        const gradientSamples = document.querySelectorAll('.gradient-sample');

        gradientSamples.forEach(sample => {
            sample.addEventListener('click', (e) => {
                if (Utils && Utils.createRipple) {
                    Utils.createRipple(e, sample);
                }
            });
        });
    }

    generatePalette() {
        const paletteGrid = document.getElementById('paletteGrid');
        if (!paletteGrid) {
            console.error('Palette grid container not found');
            return;
        }

        paletteGrid.innerHTML = '';

        this.colorManager.accentColors.forEach((color, index) => {
            const paletteColor = this.createPaletteColor(color, index);
            paletteGrid.appendChild(paletteColor);
        });
    }

    createPaletteColor(color, index) {
        const paletteColor = document.createElement('div');
        paletteColor.className = 'palette-color';
        paletteColor.dataset.colorIndex = index;
        paletteColor.title = color.name;

        paletteColor.style.setProperty('--color-main', color.mainColor);
        paletteColor.style.setProperty('--color-alt', color.alternativeColor);

        paletteColor.addEventListener('click', () => this.selectColor(index));

        return paletteColor;
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.isColorSectionVisible()) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigateColor(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigateColor(1);
            }
        });
    }

    isColorSectionVisible() {
        const section = document.querySelector('#colors');
        if (!section) return false;

        const rect = section.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    navigateColor(direction) {
        const newIndex = direction > 0
            ? (this.currentColorIndex + 1) % this.colorManager.accentColors.length
            : this.currentColorIndex > 0
                ? this.currentColorIndex - 1
                : this.colorManager.accentColors.length - 1;

        this.selectColor(newIndex);
        this.scrollToActiveColor();
    }

    /**
     * Add this method to your existing ColorShowcase class
     * Update enhanced particle colors when accent color changes
     *
     * @param {Object} color - The selected accent color
     */
    updateEnhancedParticleColors(color) {
        if (window.colorParticlesEnhanced && window.colorParticlesEnhanced.updateParticleColors) {
            window.colorParticlesEnhanced.updateParticleColors(color);
        }
    }

    /**
     * Update your existing selectColor method to include enhanced particle color updates
     * Modify your selectColor method to include this line:
     */
    selectColor(index) {
        this.currentColorIndex = index;
        const color = this.colorManager.accentColors[index];

        this.updateActivePaletteColor(index);
        this.updateColorTheme(color);
        this.updatePreviewElements(color);
        this.updateCurrentSelection(color);
        this.updateBackgroundGlows(color);
        this.updateEnhancedParticleColors(color); // Add this line

        setTimeout(() => {
            this.collectAnimatedElements();
        }, 50);
    }

    updateActivePaletteColor(activeIndex) {
        const paletteColors = document.querySelectorAll('.palette-color');
        paletteColors.forEach((color, index) => {
            color.classList.toggle('active', index === activeIndex);
        });
    }

    updateColorTheme(color) {
        const root = document.documentElement;

        root.style.setProperty('--primary-color', color.mainColor);
        root.style.setProperty('--secondary-color', color.alternativeColor);

        const mainRgb = this.parseRgb(color.mainColor);
        if (mainRgb) {
            const glowColor = `rgba(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b}, 0.4)`;
            root.style.setProperty('--glow-primary', `0 0 20px ${glowColor}`);
        }
    }

    /**
     * Update background glow colors to match selected accent color
     *
     * @param {Object} color - The selected accent color
     */
    updateBackgroundGlows(color) {
        const root = document.documentElement;
        const mainRgb = this.parseRgb(color.mainColor);

        if (mainRgb) {
            const glowColor04 = `rgba(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b}, 0.04)`;
            const glowColor2 = `rgba(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b}, 0.2)`;
            const glowColor15 = `rgba(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b}, 0.15)`;
            const glowColor1 = `rgba(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b}, 0.1)`;
            const glowColor05 = `rgba(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b}, 0.05)`;
            const glowColor3 = `rgba(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b}, 0.3)`;

            const colorsShowcase = document.querySelector('.colors-showcase');
            if (colorsShowcase) {
                colorsShowcase.style.setProperty('--glow-04', glowColor04);
                colorsShowcase.style.setProperty('--glow-2', glowColor2);
                colorsShowcase.style.setProperty('--glow-15', glowColor15);
                colorsShowcase.style.setProperty('--glow-1', glowColor1);
                colorsShowcase.style.setProperty('--glow-05', glowColor05);
                colorsShowcase.style.setProperty('--glow-3', glowColor3);
            }
        }
    }

    /**
     * Update preview elements but keep them static since gradients are animated
     *
     * @param {Object} color - The selected accent color
     */
    updatePreviewElements(color) {
        const primarySample = document.getElementById('primarySample');
        const secondarySample = document.getElementById('secondarySample');

        if (primarySample) {
            primarySample.style.background = color.mainColor;
        }

        if (secondarySample) {
            secondarySample.style.background = color.alternativeColor;
        }
    }

    updateCurrentSelection(color) {
        const selectionName = document.getElementById('selectionName');
        const primaryHex = document.getElementById('primaryHex');
        const secondaryHex = document.getElementById('secondaryHex');

        if (selectionName) {
            selectionName.textContent = color.name;
        }

        if (primaryHex) {
            primaryHex.textContent = this.rgbToHex(color.mainColor);
        }

        if (secondaryHex) {
            secondaryHex.textContent = this.rgbToHex(color.alternativeColor);
        }
    }

    scrollToActiveColor() {
        const activeColor = document.querySelector('.palette-color.active');
        if (activeColor) {
            activeColor.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    parseRgb(rgbString) {
        const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3])
            };
        }
        return null;
    }

    rgbToHex(rgbString) {
        const rgb = this.parseRgb(rgbString);
        if (!rgb) return rgbString;

        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
    }

    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.isInitialized = false;
    }


}

if (typeof window !== 'undefined') {
    window.colorShowcase = new ColorShowcase();
}