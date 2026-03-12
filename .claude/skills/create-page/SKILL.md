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
   - 기본 페이지 (정적)
   - 목록 페이지 (API + 로딩)
   - 상세 페이지 (파라미터)
   - 폼 페이지 (생성/수정)

3. `src/views/{path}.html` + `src/logic/{path}.js` 쌍으로 생성

4. 로딩/에러/폼 패턴이 필요하면 `docs/patterns.md` 참조
