export default {
    name: 'Navigation',

    // 향후 API 연동을 위한 준비
    // dataURL: '/api/navigation/menu',

    template: `
        <nav class="main-nav">
            <div class="nav-container">
                <!-- Site Logo -->
                <div class="nav-brand">
                    <a @click="navigateTo('home')" class="brand-link">
                        <span class="brand-logo">🚀</span>
                        <span class="brand-text">ViewLogic</span>
                    </a>
                </div>

                <!-- Mobile Hamburger Menu Button -->
                <button
                    class="nav-toggle"
                    :class="{ active: mobileMenuOpen }"
                    @click="toggleMobileMenu"
                    aria-label="Toggle navigation menu"
                >
                    <span class="nav-toggle-bar"></span>
                    <span class="nav-toggle-bar"></span>
                    <span class="nav-toggle-bar"></span>
                </button>

                <!-- Mobile Overlay -->
                <div
                    class="nav-overlay"
                    :class="{ active: mobileMenuOpen }"
                    @click="closeMobileMenu"
                    aria-hidden="true"
                ></div>

                <!-- Central Navigation Menu -->
                <div class="nav-menu" :class="{ active: mobileMenuOpen }">
                    <ul class="nav-links">
                        <li v-for="item in menuItems" :key="item.name">
                            <a
                                @click="navigateAndClose(item.name)"
                                :class="{ active: currentRoute === item.name }"
                            >
                                {{ item.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Right Utility Menu (Desktop) -->
                <div class="nav-utils">
                    <!-- Desktop auth buttons can go here -->
                </div>
            </div>
        </nav>
    `,

    data() {
        return {
            mobileMenuOpen: false,

            // 정적 메뉴 (향후 API에서 로드 가능)
            menuItems: [
                { name: 'home', label: 'Home' },
                { name: 'components', label: 'Components' },
                { name: 'contact', label: 'Contact' }
            ]
        };
    },

    computed: {
        currentRoute() {
            // ViewLogic router 인스턴스를 통해 현재 라우트 가져오기
            return router.getCurrentRoute() || 'home';
        }
    },


    mounted() {
        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', this.handleKeydown);

        // 윈도우 리사이즈 시 모바일 메뉴 닫기
        window.addEventListener('resize', this.handleResize);
    },

    unmounted() {
        document.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('resize', this.handleResize);
    },

    methods: {
        navigateTo(route, params = {}) {
            // ViewLogic router 인스턴스를 통해 네비게이션
            router.navigateTo(route, params);
        },

        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;

            // 모바일 메뉴 열릴 때 body 스크롤 방지
            if (this.mobileMenuOpen) {
                document.body.classList.add('nav-menu-open');
            } else {
                document.body.classList.remove('nav-menu-open');
            }
        },

        closeMobileMenu() {
            this.mobileMenuOpen = false;
            document.body.classList.remove('nav-menu-open');
        },

        navigateAndClose(route, params = {}) {
            router.navigateTo(route, params);
            this.closeMobileMenu();
        },

        handleKeydown(event) {
            // ESC 키로 메뉴 닫기
            if (event.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        },

        handleResize() {
            // 데스크톱 사이즈로 변경되면 모바일 메뉴 닫기
            if (window.innerWidth > 768 && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        }
    }
};