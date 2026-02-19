export default {
    layout: 'default',

    data() {
        return {
            stats: {
                totalVideos: 1247,
                videosChange: 12.5,
                storageUsed: 8.4,
                storageTotal: 10,
                monthlyViews: 3420000,
                viewsChange: 23.8,
                bandwidth: 15.2,
                bandwidthCost: 456
            },
            encoding: {
                inProgress: 3,
                queued: 7,
                completed: 42,
                jobs: [
                    { id: 1, title: 'product-demo-2024.mp4', progress: 67 },
                    { id: 2, title: 'tutorial-series-ep5.mp4', progress: 34 },
                    { id: 3, title: 'company-introduction.mp4', progress: 89 }
                ]
            },
            recentActivities: [
                {
                    id: 1,
                    icon: 'bi bi-cloud-upload',
                    message: '새 동영상 업로드: product-demo-2024.mp4',
                    time: '5분 전'
                },
                {
                    id: 2,
                    icon: 'bi bi-check-circle',
                    message: '인코딩 완료: tutorial-series-ep5.mp4',
                    time: '12분 전'
                },
                {
                    id: 3,
                    icon: 'bi bi-send',
                    message: '배포 패키지 "고객용" 활성화',
                    time: '1시간 전'
                },
                {
                    id: 4,
                    icon: 'bi bi-person-plus',
                    message: '새 팀원 추가: 김민수',
                    time: '2시간 전'
                },
                {
                    id: 5,
                    icon: 'bi bi-gear',
                    message: '플레이어 설정 업데이트',
                    time: '3시간 전'
                }
            ],
            topVideos: [
                {
                    id: 1,
                    title: '신제품 소개 영상',
                    thumbnail: 'https://picsum.photos/160/90?random=1',
                    duration: '05:24',
                    views: 125430,
                    viewsChange: 34.2,
                    watchTime: '4.2시간',
                    completion: 87,
                    status: '배포 중'
                },
                {
                    id: 2,
                    title: '사용자 가이드 - 시작하기',
                    thumbnail: 'https://picsum.photos/160/90?random=2',
                    duration: '08:15',
                    views: 98234,
                    viewsChange: 18.5,
                    watchTime: '3.8시간',
                    completion: 72,
                    status: '배포 중'
                },
                {
                    id: 3,
                    title: '회사 소개 영상 2024',
                    thumbnail: 'https://picsum.photos/160/90?random=3',
                    duration: '03:42',
                    views: 87651,
                    viewsChange: -5.3,
                    watchTime: '2.9시간',
                    completion: 91,
                    status: '배포 중'
                },
                {
                    id: 4,
                    title: '고급 기능 활용법',
                    thumbnail: 'https://picsum.photos/160/90?random=4',
                    duration: '12:30',
                    views: 76543,
                    viewsChange: 12.1,
                    watchTime: '4.5시간',
                    completion: 65,
                    status: '배포 중'
                },
                {
                    id: 5,
                    title: '월간 뉴스레터 1월',
                    thumbnail: 'https://picsum.photos/160/90?random=5',
                    duration: '06:18',
                    views: 65432,
                    viewsChange: 8.7,
                    watchTime: '2.1시간',
                    completion: 78,
                    status: '배포 중'
                }
            ]
        };
    },

    computed: {
        storagePercent() {
            return Math.round((this.stats.storageUsed / this.stats.storageTotal) * 100);
        }
    },

    async mounted() {
        await this.loadDashboardData();
    },

    methods: {
        async loadDashboardData() {
            // TODO: API 호출로 실제 데이터 로드
            // const response = await this.$api.get('/api/dashboard');
            // this.stats = response.data.stats;
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
