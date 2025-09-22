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
            
            // Prevent duplicate loading
            if (this.loading) return;
            
            this.loading = true;
            this.error = false;
            this.loadingStartTime = Date.now();
            
            try {
                // Check router status
                if (!window.router) {
                    throw new Error('Router not initialized');
                }
                
                // Wait for router to be ready (with timeout)
                if (!window.router?.routeLoader) {
                    await new Promise((resolve, reject) => {
                        let attempts = 0;
                        const maxAttempts = 100; // 5 second timeout
                        
                        const check = () => {
                            attempts++;
                            if (window.router?.routeLoader) {
                                resolve();
                            } else if (attempts >= maxAttempts) {
                                reject(new Error('Router timeout: RouteLoader not ready'));
                            } else {
                                setTimeout(check, 50);
                            }
                        };
                        check();
                    });
                }
                
                // Validate page name
                if (!this.page || typeof this.page !== 'string' || this.page.trim() === '') {
                    throw new Error('Invalid page name provided');
                }
                
                // Load component (with additional error handling)
                const component = await window.router.routeLoader.createVueComponent(this.page.trim());
                
                // Apply styles in development mode
                if (component._style) {
                    this.applyStyle(component._style, `dynamic-${this.page}`);
                }
                
                this.dynamicComponent = Vue.markRaw(component);
                
            } catch (err) {
                // Simple error logging (non-breaking for router)
                console.warn(`DynamicInclude: Failed to load '${this.page}':`, err.message);
                
                // Set error state
                this.error = true;
                this.errorMessage = err.message || `Cannot load page '${this.page}'`;
                this.dynamicComponent = null;
            } finally {
                this.loading = false;
                this.loadingStartTime = null;
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