---
name: setup-auth
description: 프로젝트에 인증 시스템(로그인/로그아웃/보호 라우트) 설정. 라우터 설정, 로그인 페이지, 토큰 관리 구성.
---

프로젝트에 인증(로그인/로그아웃) 시스템을 설정한다. 상세 API는 `docs/auth.md` 참조.

## 사용자 입력 수집

AskUserQuestion으로 다음을 확인:
- **보호할 라우트** (예: dashboard, admin/*, users/*)
- **로그인 페이지 경로** (기본: login)
- **토큰 저장소** (localStorage / sessionStorage / cookie / memory)
- **로그인 API 엔드포인트** (예: /api/auth/login)

## 구현 절차

### 1. index.html 라우터 설정 수정

```javascript
const router = new ViewLogicRouter({
    useAuth: true,
    loginRoute: 'login',
    protectedRoutes: ['dashboard', 'admin/*', 'users/*'],
    authStorage: 'localStorage'
});
```

### 2. 로그인 페이지 확인/생성

기존 로그인 페이지가 있으면 수정, 없으면 `.claude/templates/page.md`의 폼 변형 기반으로 생성.

핵심 로직:
```javascript
export default {
    name: 'Login',
    layout: null,
    methods: {
        async handleLogin() {
            this.isLoading = true;
            try {
                const response = await this.$api.post('{loginApiEndpoint}', this.form);
                this.setToken(response.data.token);
                const redirect = this.getParam('redirect', 'home');
                this.navigateTo(`/${redirect}`);
            } catch (error) {
                console.error('로그인 실패:', error);
                this.errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.';
            } finally {
                this.isLoading = false;
            }
        }
    }
}
```

### 3. 레이아웃에 로그아웃 추가

```html
<a class="dropdown-item" @click.prevent="handleLogout">로그아웃</a>
```
```javascript
handleLogout() { this.logout(); }
```

## 자동 동작

- 인증 활성화 시 모든 API 요청에 `Authorization: Bearer {token}` 자동 추가
- 보호된 라우트 접근 시 미인증이면 `?redirect=` 파라미터와 함께 로그인 페이지로 리다이렉트

## 참조 문서
- `docs/auth.md` - 인증 내장 메서드 (`setToken`, `getToken`, `isAuth`, `logout`) 상세
