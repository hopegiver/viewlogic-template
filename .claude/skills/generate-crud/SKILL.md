---
name: generate-crud
description: CRUD 페이지 세트(목록, 상세, 생성, 수정) 한 번에 생성. 리소스명과 필드를 받아 4쌍 8파일 자동 생성.
---

리소스(엔티티)에 대한 목록, 상세, 생성, 수정 페이지를 한 번에 생성한다.

## 사용자 입력 수집

AskUserQuestion으로 다음을 확인:
- **리소스명** (예: users, products, orders)
- **API 기본 경로** (예: /api/users) — API 연동 시 사용할 경로
- **필드 목록** (예: name:string, email:email, role:select, description:textarea)
- **한글 리소스명** (예: 사용자, 상품, 주문)

## 생성할 파일 (4쌍 8파일 + mock 1파일)

```
mock-api/{resource}.json            # mock 데이터 (필드 기반 샘플 3~5건)
src/views/{resource}/list.html      + src/logic/{resource}/list.js
src/views/{resource}/detail.html    + src/logic/{resource}/detail.js
src/views/{resource}/create.html    + src/logic/{resource}/create.js
src/views/{resource}/edit.html      + src/logic/{resource}/edit.js
```

## Mock 데이터 생성 규칙

`mock-api/{resource}.json`에 필드 목록 기반 샘플 데이터 3~5건을 배열로 생성:
```json
[
    { "id": 1, "name": "홍길동", "email": "hong@example.com", "role": "admin" },
    { "id": 2, "name": "김철수", "email": "kim@example.com", "role": "editor" },
    { "id": 3, "name": "이영희", "email": "lee@example.com", "role": "viewer" }
]
```

JS에서는 `fetch('mock-api/{resource}.json')`으로 로드하고, API 연동 시 교체할 `this.$api` 코드를 TODO 주석으로 포함한다. `.claude/templates/page.md`의 "Mock 데이터 규칙" 섹션 참조.

## 페이지별 구조

### 목록 (list)
- `.claude/templates/page.md`의 "목록 페이지" 변형 기반
- `fetch('mock-api/{resource}.json')`으로 데이터 로드
- 검색: `keyword` + `computed: filteredItems()` (클라이언트 필터링)
- 삭제: `confirm()` 확인 후 목록에서 제거 (TODO 주석으로 API DELETE 포함)
- 버튼: 추가, 상세보기, 수정, 삭제

### 상세 (detail)
- `.claude/templates/page.md`의 "상세 페이지" 변형 기반
- `this.getParam('id')`로 ID 수신
- `fetch('mock-api/{resource}.json')` → `find()`로 해당 항목 로드
- 버튼: 수정, 삭제, 목록으로

### 생성 (create)
- `.claude/templates/page.md`의 "폼 페이지" 변형 기반
- 필드 타입별 input 매핑 (string→text, email→email, textarea→textarea, select→select)
- `validate()` 메서드 분리, `errors` 객체로 필드별 에러 관리
- 저장: `console.log()` + 목록 이동 (TODO 주석으로 POST API 포함)

### 수정 (edit)
- create와 동일한 폼 구조
- `this.getParam('id')`로 mock-api에서 기존 데이터 로드
- 저장: `console.log()` + 목록 이동 (TODO 주석으로 PUT API 포함)

## 참조 문서
- `.claude/templates/page.md` - 페이지 변형별 코드 구조 + Mock 데이터 규칙
- `docs/patterns.md` - 로딩/에러/폼 밸리데이션 표준 패턴
