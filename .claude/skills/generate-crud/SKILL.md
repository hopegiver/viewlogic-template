---
name: generate-crud
description: CRUD 페이지 세트(목록, 상세, 생성, 수정) 한 번에 생성. 리소스명과 필드를 받아 4쌍 8파일 자동 생성.
---

리소스(엔티티)에 대한 목록, 상세, 생성, 수정 페이지를 한 번에 생성한다.

## 사용자 입력 수집

AskUserQuestion으로 다음을 확인:
- **리소스명** (예: users, products, orders)
- **API 기본 경로** (예: /api/users)
- **필드 목록** (예: name:string, email:email, role:select, description:textarea)
- **한글 리소스명** (예: 사용자, 상품, 주문)

## 생성할 파일 (4쌍 = 8파일)

```
src/views/{resource}/list.html      + src/logic/{resource}/list.js
src/views/{resource}/detail.html    + src/logic/{resource}/detail.js
src/views/{resource}/create.html    + src/logic/{resource}/create.js
src/views/{resource}/edit.html      + src/logic/{resource}/edit.js
```

## 페이지별 구조

### 목록 (list)
- `.claude/templates/page.md`의 "목록 페이지" 변형 기반
- 검색: `keyword` + `computed: filteredItems()` (클라이언트 필터링)
- 삭제: `confirm()` 확인 후 API DELETE + 목록 갱신
- 버튼: 추가, 상세보기, 수정, 삭제

### 상세 (detail)
- `.claude/templates/page.md`의 "상세 페이지" 변형 기반
- `this.getParam('id')`로 ID 수신
- 버튼: 수정, 삭제, 목록으로

### 생성 (create)
- `.claude/templates/page.md`의 "폼 페이지" 변형 기반
- 필드 타입별 input 매핑 (string→text, email→email, textarea→textarea, select→select)
- `validate()` 메서드 분리, `errors` 객체로 필드별 에러 관리
- POST API 호출 후 목록으로 이동

### 수정 (edit)
- create와 동일한 폼 구조
- `this.getParam('id')`로 기존 데이터 로드
- PUT API 호출

## 참조 문서
- `.claude/templates/page.md` - 페이지 변형별 코드 구조
- `docs/patterns.md` - 로딩/에러/폼 밸리데이션 표준 패턴
