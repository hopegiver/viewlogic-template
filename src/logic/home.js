export default {
    layout: 'default',

    data() {
        return {
            stats: {},
            encoding: {},
            recentActivities: [],
            topVideos: [],
            loading: false
        };
    },

    computed: {
        storagePercent() {
            if (!this.stats.storageTotal) return 0;
            return Math.round((this.stats.storageUsed / this.stats.storageTotal) * 100);
        }
    },

    async mounted() {
        await this.loadDashboardData();
    },

    methods: {
        async loadDashboardData() {
            this.loading = true;
            try {
                // TODO: API 연동 시 아래 주석으로 교체
                // const response = await this.$api.get('/api/dashboard');
                // const data = response.data;
                const response = await fetch('mock-api/dashboard.json');
                const data = await response.json();

                this.stats = data.stats;
                this.encoding = data.encoding;
                this.recentActivities = data.recentActivities;
                this.topVideos = data.topVideos;
            } catch (error) {
                console.error('대시보드 데이터 로딩 실패:', error);
            } finally {
                this.loading = false;
            }
        },

        getChangeClass(change) {
            return change >= 0 ? 'text-success' : 'text-danger';
        },

        getChangeIcon(change) {
            return change >= 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
        },

        getRankBadgeClass(rank) {
            if (rank === 1) return 'bg-warning text-dark';
            if (rank === 2) return 'bg-secondary';
            if (rank === 3) return 'bg-light text-dark';
            return 'bg-light text-dark';
        },

        getCompletionClass(completion) {
            if (completion >= 70) return 'bg-success';
            if (completion >= 40) return 'bg-warning';
            return 'bg-danger';
        },

        getStatusBadgeClass(status) {
            const statusMap = {
                '배포 중': 'bg-success-subtle text-success',
                '인코딩 중': 'bg-warning-subtle text-warning',
                '대기 중': 'bg-secondary-subtle text-secondary'
            };
            return statusMap[status] || 'bg-secondary-subtle text-secondary';
        },

        goToUpload() {
            this.navigateTo('/media/upload');
        },

        goToPackage() {
            this.navigateTo('/distribution/packages');
        },

        viewVideo(id) {
            this.navigateTo('/media/library', { id });
        }
    }
};
