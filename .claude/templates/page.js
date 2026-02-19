// src/logic/{folder}/{page-name}.js
// 페이지 JavaScript 템플릿

export default {
    name: 'PageName',
    layout: 'default',  // 또는 null (레이아웃 없이)

    // components: ['Table', 'Loading'],  // 사용할 컴포넌트

    data() {
        return {
            // URL 파라미터
            // id: this.getParam('id'),

            // 페이지 데이터
            items: [],
            loading: false
        }
    },

    computed: {
        // 캐싱되는 계산값
        // itemCount() {
        //     return this.items.length;
        // }
    },

    async mounted() {
        await this.loadData();
    },

    methods: {
        async loadData() {
            this.loading = true;
            try {
                const response = await this.$api.get('/api/items');
                this.items = response.data;
            } catch (error) {
                console.error('데이터 로딩 실패:', error);
            } finally {
                this.loading = false;
            }
        }

        // async handleSubmit() {
        //     const response = await this.$api.post('/api/items', this.form);
        //     if (response.success) {
        //         this.navigateTo('/items');
        //     }
        // }
    }
}
