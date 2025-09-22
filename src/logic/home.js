export default {
    name: 'Home',

    data() {
        return {
            heroTitle: 'ViewLogic Router',
            heroSubtitle: 'A revolutionary Vue 3 routing system with View-Logic separation and Zero Build Development',
            heroDescription: 'Complete routing solution in just 13KB gzipped with built-in components, authentication, and revolutionary features.',

            activeTab: 'dataurl',
            showDemoModal: false,
            demoInput: '',

            revolutionaryTabs: [
                {
                    name: 'dataurl',
                    label: 'Auto Data Fetching',
                    icon: '⚡'
                },
                {
                    name: 'forms',
                    label: 'Smart Forms',
                    icon: '📝'
                },
                {
                    name: 'dynamic',
                    label: 'Dynamic Includes',
                    icon: '🔄'
                }
            ],

            philosophies: [
                {
                    title: 'View-Logic Separation',
                    subtitle: 'Clean Architecture',
                    icon: '🎭',
                    description: 'Complete separation between View (presentation) and Logic (business logic). Views are pure HTML templates, logic is pure JavaScript components.',
                    benefits: [
                        'Pure HTML templates without mixed logic',
                        'Focused JavaScript components',
                        'Better maintainability and testability',
                        'Scalable code organization'
                    ]
                },
                {
                    title: 'Zero Build Development',
                    subtitle: 'Instant Development',
                    icon: '🚀',
                    description: 'Zero build step required in development mode. Work directly with source files, see changes instantly without compilation or bundling.',
                    benefits: [
                        'Instant changes without compilation',
                        'True real-time development',
                        'No webpack, vite, or build tools needed',
                        'Focus on code, not build configuration'
                    ]
                }
            ],

            keyFeatures: [
                {
                    icon: '🪶',
                    title: 'Ultra-Lightweight',
                    description: 'Complete routing system in just 13KB gzipped (48KB minified) with everything included'
                },
                {
                    icon: '🔄',
                    title: 'Multiple API Support',
                    description: 'Parallel data fetching from multiple APIs with named data storage using dataURL'
                },
                {
                    icon: '📝',
                    title: 'Automatic Form Handling',
                    description: 'Revolutionary form submission with {paramName} variable parameters and auto-binding'
                },
                {
                    icon: '🛠️',
                    title: 'Built-in Components',
                    description: 'Preloaded UI components including revolutionary DynamicInclude & HtmlInclude'
                },
                {
                    icon: '🔗',
                    title: 'Query-Based Parameters',
                    description: 'Simple query-only parameters (/users?id=123) instead of complex path parameters'
                },
                {
                    icon: '⚡',
                    title: 'Optimized Production',
                    description: 'Pre-built individual route bundles for lightning-fast production performance'
                },
                {
                    icon: '📁',
                    title: 'Intuitive Structure',
                    description: 'Organized folder structure for views, logic, styles, layouts, and components'
                },
                {
                    icon: '💾',
                    title: 'Smart Caching',
                    description: 'Intelligent route and component caching with configurable TTL and size limits'
                },
                {
                    icon: '🔐',
                    title: 'Authentication',
                    description: 'Built-in auth management system with protected routes and token handling'
                },
                {
                    icon: '🌐',
                    title: 'i18n Ready',
                    description: 'Built-in internationalization support with automatic language detection'
                }
            ]
        };
    },

    methods: {
        showDemo() {
            this.showDemoModal = true;
        },

        showToast(message, type = 'info') {
            if (this.$refs.toast) {
                this.$refs.toast.show(message, type);
            }
        },

        navigateToComponents() {
            this.navigateTo('components');
        },

        navigateToContact() {
            this.navigateTo('contact');
        }
    },

    mounted() {
        // Initialize any animations or dynamic content
        console.log('ViewLogic Router Home page loaded');
    }
};