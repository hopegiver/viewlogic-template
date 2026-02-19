// src/logic/layout/{layout-name}.js
// 레이아웃 JavaScript 템플릿

export default {
    name: 'layoutName',

    data() {
        return {
            // 레이아웃 전역 데이터
            // menuItems: [],
            // isMenuOpen: false
        }
    },

    mounted() {
        // 레이아웃 초기화
        console.log('Layout mounted');
    },

    methods: {
        // 레이아웃 공통 메서드
        // toggleMenu() {
        //     this.isMenuOpen = !this.isMenuOpen;
        // }
    }
}
