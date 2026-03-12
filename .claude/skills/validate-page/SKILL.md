---
name: validate-page
description: 페이지가 ViewLogic 규칙을 준수하는지 검증하고 위반 사항을 자동 수정.
argument-hint: "페이지경로"
---

지정된 페이지가 ViewLogic 프로젝트 규칙을 준수하는지 검증하고 위반 사항을 수정한다.

$ARGUMENTS 가 있으면 해당 페이지를 검증. 없으면 AskUserQuestion으로 검증할 페이지 확인.

## 검증 항목

`.claude/rules/viewlogic-guide.md`와 `.claude/rules/style-guide.md`의 모든 규칙을 검증.
추가로 `docs/patterns.md`의 표준 패턴 준수 여부를 확인:

### 파일 구조
- view + logic 파일 쌍 존재, 이름 일치

### HTML (view)
- `<style>` 태그 없음
- `v-for`에 `:key` 존재 (index 아닌 고유 ID)
- 폼에 `@submit.prevent` 사용
- 필수 필드에 `<span class="text-danger">*</span>`
- 에러 표시에 `is-invalid` + `invalid-feedback`

### JavaScript (logic)
- `export default` + `name` + `layout` 속성
- `async/await` 사용 (`Promise.then/catch` 금지)
- `navigateTo()` 사용 (`window.location` 금지)
- 비동기 메서드에 `try/catch`, `finally`에서 loading 해제
- 삭제 작업에 `confirm()`
- 컴포넌트 `components` 배열 등록

### 패턴
- 로딩: `v-if="loading"` → `v-else-if="빈 상태"` → `v-else` 순서
- 에러: 조회=`console.error`, 저장=`console.error`+`alert`
- 폼: `validate()` 메서드 분리, `errors` 객체 관리

## 결과 보고

통과/위반/경고 항목을 분류하여 보고.

## 자동 수정

사용자 동의 후 위반 사항 수정:
- `layout: false` → `layout: null`
- `Promise.then()` → `async/await`
- `:key="index"` → 고유 키
- `<style>` → `css/base.css`로 이동
- `window.location.hash` → `navigateTo()`
