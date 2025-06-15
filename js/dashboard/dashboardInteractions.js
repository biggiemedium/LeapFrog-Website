/**
 * Dashboard Interactions
 * Handles animations and interactions for the dashboard UI
 * @author biggiemedium
 * @updated 2025-05-24 18:47:14
 */
class DashboardInteractions {
    constructor() {
        this.hasInitialized = false;
        this.mobileBreakpoint = 968;
        this.currentUser = 'biggiemedium';
        this.currentTime = new Date('2025-05-24T18:47:14Z');

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    /**
     * Initialize dashboard interactions
     */
    init() {
        if (this.hasInitialized) return;

        try {
            this.setupMobileInteractions();
            this.setupDropdownMenus();
            this.setupCardAnimations();
            this.setupToastInteractions();
            this.updateTimestamps();
            this.hasInitialized = true;
        } catch (error) {
            console.error('Dashboard interactions initialization error:', error);
        }
    }

    /**
     * Setup mobile menu interactions
     */
    setupMobileInteractions() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const dashboardSidebar = document.getElementById('dashboardSidebar');
        const mobileOverlay = document.getElementById('mobileOverlay');

        if (mobileMenuToggle && dashboardSidebar && mobileOverlay) {
            mobileMenuToggle.addEventListener('click', () => {
                dashboardSidebar.classList.toggle('active');
                mobileOverlay.classList.toggle('active');
                document.body.classList.toggle('sidebar-open');
            });

            mobileOverlay.addEventListener('click', () => {
                dashboardSidebar.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            });
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth >= this.mobileBreakpoint) {
                if (dashboardSidebar) dashboardSidebar.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    }

    /**
     * Setup dropdown menu interactions
     */
    setupDropdownMenus() {
        const userMenu = document.querySelector('.user-menu');
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        if (userMenu && dropdownToggle && dropdownMenu) {
            userMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                dropdownMenu.classList.remove('show');
            });
        }

        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                if (window.innerWidth < this.mobileBreakpoint) {
                    const dashboardSidebar = document.getElementById('dashboardSidebar');
                    const mobileOverlay = document.getElementById('mobileOverlay');

                    if (dashboardSidebar) dashboardSidebar.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    document.body.classList.remove('sidebar-open');
                }
            });
        });
    }

    /**
     * Setup card animations
     */
    setupCardAnimations() {
        const statCards = document.querySelectorAll('.stat-card');

        statCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';

            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 80));
        });

        const quickDownloadBtn = document.getElementById('quickDownloadBtn');
        if (quickDownloadBtn) {
            quickDownloadBtn.addEventListener('click', () => {
                this.showToast('Download Started', 'Leapfrog client download has begun', 'success');

                setTimeout(() => {
                    this.showToast('Download Complete', 'Client ready for installation', 'success');
                }, 3000);
            });
        }
    }

    /**
     * Update timestamps throughout the dashboard
     */
    updateTimestamps() {
        const timestampElements = document.querySelectorAll('.timestamp');
        const formattedTime = this.formatDateTime(this.currentTime);

        timestampElements.forEach(element => {
            element.textContent = formattedTime;
        });
    }

    /**
     * Format date and time in YYYY-MM-DD HH:MM:SS format
     * @param {Date} date - Date object to format
     * @return {string} Formatted date string
     */
    formatDateTime(date) {
        return date.toISOString().replace('T', ' ').substring(0, 19);
    }

    /**
     * Setup toast notification interactions
     */
    setupToastInteractions() {
        const toastClose = document.getElementById('toastClose');
        const toast = document.getElementById('dashboardToast');

        if (toastClose && toast) {
            toastClose.addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 300);
            });
        }
    }

    /**
     * Show toast notification
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     * @param {string} type - Toast type (success, error, info)
     */
    showToast(title, message, type = 'success') {
        const toast = document.getElementById('dashboardToast');
        const toastTitle = document.getElementById('toastTitle');
        const toastText = document.getElementById('toastText');
        const toastIcon = document.querySelector('.toast-icon');

        if (!toast || !toastTitle || !toastText || !toastIcon) return;

        toastTitle.textContent = title;
        toastText.textContent = message;

        if (type === 'success') {
            toastIcon.style.color = 'var(--primary-color)';
        } else if (type === 'error') {
            toastIcon.style.color = 'var(--accent-color)';
        }

        toast.style.display = 'block';
        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.style.display = 'none';
            }, 300);
        }, 4000);
    }
}

if (typeof window !== 'undefined') {
    window.dashboardInteractions = new DashboardInteractions();
}