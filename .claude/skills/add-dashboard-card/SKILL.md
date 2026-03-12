---
name: add-dashboard-card
description: 대시보드에 통계 카드(KPI), 테이블 카드, 활동 로그 위젯 추가.
---

대시보드 페이지에 통계 카드, 차트, 활동 로그 등의 위젯을 추가한다.

## 사용자 입력 수집

AskUserQuestion으로 다음을 확인:
- **대상 페이지** (예: home, dashboard)
- **카드 유형** (통계 카드, 테이블 카드, 차트 카드, 활동 로그)
- **데이터 소스** (API 엔드포인트 — API 연동 시 사용할 경로)
- **카드 제목 및 설명**

## Mock 데이터

대시보드 데이터는 `mock-api/{page}-stats.json`에 JSON으로 분리한다.
기존 mock-api 파일이 있으면 해당 파일에 데이터를 추가하고, 없으면 새로 생성한다.
JS에서 `fetch('mock-api/...')`로 로드하며, TODO 주석으로 실제 API 코드를 포함한다.
`.claude/templates/page.md`의 "Mock 데이터 규칙" 섹션 참조.

## 카드 유형별 구조

### 통계 카드 (KPI)

```html
<div class="col-12 col-md-6 col-xl-3">
    <div class="card shadow-sm border-0">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <p class="text-secondary mb-1 small">{라벨}</p>
                    <h3 class="fw-bold mb-0">{{ stat.value.toLocaleString() }}</h3>
                </div>
                <div class="rounded-3 p-3" style="background-color: var(--gray-100);">
                    <i class="bi bi-{icon} fs-4" style="color: var(--primary-color);"></i>
                </div>
            </div>
            <div class="mt-2">
                <span :class="stat.change >= 0 ? 'text-success' : 'text-danger'" class="small">
                    <i :class="stat.change >= 0 ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                    {{ Math.abs(stat.change) }}%
                </span>
                <span class="text-secondary small ms-1">지난 달 대비</span>
            </div>
        </div>
    </div>
</div>
```

### 테이블 카드

```html
<div class="card shadow-sm border-0">
    <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
        <h6 class="fw-bold mb-0">{제목}</h6>
        <a class="text-primary small text-decoration-none" @click.prevent="navigateTo('{경로}')">
            전체보기 <i class="bi bi-arrow-right"></i>
        </a>
    </div>
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <!-- thead + tbody -->
            </table>
        </div>
    </div>
</div>
```

### 활동 로그 카드

```html
<div class="card shadow-sm border-0">
    <div class="card-header bg-transparent border-0">
        <h6 class="fw-bold mb-0">{제목}</h6>
    </div>
    <div class="card-body">
        <div v-for="activity in activities" :key="activity.id" class="d-flex mb-3">
            <div class="me-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center"
                     style="width: 36px; height: 36px; background-color: var(--gray-100);">
                    <i :class="activity.icon" style="color: var(--primary-color);"></i>
                </div>
            </div>
            <div>
                <p class="mb-0 small">{{ activity.message }}</p>
                <small class="text-secondary">{{ activity.time }}</small>
            </div>
        </div>
    </div>
</div>
```

## 반응형 그리드 기준

- 통계 카드: `col-12 col-md-6 col-xl-3`
- 테이블/차트: `col-12 col-lg-6`
- 숫자 포맷: `toLocaleString()` 사용
- 아이콘: Bootstrap Icons (`bi-*`)
- 인라인 style은 CSS 변수 활용: `var(--primary-color)`, `var(--gray-100)`
