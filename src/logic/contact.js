export default {
    name: 'Contact',
    
    data() {
        return {
            form: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            isLoading: false,
            contactInfo: [
                { icon: '📧', title: 'Email', value: 'contact@viewlogic.com' },
                { icon: '📞', title: 'Phone', value: '02-1234-5678' },
                { icon: '📍', title: 'Address', value: 'Seoul, Gangnam-gu' }
            ]
        };
    },
    
    methods: {
        async sendMessage() {
            if (!this.form.name || !this.form.email || !this.form.message) {
                alert('Please fill in the required fields.');
                return;
            }
            
            this.isLoading = true;
            
            // Message sending simulation
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Message has been sent!');
            
            // Form reset
            this.form = {
                name: '',
                email: '',
                subject: '',
                message: ''
            };
            
            this.isLoading = false;
        }
    }
};