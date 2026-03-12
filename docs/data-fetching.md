# 데이터 페칭 (Data Fetching)

## Mock 데이터 (개발용)

개발 시 mock 데이터는 `mock-api/` 폴더에 JSON 파일로 분리하여 관리한다.

```
mock-api/
├── users.json          # 사용자 목록
├── products.json       # 상품 목록
└── dashboard-stats.json  # 대시보드 통계
```

### Mock 데이터 로드

```javascript
async loadData() {
    this.loading = true;
    try {
        // TODO: API 연동 시 아래 주석으로 교체
        // const response = await this.$api.get('/api/users');
        // this.items = response.data;
        const response = await fetch('mock-api/users.json');
        this.items = await response.json();
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
    } finally {
        this.loading = false;
    }
}
```

### 상세 조회 (ID로 필터링)

```javascript
async loadItem() {
    // TODO: API 연동 시 아래 주석으로 교체
    // const response = await this.$api.get(`/api/users/${this.id}`);
    // this.item = response.data;
    const response = await fetch('mock-api/users.json');
    const items = await response.json();
    this.item = items.find(item => item.id === Number(this.id));
}
```

### API 연동 전환

`fetch('mock-api/...')` 2줄을 삭제하고 위 TODO 주석을 해제하면 완료.

---

## 자동 데이터 로딩 (dataURL)

`dataURL` 속성 지정 시 마운트 전에 자동 GET 요청.

### 문자열 형태 (단일 API)

응답 데이터가 data()의 속성들에 자동 매핑:

```javascript
export default {
    name: 'Users',
    dataURL: '/api/users',
    data() {
        return { users: [] }  // API 응답으로 자동 채워짐
    }
}
```

### 객체 형태 (다중 API)

key가 data()의 변수명, value가 API URL:

```javascript
export default {
    name: 'Dashboard',
    dataURL: {
        users: '/api/users',
        stats: '/api/stats'
    },
    data() {
        return {
            users: [],   // /api/users 응답 → this.users
            stats: null   // /api/stats 응답 → this.stats
        }
    }
}
```

URL에 `{param}` 포함 시 쿼리 파라미터에서 자동 치환:

```javascript
dataURL: {
    user: '/api/users/{id}'
}
// /#/user-detail?id=123 → GET /api/users/123 → this.user
```

## 수동 API 호출

```javascript
export default {
    name: 'Products',
    data() {
        return { products: [], loading: false }
    },
    async mounted() {
        await this.loadProducts();
    },
    methods: {
        async loadProducts() {
            this.loading = true;
            try {
                const response = await this.$api.get('/api/products');
                this.products = response.data;
            } catch (error) {
                console.error('로딩 실패:', error);
            } finally {
                this.loading = false;
            }
        },
        async searchProducts(keyword) {
            const response = await this.$api.get('/api/products/search', {
                params: { q: keyword }
            });
            this.products = response.data;
        }
    }
}
```
