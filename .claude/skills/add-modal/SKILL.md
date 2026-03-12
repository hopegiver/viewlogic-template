---
name: add-modal
description: 기존 페이지에 Bootstrap 모달 다이얼로그 추가. 폼, 삭제 확인, 상세 보기 변형 지원.
---

기존 페이지에 Bootstrap 모달 다이얼로그를 추가한다.

## 사용자 입력 수집

AskUserQuestion으로 다음을 확인:
- **대상 페이지** (예: users/list)
- **모달 용도** (확인, 폼 입력, 상세 보기, 삭제 확인)
- **모달 제목** (예: 사용자 추가)

## 구현 절차

### view 파일에 모달 HTML 추가

```html
<div class="modal fade" id="{modalId}Modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{모달 제목}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- 모달 내용 -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">취소</button>
                <button type="button" class="btn btn-primary" @click="handleConfirm">확인</button>
            </div>
        </div>
    </div>
</div>
```

### logic 파일 수정

```javascript
// data()에 추가
{modalId}Modal: null

// mounted()에 추가 (반드시 $nextTick 내에서)
this.$nextTick(() => {
    this.{modalId}Modal = new bootstrap.Modal(
        document.getElementById('{modalId}Modal')
    );
});

// beforeUnmount()에 추가
if (this.{modalId}Modal) {
    this.{modalId}Modal.dispose();
}

// methods에 추가
open{ModalName}() { this.{modalId}Modal.show(); },
close{ModalName}() { this.{modalId}Modal.hide(); }
```

## 모달 변형

| 변형 | 특징 |
|------|------|
| **폼 모달** | modal-body 내 `<form @submit.prevent>`, 밸리데이션 포함 |
| **삭제 확인** | `selectedItem` data, 확인 버튼에 `btn-danger`, API DELETE 후 목록 갱신 |
| **상세 보기** | `selectedItem` data, `modal-lg` 클래스, 푸터에 닫기 버튼만 |

## 참조 문서
- `docs/patterns.md` - 폼 밸리데이션, 에러 처리 패턴
