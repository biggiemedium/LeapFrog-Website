class ColorManager {
    constructor() {
        this.accentColors = [
            {name: "Froggy", mainColor: "rgb(179, 248, 129)", alternativeColor: "rgb(91, 225, 115)"},
            {name: "Tenacity", mainColor: "rgb(39, 179, 206)", alternativeColor: "rgb(236, 133, 209)"},
            {name: "Opal", mainColor: "rgb(39, 179, 206)", alternativeColor: "rgb(219, 219, 229)"},
            {name: "Sunset", mainColor: "rgb(253, 145, 21)", alternativeColor: "rgb(245, 106, 230)"},
            {name: "Pink", mainColor: "rgb(226, 0, 70)", alternativeColor: "rgb(255, 166, 200)"},
            {name: "Titanium", mainColor: "rgb(133, 147, 152)", alternativeColor: "rgb(40, 48, 72)"},
            {name: "Blaster", mainColor: "rgb(255, 172, 94)", alternativeColor: "rgb(199, 121, 208)"},
            {name: "Blossom", mainColor: "rgb(226, 208, 249)", alternativeColor: "rgb(49, 119, 115)"},
            {name: "White", mainColor: "rgb(255, 255, 255)", alternativeColor: "rgb(255, 255, 255)"},
            {name: "Neon Dreams", mainColor: "rgb(255, 0, 153)", alternativeColor: "rgb(73, 50, 255)"},
            {name: "Dark Blue", mainColor: "rgb(61, 79, 143)", alternativeColor: "rgb(1, 19, 63)"},
            {name: "Lime", mainColor: "rgb(18, 255, 247)", alternativeColor: "rgb(179, 255, 171)"},
            {name: "Future", mainColor: "rgb(136, 15, 15)", alternativeColor: "rgb(73, 73, 73)"},
            {name: "Orange Juice", mainColor: "rgb(252, 74, 26)", alternativeColor: "rgb(247, 183, 51)"},
            {name: "Watermelon", mainColor: "rgb(236, 68, 155)", alternativeColor: "rgb(153, 244, 67)"},
            {name: "Amethyst", mainColor: "rgb(144, 99, 205)", alternativeColor: "rgb(98, 67, 140)"},
            {name: "Purple Fire", mainColor: "rgb(104, 71, 141)", alternativeColor: "rgb(177, 162, 202)"},
            {name: "Pastel", mainColor: "rgb(255, 109, 106)", alternativeColor: "rgb(191, 82, 80)"},
            {name: "Tropical Ice", mainColor: "rgb(102, 255, 209)", alternativeColor: "rgb(6, 149, 255)"},
            {name: "Magenta", mainColor: "rgb(213, 63, 119)", alternativeColor: "rgb(157, 68, 110)"},
            {name: "Lavender", mainColor: "rgb(219, 166, 247)", alternativeColor: "rgb(152, 115, 172)"},
            {name: "Spearmint", mainColor: "rgb(97, 194, 162)", alternativeColor: "rgb(65, 130, 108)"},
            {name: "Jade Green", mainColor: "rgb(0, 168, 107)", alternativeColor: "rgb(0, 105, 66)"},
            {name: "ThunderHack", mainColor: "rgb(101, 1, 171)", alternativeColor: "rgb(206, 91, 220)"},
            {name: "Cherry Blossom", mainColor: "rgb(255, 183, 197)", alternativeColor: "rgb(255, 123, 137)"},
            {name: "Midnight", mainColor: "rgb(45, 52, 54)", alternativeColor: "rgb(19, 15, 64)"},
            {name: "Golden Hour", mainColor: "rgb(250, 208, 44)", alternativeColor: "rgb(255, 141, 0)"},
            {name: "Arctic", mainColor: "rgb(214, 234, 248)", alternativeColor: "rgb(155, 193, 228)"},
            {name: "Ruby", mainColor: "rgb(224, 17, 95)", alternativeColor: "rgb(165, 0, 52)"},
            {name: "Deep Sea", mainColor: "rgb(0, 119, 182)", alternativeColor: "rgb(3, 4, 94)"},
            {name: "Cosmic", mainColor: "rgb(71, 23, 246)", alternativeColor: "rgb(179, 18, 246)"},
            {name: "Volcano", mainColor: "rgb(252, 70, 107)", alternativeColor: "rgb(63, 94, 251)"},
            {name: "Northern Lights", mainColor: "rgb(4, 225, 148)", alternativeColor: "rgb(128, 64, 252)"},
            {name: "Cotton Candy", mainColor: "rgb(255, 182, 193)", alternativeColor: "rgb(173, 216, 230)"}
        ];

        this.currentColorIndex = 0;
        this.isInitialized = false;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            setTimeout(() => this.init(), 0);
        }
    }

    init() {
        if (this.isInitialized) return;

        setTimeout(() => {
            try {
                this.initializeColorGrid();
                this.setupKeyboardControls();
                this.updateColorTheme(0);
                this.isInitialized = true;
            } catch (error) {
                console.error('ColorManager initialization error:', error);
            }
        }, 500);
    }

    initializeColorGrid() {
        const colorGrid = document.getElementById('colorGrid');
        if (!colorGrid) {
            console.error('Could not find colorGrid element');
            return;
        }

        colorGrid.innerHTML = '';

        this.accentColors.forEach((color, index) => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';

            const gradientBg = `radial-gradient(circle at 20% 20%, ${color.mainColor} 0%, transparent 60%), 
                               radial-gradient(circle at 80% 20%, ${color.alternativeColor} 0%, transparent 60%), 
                               radial-gradient(circle at 20% 80%, ${color.alternativeColor} 0%, transparent 60%), 
                               radial-gradient(circle at 80% 80%, ${color.mainColor} 0%, transparent 60%), 
                               linear-gradient(135deg, ${color.mainColor}20, ${color.alternativeColor}20)`;

            colorOption.style.setProperty('--gradient-bg', gradientBg);
            colorOption.style.setProperty('background', gradientBg);

            const colorName = document.createElement('div');
            colorName.className = 'color-name';
            colorName.textContent = color.name;

            colorOption.appendChild(colorName);

            if (index === 0) {
                colorOption.classList.add('active');
            }

            colorOption.addEventListener('click', () => this.selectColor(index));
            colorGrid.appendChild(colorOption);
        });
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            const section = document.querySelector('#colors');
            if (!section) return;

            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    if (e.key === 'ArrowLeft') {
                        this.currentColorIndex = this.currentColorIndex > 0 ?
                            this.currentColorIndex - 1 : this.accentColors.length - 1;
                    } else {
                        this.currentColorIndex = (this.currentColorIndex + 1) % this.accentColors.length;
                    }
                    this.selectColor(this.currentColorIndex);
                    this.scrollToActiveColor();
                }
            }
        });
    }

    selectColor(index) {
        this.currentColorIndex = index;
        this.updateColorTheme(index);
        this.updateActiveColorBox(index);
    }

    updateActiveColorBox(activeIndex) {
        const colorBoxes = document.querySelectorAll('.color-option');
        colorBoxes.forEach((box, index) => {
            box.classList.toggle('active', index === activeIndex);
        });
    }

    scrollToActiveColor() {
        const activeBox = document.querySelector('.color-option.active');
        if (activeBox) {
            activeBox.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    updateColorTheme(colorIndex) {
        const color = this.accentColors[colorIndex];
        const root = document.documentElement;

        root.style.setProperty('--accent-main', color.mainColor);
        root.style.setProperty('--accent-alt', color.alternativeColor);

        const rgbMatch = color.mainColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            const glowColor = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, 0.3)`;
            root.style.setProperty('--accent-glow', glowColor);
        }
    }

    destroy() {
        this.isInitialized = false;
    }
}

if (typeof window !== 'undefined') {
    window.colorManager = new ColorManager();
}