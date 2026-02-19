// src/components/ComponentName.js
// 컴포넌트 템플릿

export default {
    name: 'ComponentName',

    props: {
        // 필수 props
        title: {
            type: String,
            required: true
        },
        // 선택 props (기본값 포함)
        variant: {
            type: String,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    // 부모에게 보낼 이벤트 선언
    emits: ['click', 'change'],

    data() {
        return {
            // 컴포넌트 내부 상태
        }
    },

    computed: {
        classes() {
            return ['component-name', `variant-${this.variant}`];
        }
    },

    methods: {
        handleClick(event) {
            if (!this.disabled) {
                this.$emit('click', event);
            }
        }
    },

    template: `
        <div :class="classes">
            <h3>{{ title }}</h3>
            <slot></slot>
            <button
                class="btn btn-primary"
                :disabled="disabled"
                @click="handleClick">
                <slot name="button-text">클릭</slot>
            </button>
        </div>
    `
}
