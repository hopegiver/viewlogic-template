---
name: create-layout
description: 새 레이아웃 생성. 네비게이션, 사이드바 2가지 변형 중 선택.
argument-hint: "레이아웃명 설명"
---

$ARGUMENTS 에서 레이아웃 이름과 설명을 파악하세요. 예: "admin 관리자용 사이드바 레이아웃"

## 절차

1. 사용자에게 다음을 확인:
   - 레이아웃 이름 (예: `admin`, `minimal`)
   - 레이아웃 구조 설명 (사이드바, 헤더, 푸터 등)
   - 네비게이션 메뉴 항목

2. `.claude/templates/layout.md` 참조하여 적절한 변형 선택:
   - 기본 레이아웃 (상단 네비게이션 + 푸터)
   - 사이드바 레이아웃 (관리자용)

3. `src/views/layout/{name}.html` + `src/logic/layout/{name}.js` (선택) 생성

4. `{{ content }}` 플레이스홀더를 반드시 포함

5. 페이지에서 사용: `layout: '{name}'`
