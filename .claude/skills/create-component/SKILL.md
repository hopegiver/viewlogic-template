---
name: create-component
description: 새 재사용 컴포넌트 생성. 기본, 슬롯, v-model 3가지 변형 중 선택.
argument-hint: "컴포넌트명 설명"
---

$ARGUMENTS 에서 컴포넌트 이름과 설명을 파악하세요. 예: "StatusBadge 상태 표시 배지"

## 절차

1. 사용자에게 다음을 확인:
   - 컴포넌트 이름 (PascalCase, 예: `StatusBadge`)
   - 용도 및 기능 설명
   - 필요한 props
   - 발생시킬 이벤트 (emits)

2. `.claude/templates/component.md` 참조하여 적절한 변형 선택:
   - 기본 컴포넌트 (props + emit)
   - 슬롯 포함 컴포넌트 (래퍼)
   - v-model 지원 컴포넌트 (양방향 바인딩)

3. `src/components/{Name}.js` 생성 (PascalCase)

4. 사용할 페이지에서 `components: ['Name']`으로 등록 안내
