---
name: setup-i18n
description: 프로젝트에 다국어(i18n) 시스템 설정. 메시지 파일 생성, 텍스트 변환, 언어 전환 UI 구성.
---

프로젝트에 다국어(i18n) 시스템을 설정한다. 상세 API는 `docs/i18n.md` 참조.

## 사용자 입력 수집

AskUserQuestion으로 다음을 확인:
- **지원 언어 목록** (예: ko, en, ja)
- **기본 언어** (예: ko)
- **언어 전환 UI 위치** (헤더, 푸터, 설정 페이지)

## 구현 절차

### 1. index.html 라우터 설정 수정

```javascript
const router = new ViewLogicRouter({
    useI18n: true,
    defaultLanguage: 'ko'
});
```

### 2. 메시지 파일 생성

`i18n/` 폴더에 각 언어별 JSON 파일 생성. 권장 키 구조:

```json
{
    "common": { "save": "", "cancel": "", "delete": "", "edit": "", "create": "", "search": "", "loading": "", "noData": "" },
    "auth": { "login": "", "logout": "", "username": "", "password": "" },
    "validation": { "required": "{field}을(를) 입력해주세요.", "email": "", "minLength": "" },
    "message": { "saveSuccess": "", "saveFailed": "", "deleteConfirm": "", "deleteFailed": "" }
}
```

모든 언어 파일의 키 구조는 동일하게 유지.

### 3. 기존 페이지 텍스트 변환

```html
<!-- Before --> <button>저장</button>
<!-- After  --> <button>{{ $t('common.save') }}</button>
```

```javascript
// Before: alert('저장에 실패했습니다.');
// After:  alert(this.$t('message.saveFailed'));
```

### 4. 언어 전환 UI 추가

```html
<div class="dropdown">
    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
        {{ $lang === 'ko' ? '한국어' : $lang === 'en' ? 'English' : $lang }}
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" :class="{ active: $lang === 'ko' }"
               @click.prevent="$i18n.setLanguage('ko')">한국어</a></li>
        <li><a class="dropdown-item" :class="{ active: $lang === 'en' }"
               @click.prevent="$i18n.setLanguage('en')">English</a></li>
    </ul>
</div>
```

### 5. 파라미터 치환

```html
{{ $t('validation.required', { field: '이메일' }) }}
```

## 참조 문서
- `docs/i18n.md` - i18n 내장 API (`$t()`, `$lang`, `$i18n.setLanguage()`) 상세
