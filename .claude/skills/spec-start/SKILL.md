---
name: spec-start
description: "개발 문서 세트(PRD, 아키텍처, 백엔드 스펙, 프론트엔드 스펙, 리뷰, 최종 명세) 전체 생성. 명시적 호출 전용."
argument-hint: "(인자 없음)"
user_invocable: false
---

$ARGUMENTS 는 무시하세요. 이 스킬은 인자 없이 실행됩니다.

## 목적

`docs/specs/00-business-brief.md`를 입력으로 받아, 5개 에이전트를 순서대로 실행하여 개발 문서 세트를 생성합니다.

## 사전 조건

- `docs/specs/00-business-brief.md`에 비즈니스 아이디어가 작성되어 있어야 합니다.
- 파일이 비어 있거나 템플릿 상태이면, 사용자에게 먼저 작성하라고 안내하고 중단하세요.

## 실행 순서

아래 순서대로 에이전트를 호출하세요. 각 단계는 이전 단계의 출력에 의존하므로 **반드시 순차 실행**합니다.

### Step 1: planner
- 입력: `docs/specs/00-business-brief.md`
- 출력: `docs/specs/01-product-requirements.md`
- 에이전트: `planner`

### Step 2: architect
- 입력: `docs/specs/01-product-requirements.md`
- 출력: `docs/specs/02-system-architecture.md`
- 에이전트: `architect`

### Step 3: backend-spec
- 입력: `docs/specs/01-product-requirements.md`, `docs/specs/02-system-architecture.md`
- 출력: `docs/specs/03-db-schema.md`, `docs/specs/04-api-spec.md`
- 에이전트: `backend-spec`

### Step 4: frontend-spec
- 입력: `docs/specs/01-product-requirements.md`, `docs/specs/02-system-architecture.md`, `docs/specs/04-api-spec.md`
- 출력: `docs/specs/05-ui-ux-spec.md`
- 에이전트: `frontend-spec`

### Step 5: reviewer
- 입력: `docs/specs/01~05` 전체
- 출력: `docs/specs/06-review-report.md`, `docs/specs/07-final-dev-spec.md`
- 에이전트: `reviewer`

## 운영 규칙

- 구체적으로 작성할 것 (모호한 표현 금지)
- 불필요한 내용 제거
- 구현 가능한 수준의 출력
- MVP를 현실적으로 유지
- 모호한 부분은 가정을 명시적으로 문서화
- 백엔드와 프론트엔드 용어를 일관되게 유지

## 완료 후

모든 문서가 생성되면 사용자에게 결과를 요약하여 보고하세요:
- 생성된 파일 목록
- 주요 리뷰 이슈 (06-review-report.md 기반)
- 최종 명세 핵심 요약 (07-final-dev-spec.md 기반)
