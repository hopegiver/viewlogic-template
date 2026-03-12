---
name: add-search-filter
description: 목록 페이지에 검색/필터 기능 추가. 클라이언트 필터링(computed) 또는 서버 검색(API) 방식 선택.
---

기존 목록 페이지에 검색 및 필터 기능을 추가한다.

## 사용자 입력 수집

AskUserQuestion으로 다음을 확인:
- **대상 페이지** (예: users/list)
- **검색 대상 필드** (예: name, email)
- **필터 유형** (클라이언트 필터링 / 서버 검색)
- **필터 조건** (예: status 셀렉트, dateRange 등) - 선택사항

## 클라이언트 필터링 (computed 방식)

데이터가 이미 로드된 경우. `docs/patterns.md`의 검색/필터 패턴 참조.

**logic에 추가:**
```javascript
data() → keyword: '', filterStatus: ''

computed: {
    filteredItems() {
        let result = this.items;
        if (this.keyword) {
            const q = this.keyword.toLowerCase();
            result = result.filter(item =>
                item.{field}.toLowerCase().includes(q)
            );
        }
        if (this.filterStatus) {
            result = result.filter(item => item.status === this.filterStatus);
        }
        return result;
    }
}
```

**view에 추가 (목록 상단):**
```html
<div class="row g-3 mb-4">
    <div class="col-12 col-md-6">
        <input v-model="keyword" type="text" class="form-control"
               placeholder="검색어를 입력하세요...">
    </div>
    <div class="col-12 col-md-3">
        <select v-model="filterStatus" class="form-select">
            <option value="">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
        </select>
    </div>
</div>
```

`v-for`를 `items` 대신 `filteredItems`로 변경.

## 서버 검색 (API 방식)

대량 데이터에서 서버 측 검색이 필요한 경우.

**logic에 추가:**
```javascript
methods: {
    async searchItems() {
        this.loading = true;
        try {
            const response = await this.$api.get('{apiBase}', {
                params: { q: this.keyword, status: this.filterStatus, page: this.currentPage }
            });
            this.items = response.data.items;
            this.totalPages = response.data.totalPages;
        } catch (error) {
            console.error('검색 실패:', error);
        } finally {
            this.loading = false;
        }
    },
    handleSearch() {
        this.currentPage = 1;
        this.searchItems();
    }
}
```

**view:** `@submit.prevent="handleSearch"` 폼 + 검색 버튼.

## 페이지네이션 (서버 검색 시)

```html
<nav v-if="totalPages > 1">
    <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click.prevent="changePage(currentPage - 1)">이전</a>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item"
            :class="{ active: page === currentPage }">
            <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" @click.prevent="changePage(currentPage + 1)">다음</a>
        </li>
    </ul>
</nav>
```
