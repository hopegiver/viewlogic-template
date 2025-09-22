export default {
    name: 'Layout',

    data() {
        return {
            footerData: {
                company: {
                    name: 'ViewLogic',
                    description: 'Creating amazing web experiences with modern technology and innovative design.'
                },
                contact: {
                    email: 'hello@viewlogic.dev',
                    phone: '+1 (555) 123-4567',
                    address: 'San Francisco, CA'
                },
                social: [
                    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
                    { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
                    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
                    { name: 'Email', icon: '✉️', url: 'mailto:hello@viewlogic.dev' }
                ]
            }
        };
    }
};