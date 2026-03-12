# ViewLogic Template

## 프로젝트 개요

Vue 3 + ViewLogic Router 기반의 SPA 템플릿. Bootstrap 5로 스타일링하며, 빌드 과정 없이 CDN으로 직접 실행 가능.

## 기술 스택

- **프레임워크**: Vue 3 (CDN)
- **라우터**: ViewLogic Router 1.4.0 (파일 기반 라우팅)
- **CSS**: Bootstrap 5.3.3 + 최소한의 커스텀 CSS (`css/base.css`)
- **빌드**: 없음 (정적 파일 서빙)

## 프로젝트 구조

```
project/
├── index.html              # 진입점 (Vue, ViewLogic, Bootstrap CDN 로드)
├── css/base.css            # 커스텀 CSS (Bootstrap 우선, 최소화)
├── src/
│   ├── views/              # HTML 템플릿 (CSS 금지)
│   │   ├── layout/         # 레이아웃 템플릿
│   │   └── {page}.html     # 페이지 뷰
│   ├── logic/              # JavaScript 로직
│   │   ├── layout/         # 레이아웃 스크립트
│   │   └── {page}.js       # 페이지 로직
│   └── components/         # 재사용 컴포넌트
├── i18n/                   # 다국어 파일 (선택)
└── docs/                   # 상세 문서
```

## 핵심 규칙

`views/{name}.html` ↔ `logic/{name}.js` 파일 쌍 필수. 폴더 구조 = 라우트.
상세 규칙은 `.claude/rules/` 참조 (CSS: `style-guide.md`, JS: `viewlogic-guide.md`).

## 상세 문서

기능별 상세 문서는 `docs/` 폴더 참조:

| 문서 | 내용 |
|------|------|
| [docs/routing.md](docs/routing.md) | 파일 기반 라우팅, 페이지 이동, 파라미터 |
| [docs/data-fetching.md](docs/data-fetching.md) | dataURL 자동 로딩, 수동 API 호출 |
| [docs/forms.md](docs/forms.md) | 명령형/선언적 폼 처리 |
| [docs/api.md](docs/api.md) | $api 메서드 (GET/POST/PUT/DELETE), 에러 처리 |
| [docs/auth.md](docs/auth.md) | 인증 설정, 로그인/로그아웃, 토큰 관리 |
| [docs/i18n.md](docs/i18n.md) | 다국어 설정, 메시지 파일, 언어 전환 |
| [docs/components.md](docs/components.md) | 컴포넌트 생성/등록 |
| [docs/components-builtin.md](docs/components-builtin.md) | 내장 컴포넌트 상세 (DatePicker, Table, Sidebar 등) |
| [docs/layout.md](docs/layout.md) | 레이아웃 시스템, 레이아웃 지정 |
| [docs/patterns.md](docs/patterns.md) | 공통 패턴 (로딩 상태, 에러 처리, 폼 밸리데이션, 검색/필터) |
| [docs/advanced.md](docs/advanced.md) | 라이프사이클, computed, watch, 캐싱, 상태 관리 |
| [docs/configuration.md](docs/configuration.md) | ViewLogicRouter 전체 설정 옵션 |

## 커맨드

| 커맨드 | 설명 |
|--------|------|
| `/create-page` | 새 페이지 (view + logic) 생성 |
| `/create-component` | 새 재사용 컴포넌트 생성 |
| `/create-layout` | 새 레이아웃 생성 |
| `/generate-crud` | CRUD 페이지 세트 (목록, 상세, 생성, 수정) 한 번에 생성 |
| `/add-modal` | 기존 페이지에 Bootstrap 모달 다이얼로그 추가 |
| `/add-search-filter` | 목록 페이지에 검색/필터 기능 추가 (클라이언트/서버) |
| `/add-builtin-component` | 내장 컴포넌트 (DatePicker, Table 등) 추가 및 설정 |
| `/add-dashboard-card` | 대시보드에 통계 카드/테이블/활동 로그 위젯 추가 |
| `/setup-auth` | 인증 시스템 (로그인/로그아웃/보호 라우트) 설정 |
| `/setup-i18n` | 다국어 지원 (i18n) 시스템 설정 |
| `/validate-page` | 페이지가 ViewLogic 규칙을 준수하는지 검증 및 자동 수정 |

## 템플릿

`.claude/templates/` 폴더에 변형 패턴 포함 템플릿 문서가 있습니다:

| 템플릿 | 용도 |
|--------|------|
| `page.md` | 페이지 (정적, 목록, 상세, 폼 4가지 변형) |
| `component.md` | 컴포넌트 (기본, 슬롯, v-model 3가지 변형) |
| `layout.md` | 레이아웃 (네비게이션, 사이드바 2가지 변형) |

## 개발 서버

```bash
python -m http.server 8000
# 또는 VS Code Live Server (포트 5502)
```

## 추가 리소스

- **GitHub**: https://github.com/hopegiver/viewlogic
- **npm**: https://www.npmjs.com/package/viewlogic
