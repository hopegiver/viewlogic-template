export default {
    data() {
        // 초기 렌더링 시점부터 경로에 맞는 아코디언을 열기
        const path = window.location.hash.substring(1);
        let initialOpenAccordions = [];

        if (path.startsWith('/media')) {
            initialOpenAccordions = ['media'];
        } else if (path.startsWith('/distribution')) {
            initialOpenAccordions = ['distribution'];
        } else if (path.startsWith('/production')) {
            initialOpenAccordions = ['production'];
        } else if (path.startsWith('/analytics')) {
            initialOpenAccordions = ['analytics'];
        } else if (path.startsWith('/monetization')) {
            initialOpenAccordions = ['monetization'];
        } else if (path.startsWith('/settings')) {
            initialOpenAccordions = ['settings'];
        } else if (path.startsWith('/users')) {
            initialOpenAccordions = ['users'];
        } else if (path.startsWith('/system')) {
            initialOpenAccordions = ['system'];
        }

        return {
            appName: 'VideoPack OVP',
            sidebarIconMode: false,
            sidebarVisible: true,
            isMobile: false,
            openAccordions: initialOpenAccordions,
            searchQuery: '',
            notificationCount: 2,
            userName: '관리자',
            userRole: 'Administrator',
            userInitial: '관',
            showUserMenu: false
        };
    },
    mounted() {
        // 화면 크기에 따라 사이드바 모드 설정
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize);

        // 라우트 변경 시 아코디언 자동 업데이트
        window.addEventListener('hashchange', this.openCurrentAccordion);

        // 외부 클릭 시 메뉴 닫기
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkScreenSize);
        window.removeEventListener('hashchange', this.openCurrentAccordion);
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        checkScreenSize() {
            this.isMobile = window.innerWidth < 768;
        },
        toggleSidebar() {
            this.sidebarVisible = !this.sidebarVisible;
        },
        closeSidebar() {
            if (this.isMobile) {
                this.sidebarVisible = false;
            }
        },
        toggleAccordion(name) {
            const index = this.openAccordions.indexOf(name);
            if (index > -1) {
                this.openAccordions.splice(index, 1);
            } else {
                this.openAccordions = [name];
            }
        },
        isAccordionOpen(name) {
            return this.openAccordions.includes(name);
        },
        openCurrentAccordion() {
            const path = window.location.hash.substring(1);

            if (path.startsWith('/media')) {
                this.openAccordions = ['media'];
            } else if (path.startsWith('/distribution')) {
                this.openAccordions = ['distribution'];
            } else if (path.startsWith('/production')) {
                this.openAccordions = ['production'];
            } else if (path.startsWith('/analytics')) {
                this.openAccordions = ['analytics'];
            } else if (path.startsWith('/monetization')) {
                this.openAccordions = ['monetization'];
            } else if (path.startsWith('/settings')) {
                this.openAccordions = ['settings'];
            } else if (path.startsWith('/users')) {
                this.openAccordions = ['users'];
            } else if (path.startsWith('/system')) {
                this.openAccordions = ['system'];
            }
        },
        isActive(path) {
            const currentPath = window.location.hash.substring(1);
            return currentPath === path;
        },
        handleSearch() {
            if (this.searchQuery.trim()) {
                this.navigateTo('/media/library', { search: this.searchQuery });
            }
        },
        toggleNotifications() {
            console.log('알림 토글');
            // TODO: 알림 패널 표시/숨기기
        },
        goToUpload() {
            this.navigateTo('/media/upload');
        },
        toggleUserMenu(event) {
            event.stopPropagation();
            this.showUserMenu = !this.showUserMenu;
        },
        handleClickOutside(event) {
            const userMenuElement = event.target.closest('.user-menu');
            if (!userMenuElement && this.showUserMenu) {
                this.showUserMenu = false;
            }
        },
        goToAccount() {
            this.showUserMenu = false;
            this.navigateTo('/settings/account');
        },
        goToAPISettings() {
            this.showUserMenu = false;
            this.navigateTo('/settings/api');
        },
        handleLogout() {
            this.showUserMenu = false;
            if (confirm('로그아웃 하시겠습니까?')) {
                window.sessionStorage.clear();
                window.localStorage.removeItem('auth_token');
                this.navigateTo('/login');
            }
        }
    }
};
