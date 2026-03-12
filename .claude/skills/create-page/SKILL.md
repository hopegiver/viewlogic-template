---
name: create-page
description: "새 페이지(view + logic) 생성. 정적, 목록, 상세, 폼 4가지 변형 중 선택."
argument-hint: "경로 설명"
---

$ARGUMENTS 에서 페이지 경로와 설명을 파악하세요. 예: "goals/my-goals 목표 관리 페이지"

## 절차

1. 사용자에게 다음을 확인:
   - 페이지 경로/이름 (예: `goals/my-goals`)
   - 페이지 설명 (어떤 기능의 페이지인지)
   - 레이아웃 (`default` 또는 `null`)
   - 필요한 컴포넌트 (Table, Loading 등)

2. `.claude/templates/page.md` 참조하여 적절한 변형 선택:
   - 기본 페이지 (정적) → mock-api 불필요
   - 목록 페이지 (데이터 + 로딩) → `mock-api/{resource}.json` 생성
   - 상세 페이지 (파라미터) → 목록과 같은 mock-api JSON 사용
   - 폼 페이지 (생성/수정) → 수정 시 목록과 같은 mock-api JSON 사용

3. 데이터가 필요한 페이지는 `mock-api/{resource}.json` 파일을 함께 생성
   - `.claude/templates/page.md`의 "Mock 데이터 규칙" 섹션 참조
   - JS에서 `fetch('mock-api/...')`로 로드, TODO 주석으로 실제 API 코드 포함

4. `src/views/{path}.html` + `src/logic/{path}.js` 쌍으로 생성

5. 로딩/에러/폼 패턴이 필요하면 `docs/patterns.md` 참조
