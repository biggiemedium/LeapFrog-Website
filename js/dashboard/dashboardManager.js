/**
 * Dashboard Manager
 * Handles dashboard functionality, data fetching, and state management
 * Updated with current user login and timestamp: 2025-05-24 18:15:23
 */
class DashboardManager {
    constructor() {
        this.userData = null;
        this.systemData = null;
        this.isInitialized = false;
        this.updateInterval = null;
        this.currentUser = 'biggiemedium';
        this.currentTime = new Date('2025-05-24T18:15:23Z');

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    /**
     * Initialize the dashboard manager
     */
    init() {
        if (this.isInitialized) return;

        try {
            this.setupMockData();
            this.loadUserData();
            this.loadSystemData();
            this.setupPeriodicUpdates();
            this.setupEventListeners();
            this.hideLoadingScreen();
            this.isInitialized = true;
        } catch (error) {
            console.error('DashboardManager initialization error:', error);
        }
    }

    /**
     * Setup mock data for demonstration based on current context
     */
    setupMockData() {
        this.userData = {
            username: this.currentUser,
            plan: 'Premium',
            planExpiry: null,
            joinDate: '2025-01-15',
            avatar: this.currentUser.charAt(0).toUpperCase(),
            isOnline: true,
            lastLogin: this.currentTime.toISOString()
        };

        this.systemData = {
            uptime: 99.9,
            latestVersion: 'v2.1.4',
            systemStatus: 'operational',
            serverStatus: 'online',
            announcementCount: 3,
            lastUpdate: this.currentTime.toISOString()
        };
    }

    /**
     * Load user-specific data and update interface
     */
    loadUserData() {
        this.updateUserInfo();
        this.updateUserStatus();
        this.updateWelcomeMessage();
    }

    /**
     * Load system and server data
     */
    loadSystemData() {
        this.updateSystemStats();
        this.updateSystemStatus();
    }

    /**
     * Update user information throughout the interface
     */
    updateUserInfo() {
        const usernameElements = document.querySelectorAll('.username');
        const userPlanElements = document.querySelectorAll('.user-plan');
        const userInitialElements = document.querySelectorAll('.user-initial');

        usernameElements.forEach(el => {
            if (el) el.textContent = this.userData.username;
        });

        userPlanElements.forEach(el => {
            if (el) el.textContent = this.userData.plan;
        });

        userInitialElements.forEach(el => {
            if (el) el.textContent = this.userData.avatar;
        });
    }

    /**
     * Update welcome message with personalized greeting
     */
    updateWelcomeMessage() {
        const headerTitleElement = document.querySelector('.header-title h1');
        if (headerTitleElement) {
            const timeOfDay = this.getTimeOfDayGreeting();
            headerTitleElement.textContent = `${timeOfDay}, ${this.userData.username}`;
        }
    }

    /**
     * Get appropriate greeting based on current time
     */
    getTimeOfDayGreeting() {
        const hour = this.currentTime.getUTCHours();

        if (hour >= 5 && hour < 12) {
            return 'Good morning';
        } else if (hour >= 12 && hour < 17) {
            return 'Good afternoon';
        } else if (hour >= 17 && hour < 22) {
            return 'Good evening';
        } else {
            return 'Welcome back';
        }
    }

    /**
     * Update user online status indicators
     */
    updateUserStatus() {
        const statusIndicators = document.querySelectorAll('.status-indicator');
        const statusTexts = document.querySelectorAll('.status-text');

        statusIndicators.forEach(indicator => {
            if (this.userData.isOnline) {
                indicator.classList.add('online');
            } else {
                indicator.classList.remove('online');
            }
        });

        statusTexts.forEach(text => {
            if (text) {
                text.textContent = this.userData.isOnline ? 'Online' : 'Offline';
            }
        });
    }

    /**
     * Update system statistics in stat cards
     */
    updateSystemStats() {
        const uptimeElement = document.querySelector('.stat-card .stat-value');
        const versionElements = document.querySelectorAll('.stat-value');

        if (uptimeElement) {
            uptimeElement.textContent = `${this.systemData.uptime}%`;
        }

        if (versionElements.length > 1) {
            versionElements[1].textContent = this.systemData.latestVersion;
        }

        if (versionElements.length > 2) {
            versionElements[2].textContent = this.userData.plan;
        }
    }

    /**
     * Update system status indicators
     */
    updateSystemStatus() {
        const statusIndicators = document.querySelectorAll('.stat-status');
        const systemStatusElement = document.querySelector('.status-value');

        statusIndicators.forEach(indicator => {
            if (this.systemData.systemStatus === 'operational') {
                indicator.classList.add('online');
            } else {
                indicator.classList.remove('online');
            }
        });

        if (systemStatusElement) {
            systemStatusElement.textContent = this.systemData.systemStatus === 'operational'
                ? 'All Systems Operational'
                : 'System Issues Detected';
        }
    }

    /**
     * Setup periodic updates for real-time data
     */
    setupPeriodicUpdates() {
        this.updateInterval = setInterval(() => {
            this.currentTime = new Date(this.currentTime.getTime() + 60000);
            this.updateLastSeen();
            this.checkForUpdates();
        }, 60000);
    }

    /**
     * Update last seen timestamp
     */
    updateLastSeen() {
        this.userData.lastLogin = this.currentTime.toISOString();
    }

    /**
     * Check for system updates and notifications
     */
    checkForUpdates() {
        const random = Math.random();
        if (random < 0.1) {
            this.showNotification('System Update', 'New client version available for download');
        }
    }

    /**
     * Setup event listeners for dashboard interactions
     */
    setupEventListeners() {
        const quickDownloadBtn = document.getElementById('quickDownloadBtn');
        if (quickDownloadBtn) {
            quickDownloadBtn.addEventListener('click', () => {
                this.handleQuickDownload();
            });
        }

        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    /**
     * Handle quick download button click
     */
    handleQuickDownload() {
        this.showNotification('Download Started', 'Leapfrog client download has begun');

        setTimeout(() => {
            this.showNotification('Download Complete', 'Client ready for installation');
        }, 3000);
    }

    /**
     * Show toast notification
     */
    showNotification(title, message, type = 'success') {
        const toast = document.getElementById('dashboardToast');
        const toastTitle = document.getElementById('toastTitle');
        const toastText = document.getElementById('toastText');

        if (!toast || !toastTitle || !toastText) return;

        toastTitle.textContent = title;
        toastText.textContent = message;

        toast.style.display = 'block';
        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.style.display = 'none';
            }, 300);
        }, 4000);
    }

    /**
     * Hide loading screen when dashboard is ready
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('dashboardLoading');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    /**
     * Get current user data
     */
    getUserData() {
        return { ...this.userData };
    }

    /**
     * Get current system data
     */
    getSystemData() {
        return { ...this.systemData };
    }

    /**
     * Get formatted current time
     */
    getCurrentTime() {
        return this.currentTime.toISOString().replace('T', ' ').substring(0, 19);
    }

    /**
     * Cleanup resources when dashboard is destroyed
     */
    cleanup() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.isInitialized = false;
    }

    /**
     * Destroy dashboard manager
     */
    destroy() {
        this.cleanup();
    }
}

/**
 * Initialize dashboard manager globally
 */
if (typeof window !== 'undefined') {
    window.dashboardManager = new DashboardManager();
}