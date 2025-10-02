export default {
    name: 'DynamicInclude',
    template: `
        <div class="dynamic-include">
            <div v-if="error">{{ errorMessage }}</div>
            <component v-else-if="dynamicComponent" :is="dynamicComponent" />
        </div>
    `,
    
    props: {
        page: {
            type: String,
            required: true
        }
    },
    
    data() {
        return {
            loading: false,
            error: false,
            errorMessage: '',
            dynamicComponent: null,
            loadingStartTime: null
        };
    },

    computed: {
        loadingDuration() {
            return this.loadingStartTime ? Date.now() - this.loadingStartTime : 0;
        }
    },

    
    async mounted() {
        await this.loadPage();
    },
    
    watch: {
        page: {
            handler() {
                this.$nextTick(() => {
                    this.loadPage();
                });
            },
            immediate: false
        }
    },
    
    methods: {
        async loadPage() {
            if (!this.page) return;

            // 중복 로딩 방지
            if (this.loading) return;

            this.loading = true;
            this.error = false;

            try {
                // $createComponent 함수 사용 가능성 검사
                if (!this.$router.createComponent || typeof this.$router.createComponent !== 'function') {
                    throw new Error('$createComponent function not available');
                }

                // 페이지 이름 유효성 검사
                if (!this.page || typeof this.page !== 'string' || this.page.trim() === '') {
                    throw new Error('Invalid page name provided');
                }

                // 컴포넌트 로드 ($createComponent 사용)
                const component = await this.$router.createComponent(this.page.trim());

                // 개발 모드에서 스타일 적용
                if (component._style) {
                    this.applyStyle(component._style, `dynamic-${this.page}`);
                }

                this.dynamicComponent = Vue.markRaw(component);

            } catch (err) {
                // 간단한 에러 로깅 (라우터 비중단)
                console.warn(`DynamicInclude: Failed to load '${this.page}':`, err.message);

                // 에러 상태 설정
                this.error = true;
                this.errorMessage = err.message || `'${this.page}' 페이지를 로드할 수 없습니다`;
                this.dynamicComponent = null;
            } finally {
                this.loading = false;
            }
        },
        
        applyStyle(css, routeName) {
            try {
                // Remove existing styles
                const existing = document.querySelector(`style[data-route="${routeName}"]`);
                if (existing) existing.remove();

                if (css) {
                    const style = document.createElement('style');
                    style.textContent = css;
                    style.setAttribute('data-route', routeName);
                    document.head.appendChild(style);
                }
            } catch (err) {
                console.warn(`DynamicInclude: Failed to apply style for ${routeName}:`, err.message);
                // Style application failure does not affect component loading
            }
        },
        
    }
};