---
name: spec-start
description: "개발 문서 세트(PRD, 아키텍처, DB 스키마, API 스펙, 프론트엔드 스펙, 리뷰, 최종 명세) 전체 생성. 명시적 호출 전용."
argument-hint: "(인자 없음)"
user-invocable: true
---

$ARGUMENTS 는 무시하세요. 이 스킬은 인자 없이 실행됩니다.

## 목적

`docs/specs/00-business-brief.md`를 입력으로 받아, 에이전트 파이프라인을 순서대로 실행하여 개발 문서 세트를 생성합니다. 각 에이전트 출력 후 **spec-lint**가 기계적 검증을 수행하고, **reviewer**가 논리적 리뷰를 수행합니다.

## 사전 조건

- `docs/specs/00-business-brief.md`에 비즈니스 아이디어가 작성되어 있어야 합니다.
- 파일이 비어 있거나 템플릿 상태이면, 사용자에게 먼저 작성하라고 안내하고 중단하세요.

## 출력 검증 규칙 (모든 Step에 적용)

각 에이전트 실행 후 **반드시** 아래 검증을 수행하세요:

1. 출력 파일이 존재하는지 확인 (Glob으로 파일 존재 여부 체크)
2. 메인 파일이 분할 파일을 참조하는 경우(예: `11-*.md`, `31-*.md`), 참조된 모든 분할 파일의 존재도 Glob으로 검증한다
3. 출력 파일의 내용이 10줄 이상인지 확인 (Read로 내용 확인)
4. 출력 파일이 에러 메시지만 포함하고 있지 않은지 확인

검증 실패 시:
- 해당 에이전트를 **1회 재실행**한다
- 재실행 후에도 검증 실패 시 사용자에게 오류를 보고하고 **파이프라인을 중단**한다
- 중단 메시지에 실패한 에이전트명, 예상 출력 파일, 실패 원인을 포함한다

## spec-lint 규칙 (Step 1~5, Step 7에 적용)

각 에이전트의 출력 검증 통과 후, **spec-lint** 에이전트를 실행하여 기계적 검증을 수행한다.

### spec-lint 호출 방법

spec-lint 에이전트에 아래 정보를 프롬프트로 전달한다:
- **target**: 검증할 문서 경로(들)
- **agent**: 문서를 생산한 에이전트명
- **glossary_path**: `docs/specs/10-product-requirements.md` (planner 이후 단계에서만)

### spec-lint 결과 처리

1. `docs/specs/.lint-result.md`를 Read로 읽는다
2. **Status: PASS, WARNING 없음** → 다음 Step으로 진행
3. **Status: PASS, WARNING 있음** → spec-lint를 `mode: fix`로 실행하여 WARNING 자동 수정 → 다음 Step으로 진행
4. **Status: FAIL** → 아래 절차 수행:
   a. 린트 위반 내용을 해당 에이전트의 프롬프트에 추가하여 **1회 재실행** (⚠️ patch 모드 — 아래 "에이전트 재실행 규칙" 참조)
   b. 재실행 후 출력 검증 수행
   c. 재실행 후 spec-lint를 다시 실행
   d. 2차 lint PASS + WARNING 있음 → spec-lint `mode: fix`로 WARNING 자동 수정
   e. 2차 lint도 FAIL → 사용자에게 경고를 보고하되 **파이프라인은 계속 진행** (reviewer가 최종 검증)

## 실행 순서

아래 순서대로 에이전트를 호출하세요. 각 단계는 이전 단계의 출력에 의존하므로 **반드시 순차 실행**합니다.

### Step 1: planner
- 입력: `docs/specs/00-business-brief.md`
- 출력: `docs/specs/10-product-requirements.md` (분할 시 `11-*.md`, `12-*.md`, ...)
- 에이전트: `planner`
- ✅ 출력 검증 수행
- 🔍 spec-lint 실행 (agent: `planner`, target: `docs/specs/10-product-requirements.md`)

### Step 1a: PRD 사용자 확인 체크포인트

Planner 출력 및 lint 통과 후, 파이프라인을 **일시 정지**하고 사용자에게 PRD 구조를 확인받는다.

**절차:**

1. `docs/specs/10-product-requirements.md`(및 분할 파일)에서 다음 정보를 추출하여 사용자에게 보고한다:
   - **모듈 목록**: Functional Requirements에서 도출된 모듈명들
   - **핵심 시나리오 수**: Core User Scenarios 개수와 각 시나리오 제목
   - **사용자 역할**: Target Users에서 정의된 역할명들
   - **Domain Glossary 주요 용어**: 용어집의 핵심 항목 (5~10개)
   - **MVP 범위**: Out of Scope에 명시된 주요 제외 항목

2. 사용자에게 다음과 같이 확인을 요청한다:

   > **PRD 구조 확인 요청**
   >
   > 위 PRD 구조를 기반으로 아키텍처, DB 스키마, API, UI 스펙이 생성됩니다.
   > 이후 단계에서 변경하면 비용이 크므로, 지금 확인해 주세요.
   >
   > - 모듈 구성이 적절한가요?
   > - 누락된 시나리오나 역할이 있나요?
   > - 용어 정의가 정확한가요?
   > - MVP 범위가 맞나요?

3. 사용자 응답 처리:
   - **"확인" / "진행" / 수정 없음** → Step 2로 진행
   - **수정 피드백 제공** → planner를 사용자 피드백과 함께 재실행한다. ⚠️ **patch 모드 적용** — "에이전트 재실행 규칙" 섹션의 필수 지시를 프롬프트에 포함한다. 재실행 프롬프트에 원래 입력 + 사용자 피드백을 모두 포함한다. 재실행 후 출력 검증 + spec-lint를 다시 수행한다. 수정된 PRD 요약을 사용자에게 다시 보고하고 확인을 받는다 (이 확인 루프는 **최대 2회**).

### Step 2: architect
- 입력: `docs/specs/10-product-requirements.md`
- 출력: `docs/specs/20-system-architecture.md` (분할 시 `21-*.md`, `22-*.md`, ...)
- 에이전트: `architect`
- ✅ 출력 검증 수행
- 🔍 spec-lint 실행 (agent: `architect`, target: `docs/specs/20-system-architecture.md`, glossary_path: `docs/specs/10-product-requirements.md`)

### Step 2a: 아키텍처 사용자 확인 체크포인트

Architect 출력 및 lint 통과 후, 파이프라인을 **일시 정지**하고 사용자에게 아키텍처 구조를 확인받는다.

**절차:**

1. `docs/specs/20-system-architecture.md`(및 분할 파일)에서 다음 정보를 추출하여 사용자에게 보고한다:
   - **시스템 스타일**: 모놀리스/모듈러 모놀리스/마이크로서비스 선택과 근거
   - **모듈 목록 및 경계**: Major Components에서 도출된 모듈과 각 책임 범위
   - **도메인 모델**: Core Entity와 주요 관계 (Domain Model 테이블 요약)
   - **API 설계 규칙**: Base path, 페이지네이션, 정렬, ID 포맷 등 확정된 규칙
   - **배포 구성**: Deployment View의 주요 인프라 컴포넌트
   - **보안 모델**: 인증/인가 방식 (JWT, RBAC 등)

2. 사용자에게 다음과 같이 확인을 요청한다:

   > **아키텍처 구조 확인 요청**
   >
   > 위 아키텍처를 기반으로 DB 스키마, API, UI 스펙이 생성됩니다.
   > 이후 단계에서 아키텍처를 변경하면 비용이 크므로, 지금 확인해 주세요.
   >
   > - 시스템 스타일 선택이 적절한가요?
   > - 모듈 구성과 경계가 맞나요?
   > - 도메인 모델에 누락된 엔티티가 있나요?
   > - API 설계 규칙이 적합한가요?
   > - 배포/보안 구성에 문제가 없나요?

3. 사용자 응답 처리:
   - **"확인" / "진행" / 수정 없음** → Step 3으로 진행
   - **수정 피드백 제공** → architect를 사용자 피드백과 함께 재실행한다. ⚠️ **patch 모드 적용** — "에이전트 재실행 규칙" 섹션의 필수 지시를 프롬프트에 포함한다. 재실행 프롬프트에 원래 입력 + 사용자 피드백을 모두 포함한다. 재실행 후 출력 검증 + spec-lint를 다시 수행한다. 수정된 아키텍처 요약을 사용자에게 다시 보고하고 확인을 받는다 (이 확인 루프는 **최대 2회**).

### Step 3: db-schema-spec
- 입력: `docs/specs/10-product-requirements.md`, `docs/specs/20-system-architecture.md`
- 출력: `docs/specs/30-db-schema.md` (분할 시 `31-*.md`, `32-*.md`, ...)
- 에이전트: `db-schema-spec`
- ✅ 출력 검증 수행
- 🔍 spec-lint 실행 (agent: `db-schema-spec`, target: `docs/specs/30-db-schema.md`, glossary_path: `docs/specs/10-product-requirements.md`)

### Step 4: api-spec
- 입력: `docs/specs/10-product-requirements.md`, `docs/specs/20-system-architecture.md`, `docs/specs/30-db-schema.md`
- 출력: `docs/specs/40-api-spec.md` (분할 시 `41-*.md`, `42-*.md`, ...)
- 에이전트: `api-spec`
- ✅ 출력 검증 수행
- 🔍 spec-lint 실행 (agent: `api-spec`, target: `docs/specs/40-api-spec.md`, glossary_path: `docs/specs/10-product-requirements.md`)

### Step 5: frontend-spec
- 입력: `docs/specs/10-product-requirements.md`, `docs/specs/20-system-architecture.md`, `docs/specs/40-api-spec.md`
- 출력: `docs/specs/50-ui-ux-spec.md` (분할 시 `51-*.md`, `52-*.md`, ...)
- 에이전트: `frontend-spec`
- ✅ 출력 검증 수행
- 🔍 spec-lint 실행 (agent: `frontend-spec`, target: `docs/specs/50-ui-ux-spec.md`, glossary_path: `docs/specs/10-product-requirements.md`)

### Step 5a: API Gap Resolution (조건부 실행)

frontend-spec 완료 및 spec-lint 통과 후, `50-ui-ux-spec.md`(또는 분할 파일)의 **"## 12. API Gap Report"** 섹션에서 JSON 코드 블록을 파싱한다.

**JSON 파싱 방법:**
1. `50-ui-ux-spec.md`(또는 분할 파일)에서 `## 12. API Gap Report` 섹션을 찾는다
2. 해당 섹션 내의 ` ```json ` 코드 블록을 추출한다
3. JSON을 파싱하여 `has_gaps`, `gaps` 필드를 읽는다
4. JSON 파싱 실패 시, 사용자에게 경고를 보고하고 Step 6으로 진행한다

**분기 처리:**

1. **`has_gaps: false`인 경우** → Step 6으로 직행

2. **`has_gaps: true`인 경우** → 아래 재실행 절차 수행:

   a. `gaps` 배열의 모든 gap은 `missing_endpoint` 또는 `missing_field` 타입이다 → `api-spec` 재실행 대상

   b. `api-spec`을 재실행한다:
      - ⚠️ **patch 모드 적용** — "에이전트 재실행 규칙" 섹션의 필수 지시를 프롬프트에 포함한다
      - 재실행 시, 원래 입력 파일 + gap 내용을 프롬프트에 추가하여 호출한다
      - 예: "다음 API gap이 frontend-spec에서 보고되었습니다. 기존 문서를 Read한 뒤 해당 엔드포인트/필드를 Edit으로 추가하세요: {gaps 내용}"
      - 재실행 후 출력 검증 + spec-lint를 수행한다

   c. 백엔드 에이전트 재실행이 완료되면 **frontend-spec을 재실행**한다:
      - 재실행 시 갱신된 `40-api-spec.md`와 기존 입력(`10-product-requirements.md`, `20-system-architecture.md`)을 전달한다
      - 재실행 후 출력 검증 + spec-lint를 수행한다

   d. 재실행된 frontend-spec의 API Gap Report를 다시 확인한다:
      - `has_gaps: false` → Step 6으로 진행
      - `has_gaps: true` → 사용자에게 잔여 gap을 보고하되, **Step 6은 계속 진행**한다 (reviewer가 최종 검증)

   **API Gap Resolution은 최대 1회**. 무한 루프를 방지한다.

### Step 6: reviewer
- 입력: `docs/specs/10~50` 전체
- 출력: `docs/specs/60-review-report.md` (분할 시 `61-*.md`, ...)
- 에이전트: `reviewer`
- ✅ 출력 검증 수행
- ⚠️ reviewer는 **논리적 리뷰만** 수행 (기계적 검증은 spec-lint가 이미 완료)

### Step 6a: 리뷰 루프 (조건부 실행)

reviewer 완료 후 `docs/specs/60-review-report.md`의 **"Re-run Verdict"** 섹션에서 JSON 코드 블록을 파싱하여 아래 절차를 따르세요.

**JSON 파싱 방법:**
1. `60-review-report.md`(또는 분할 파일)에서 `### Re-run Verdict` 섹션을 찾는다
2. 해당 섹션 내의 ` ```json ` 코드 블록을 추출한다
3. JSON을 파싱하여 `has_critical`, `rerun_agents`, `fix_instructions` 필드를 읽는다
4. JSON 파싱 실패 시, 사용자에게 경고를 보고하고 Step 7로 진행한다 (파이프라인 중단하지 않음)

**분기 처리:**

1. **`has_critical: false`인 경우** → Step 7로 직행

2. **`has_critical: true`인 경우** → 아래 재실행 절차 수행:

   a. `rerun_agents` 배열의 에이전트 목록을 확인한다

   b. 대상 에이전트를 **원래 파이프라인 순서대로** 재실행한다 (planner → architect → db-schema-spec → api-spec → frontend-spec)
      - ⚠️ **patch 모드 적용** — "에이전트 재실행 규칙" 섹션의 필수 지시를 프롬프트에 포함한다
      - 각 에이전트 재실행 시, 해당 에이전트의 원래 입력 파일 + `fix_instructions`에서 해당 에이전트의 수정 지시를 프롬프트에 추가하여 호출한다
      - 각 재실행 후 출력 검증 + spec-lint를 수행한다

   c. 재실행이 완료되면 **reviewer를 다시 실행**한다 (2차 리뷰)
      - 2차 리뷰 출력도 `docs/specs/60-review-report.md`에 덮어쓴다

   d. 2차 리뷰의 Re-run Verdict JSON을 파싱한다:
      - `has_critical: false` → Step 7로 진행
      - `has_critical: true` → 사용자에게 잔여 Critical 이슈를 보고하고, **Step 7은 계속 진행**한다 (finalizer가 최선을 다해 해결하도록 함)

   **재실행은 최대 1회**. 무한 루프를 방지한다.

### Step 7: finalizer
- 입력: `docs/specs/10~60` 전체
- 출력: `docs/specs/70-final-dev-spec.md` (분할 시 `71-*.md`, ...)
- 에이전트: `finalizer`
- ✅ 출력 검증 수행
- 🔍 spec-lint 실행 (agent: `finalizer`, target: `docs/specs/70-final-dev-spec.md`, glossary_path: `docs/specs/10-product-requirements.md`)

## 에이전트 재실행 규칙 (patch 모드)

**모든 에이전트 재실행**은 아래 규칙을 따른다. 이 규칙은 spec-lint FAIL 재실행, API Gap Resolution 재실행, 리뷰 루프 재실행, 사용자 피드백 재실행 모두에 적용된다.

### 재실행 프롬프트 필수 지시

재실행 시 에이전트 프롬프트에 다음 지시를 **반드시 포함**한다:

```
⚠️ PATCH MODE — 기존 문서 수정 전용
1. 먼저 기존 출력 파일을 Read로 읽는다
2. 수정이 필요한 부분만 Edit 도구로 변경한다
3. Write로 전체 문서를 재생성하지 않는다
4. 수정 범위: 아래 fix_instructions에 해당하는 부분만
```

### 이유

- 전체 Write 재생성은 정상 부분에 새 문제를 유입시킬 위험이 있다
- Edit 기반 부분 수정은 변경 범위를 최소화하고 비용을 절감한다
- 이미 spec-lint를 통과한 섹션을 다시 생성할 필요가 없다

### 예외

- 기존 출력 파일이 존재하지 않거나, 10줄 미만의 에러 파일인 경우 → Write로 전체 생성 (첫 실행과 동일)
- 수정 범위가 문서의 50% 이상인 경우 → Write로 전체 재생성 허용

## 운영 규칙

- 구체적으로 작성할 것 (모호한 표현 금지)
- 불필요한 내용 제거
- 구현 가능한 수준의 출력
- MVP를 현실적으로 유지
- 모호한 부분은 가정을 명시적으로 문서화
- **용어 일관성은 spec-lint가 자동 검증 및 자동 수정 (fix 모드)**. 수동 확인은 불필요

## 완료 후

모든 문서가 생성되면 사용자에게 결과를 요약하여 보고하세요:
- 생성된 파일 목록
- PRD 사용자 확인 결과 (수정 여부, 수정 횟수)
- 아키텍처 사용자 확인 결과 (수정 여부, 수정 횟수)
- 각 Step의 spec-lint 결과 요약 (Step 1~5 + Step 7) (PASS/FAIL, 재실행 여부)
- API Gap Resolution 결과 (Step 5a): gap 존재 여부, 재실행된 에이전트, 해결된 gap 수
- 리뷰 루프 실행 여부 및 결과 (재실행된 에이전트, 해결된 Critical 이슈 수)
- 잔여 Critical 이슈 (있는 경우)
- 주요 리뷰 이슈 (60-review-report.md 기반)
- 최종 명세 핵심 요약 (70-final-dev-spec.md 기반)
