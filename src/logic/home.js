export default {
    name: 'Home',

    data() {
        return {
            heroTitle: 'Welcome to Our Website',
            heroSubtitle: 'Create amazing experiences with our simple and powerful platform',

            features: [
                {
                    icon: '🚀',
                    title: 'Fast & Reliable',
                    description: 'Built for speed and performance with modern technologies'
                },
                {
                    icon: '🎯',
                    title: 'Easy to Use',
                    description: 'Intuitive interface that anyone can master in minutes'
                },
                {
                    icon: '🔒',
                    title: 'Secure',
                    description: 'Enterprise-grade security to protect your data'
                },
                {
                    icon: '📱',
                    title: 'Mobile Ready',
                    description: 'Works perfectly on all devices and screen sizes'
                },
                {
                    icon: '🛠️',
                    title: 'Customizable',
                    description: 'Flexible and extensible to fit your specific needs'
                },
                {
                    icon: '💡',
                    title: 'Smart',
                    description: 'Intelligent features that help you work more efficiently'
                }
            ]
        };
    },

    mounted() {
        console.log('Home page loaded');
    }
};