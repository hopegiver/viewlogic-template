---
name: add-builtin-component
description: 기존 페이지에 ViewLogic 내장 컴포넌트(DatePicker, FileUpload, Loading, Sidebar, Table 등) 추가 및 설정.
---

기존 페이지에 ViewLogic 내장 컴포넌트를 추가한다.

## 사용자 입력 수집

AskUserQuestion으로 다음을 확인:
- **대상 페이지** (예: users/create)
- **추가할 컴포넌트** (DatePicker, FileUpload, Loading, Sidebar, Table, DynamicInclude, HtmlInclude)

## 구현 절차

1. 대상 페이지 logic 파일에 `components: ['ComponentName']` 배열 추가/수정
2. `docs/components-builtin.md`를 반드시 참조하여 정확한 Props/Events 확인
3. view 파일에 컴포넌트 태그 추가
4. logic 파일에 필요한 data/methods 추가

## 컴포넌트별 빠른 참조

### DatePicker
```html
<DatePicker v-model="form.date" label="날짜" placeholder="날짜를 선택하세요" clearable />
```

### FileUpload
```html
<FileUpload v-model="files" label="첨부파일" accept="image/*,.pdf"
    multiple :max-size="5242880" upload-url="/api/upload" preview />
```

### Loading
```html
<Loading :visible="isLoading" text="데이터 로딩 중..." type="dots" overlay />
```

### Table
```html
<Table :data="items" :columns="columns" :loading="loading"
    searchable pagination :page-size="20" striped hoverable />
```
columns 예시: `[{ key: 'name', label: '이름', sortable: true }]`

### Sidebar
```html
<Sidebar v-model="sidebarOpen" title="메뉴" navigation
    :menu-items="menuItems" variant="dark" collapsible />
```

### DynamicInclude
```html
<DynamicInclude page="components/user-card" />
```

### HtmlInclude
```html
<HtmlInclude src="/partials/notice.html" />
```

## 참조 문서
- `docs/components-builtin.md` - 전체 Props/Events/사용 예시
