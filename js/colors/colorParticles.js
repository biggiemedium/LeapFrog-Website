/**
 * Enhanced Color Particles Manager
 * Creates unique tech-inspired particle effects including hexagons, data streams,
 * circuit patterns, energy waves, digital rain, and holographic triangles
 */
class ColorParticlesEnhanced {
    constructor() {
        this.particleContainer = null;
        this.particles = [];
        this.isInitialized = false;
        this.animationFrameId = null;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    /**
     * Initialize the enhanced particle system when DOM is ready
     */
    init() {
        if (this.isInitialized) return;

        try {
            this.waitForColorShowcase();
        } catch (error) {
            console.error('ColorParticlesEnhanced initialization error:', error);
        }
    }

    /**
     * Wait for color showcase section to be available before creating particles
     */
    waitForColorShowcase() {
        const colorShowcase = document.querySelector('.colors-showcase');
        if (colorShowcase) {
            this.setupParticleContainer();
            this.createEnhancedParticles();
            this.isInitialized = true;
        } else {
            setTimeout(() => this.waitForColorShowcase(), 100);
        }
    }

    /**
     * Create and setup the particle container element
     */
    setupParticleContainer() {
        const colorShowcase = document.querySelector('.colors-showcase');
        if (!colorShowcase) return;

        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'floating-particles';
        this.particleContainer.style.position = 'absolute';
        this.particleContainer.style.top = '0';
        this.particleContainer.style.left = '0';
        this.particleContainer.style.width = '100%';
        this.particleContainer.style.height = '100%';
        this.particleContainer.style.pointerEvents = 'none';
        this.particleContainer.style.zIndex = '0';

        colorShowcase.appendChild(this.particleContainer);
    }

    /**
     * Create all enhanced particle elements with varied types and properties
     */
    createEnhancedParticles() {
        if (!this.particleContainer) return;

        this.createHexagonParticles();
        this.createDataStreamParticles();
        this.createCircuitParticles();
        this.createEnergyWaveParticles();
        this.createDigitalRainParticles();
        this.createTriangleParticles();
    }

    /**
     * Create hexagonal grid pattern particles for tech aesthetic
     */
    createHexagonParticles() {
        const hexCount = 4;

        for (let i = 0; i < hexCount; i++) {
            const hex = document.createElement('div');
            hex.className = 'particle-hex';

            this.particleContainer.appendChild(hex);
            this.particles.push({
                element: hex,
                type: 'hex',
                index: i
            });
        }
    }

    /**
     * Create data stream particles - vertical flowing lines
     */
    createDataStreamParticles() {
        const streamCount = 4;

        for (let i = 0; i < streamCount; i++) {
            const stream = document.createElement('div');
            stream.className = 'particle-stream';

            this.particleContainer.appendChild(stream);
            this.particles.push({
                element: stream,
                type: 'stream',
                index: i + 4
            });
        }
    }

    /**
     * Create circuit pattern particles with connecting lines
     */
    createCircuitParticles() {
        const circuitCount = 3;

        for (let i = 0; i < circuitCount; i++) {
            const circuit = document.createElement('div');
            circuit.className = 'particle-circuit';

            this.particleContainer.appendChild(circuit);
            this.particles.push({
                element: circuit,
                type: 'circuit',
                index: i + 8
            });
        }
    }

    /**
     * Create energy wave particles - expanding ripple effects
     */
    createEnergyWaveParticles() {
        const waveCount = 3;

        for (let i = 0; i < waveCount; i++) {
            const wave = document.createElement('div');
            wave.className = 'particle-wave';

            this.particleContainer.appendChild(wave);
            this.particles.push({
                element: wave,
                type: 'wave',
                index: i + 11
            });
        }
    }

    /**
     * Create digital rain particles - matrix-style falling elements
     */
    createDigitalRainParticles() {
        const rainCount = 4;

        for (let i = 0; i < rainCount; i++) {
            const rain = document.createElement('div');
            rain.className = 'particle-rain';

            this.particleContainer.appendChild(rain);
            this.particles.push({
                element: rain,
                type: 'rain',
                index: i + 14
            });
        }
    }

    /**
     * Create holographic triangle particles
     */
    createTriangleParticles() {
        const triangleCount = 3;

        for (let i = 0; i < triangleCount; i++) {
            const triangle = document.createElement('div');
            triangle.className = 'particle-triangle';

            this.particleContainer.appendChild(triangle);
            this.particles.push({
                element: triangle,
                type: 'triangle',
                index: i + 18
            });
        }
    }

    /**
     * Update particle colors to match the current accent color theme
     * Enhanced to handle all new particle types
     *
     * @param {Object} accentColor - The current accent color object with mainColor and alternativeColor
     */
    updateParticleColors(accentColor) {
        if (!accentColor || !this.particles.length) return;

        this.particles.forEach(particle => {
            this.applyColorToEnhancedParticle(particle, accentColor);
        });
    }

    /**
     * Apply the current accent colors to enhanced particle types
     *
     * @param {Object} particle - The particle object containing element and type
     * @param {Object} accentColor - The accent color object
     */
    applyColorToEnhancedParticle(particle, accentColor) {
        const { element, type } = particle;
        const mainGlow = this.createGlowColor(accentColor.mainColor, 0.2);
        const altGlow = this.createGlowColor(accentColor.alternativeColor, 0.15);

        switch (type) {
            case 'hex':
                element.style.borderColor = mainGlow;
                element.style.boxShadow = `0 0 10px ${mainGlow}`;
                break;

            case 'stream':
                element.style.background = `linear-gradient(to bottom, transparent, ${mainGlow}, transparent)`;
                break;

            case 'circuit':
                element.style.borderColor = altGlow;
                element.style.boxShadow = `0 0 15px ${mainGlow}`;

                const beforeElement = element.querySelector('::before');
                const afterElement = element.querySelector('::after');
                if (beforeElement) beforeElement.style.background = mainGlow;
                if (afterElement) afterElement.style.background = mainGlow;
                break;

            case 'wave':
                element.style.borderColor = mainGlow;
                element.style.boxShadow = `0 0 20px ${mainGlow}`;
                break;

            case 'rain':
                element.style.background = `linear-gradient(to bottom, ${this.createGlowColor(accentColor.mainColor, 0.3)}, transparent)`;
                break;

            case 'triangle':
                element.style.borderBottomColor = altGlow;
                element.style.filter = `drop-shadow(0 0 8px ${mainGlow})`;
                break;
        }
    }

    /**
     * Convert RGB color to rgba with specified opacity for glow effects
     *
     * @param {String} rgbColor - RGB color string like "rgb(255, 0, 0)"
     * @param {Number} opacity - Opacity value between 0 and 1
     * @return {String} RGBA color string
     */
    createGlowColor(rgbColor, opacity) {
        const match = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
        return `rgba(0, 255, 136, ${opacity})`;
    }

    /**
     * Get random position within safe bounds for particle placement
     *
     * @param {String} type - Particle type for specific positioning rules
     * @return {Object} Position object with top/left/right/bottom properties
     */
    getRandomPosition(type) {
        const positions = {
            hex: [
                { top: '10%', left: '15%' },
                { top: '60%', right: '20%' },
                { bottom: '25%', left: '70%' },
                { top: '35%', left: '5%' }
            ],
            stream: [
                { left: '25%' },
                { left: '55%' },
                { right: '30%' },
                { right: '10%' }
            ],
            circuit: [
                { top: '20%', right: '25%' },
                { bottom: '30%', left: '40%' },
                { top: '70%', right: '15%' }
            ],
            wave: [
                { top: '15%', left: '60%' },
                { bottom: '40%', left: '20%' },
                { top: '50%', right: '35%' }
            ],
            rain: [
                { left: '35%' },
                { left: '65%' },
                { right: '25%' },
                { left: '80%' }
            ],
            triangle: [
                { top: '25%', left: '45%' },
                { bottom: '35%', right: '40%' },
                { top: '65%', left: '10%' }
            ]
        };

        return positions[type] || { top: '50%', left: '50%' };
    }

    /**
     * Destroy the enhanced particle system and clean up resources
     */
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        if (this.particleContainer && this.particleContainer.parentNode) {
            this.particleContainer.parentNode.removeChild(this.particleContainer);
        }

        this.particles = [];
        this.isInitialized = false;
    }
}

/**
 * Initialize the enhanced particle system and make it globally available
 */
if (typeof window !== 'undefined') {
    window.colorParticlesEnhanced = new ColorParticlesEnhanced();
}