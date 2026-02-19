# 데이터 페칭 (Data Fetching)

## 자동 데이터 로딩 (dataURL)

가장 간단한 방법 - `dataURL` 속성 지정 시 자동 GET 요청:

```javascript
export default {
    name: 'Users',
    dataURL: '/api/users',
    data() {
        return { users: [] }  // API 응답으로 자동 채워짐
    }
}
```

### 파라미터 치환

```javascript
export default {
    name: 'UserDetail',
    dataURL: {
        url: '/api/users/{id}',  // {id}는 URL 파라미터에서 자동 치환
        method: 'GET'
    },
    data() {
        return { user: null }
    }
}
// /#/user-detail?id=123 → GET /api/users/123
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
