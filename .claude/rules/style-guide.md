# CSS 스타일 규칙

## 최우선 원칙
Bootstrap 5 클래스 최대 활용, Custom CSS 최소화. 모든 커스텀 CSS는 `css/base.css`에 작성.

## 금지
- HTML 파일에 `<style>` 태그 사용 금지

## 필수
- CSS 값은 CSS 변수 사용: `var(--primary-color)`, `var(--gray-100)`
- 반응형: Bootstrap grid 사용 (`col-12 col-md-6 col-xl-3`)

## 색상 변수
- `--primary-color: #6366f1` (주요 버튼, 활성 메뉴)
- `--success-color: #10b981` (완료, 달성)
- `--danger-color: #ef4444` (삭제, 위험)
- `--warning-color: #f59e0b` (경고)
- `--growth-color: #8b5cf6` (성장)

## 신호등 시스템
- `--signal-red: #ef4444` (40% 미만)
- `--signal-yellow: #f59e0b` (40-70%)
- `--signal-green: #10b981` (70% 이상)

## 주요 클래스
`.stat-card`, `.stat-icon.primary`, `.signal-light.green`, `.progress-fill.red`, `.red-flag-alert`, `.badge.success`

## 반응형 브레이크포인트
- 모바일: `max-width: 768px`
- 태블릿: `max-width: 1024px`
