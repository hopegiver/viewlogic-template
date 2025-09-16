/**
 * Pagination Component
 * Page navigation
 */
export default {
    name: 'Pagination',
    template: `
        <nav class="pagination-wrapper" :class="wrapperClasses">
            <div v-if="showInfo" class="pagination-info">
                <slot name="info">
                    {{ infoText }}
                </slot>
            </div>
            
            <ul class="pagination" :class="paginationClasses">
                <!-- First page -->
                <li v-if="showFirstLast" class="pagination-item">
                    <button
                        class="pagination-link"
                        :disabled="currentPage === 1"
                        @click="goToPage(1)"
                        :aria-label="'Go to first page'"
                    >
                        ««
                    </button>
                </li>
                
                <!-- Previous page -->
                <li class="pagination-item">
                    <button
                        class="pagination-link"
                        :disabled="currentPage === 1"
                        @click="goToPage(currentPage - 1)"
                        :aria-label="'Go to previous page'"
                    >
                        ‹
                    </button>
                </li>
                
                <!-- Start ellipsis -->
                <li v-if="showStartEllipsis" class="pagination-item pagination-ellipsis">
                    <span class="pagination-link">…</span>
                </li>
                
                <!-- Page numbers -->
                <li
                    v-for="page in visiblePages"
                    :key="page"
                    class="pagination-item"
                    :class="{ 'pagination-active': page === currentPage }"
                >
                    <button
                        class="pagination-link"
                        @click="goToPage(page)"
                        :aria-label="'Go to page ' + page"
                        :aria-current="page === currentPage ? 'page' : null"
                    >
                        {{ page }}
                    </button>
                </li>
                
                <!-- End ellipsis -->
                <li v-if="showEndEllipsis" class="pagination-item pagination-ellipsis">
                    <span class="pagination-link">…</span>
                </li>
                
                <!-- Next page -->
                <li class="pagination-item">
                    <button
                        class="pagination-link"
                        :disabled="currentPage === totalPages"
                        @click="goToPage(currentPage + 1)"
                        :aria-label="'Go to next page'"
                    >
                        ›
                    </button>
                </li>
                
                <!-- Last page -->
                <li v-if="showFirstLast" class="pagination-item">
                    <button
                        class="pagination-link"
                        :disabled="currentPage === totalPages"
                        @click="goToPage(totalPages)"
                        :aria-label="'Go to last page'"
                    >
                        »»
                    </button>
                </li>
            </ul>
            
            <!-- Page size selection -->
            <div v-if="showPageSize" class="pagination-page-size">
                <label class="pagination-page-size-label">
                    Items per page:
                    <select v-model="localPageSize" @change="handlePageSizeChange" class="pagination-page-size-select">
                        <option v-for="size in pageSizeOptions" :key="size" :value="size">
                            {{ size }}
                        </option>
                    </select>
                </label>
            </div>
        </nav>
    `,
    emits: ['update:modelValue', 'change', 'page-change'],
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        totalPages: {
            type: Number,
            required: true
        },
        totalItems: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        maxVisiblePages: {
            type: Number,
            default: 5
        },
        size: {
            type: String,
            default: 'medium',
            validator: (value) => ['small', 'medium', 'large'].includes(value)
        },
        variant: {
            type: String,
            default: 'default',
            validator: (value) => ['default', 'outline', 'minimal'].includes(value)
        },
        showFirstLast: {
            type: Boolean,
            default: true
        },
        showInfo: {
            type: Boolean,
            default: false
        },
        showPageSize: {
            type: Boolean,
            default: false
        },
        pageSizeOptions: {
            type: Array,
            default: () => [10, 20, 50, 100]
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            localPageSize: this.pageSize
        };
    },
    computed: {
        wrapperClasses() {
            return [
                'pagination-wrapper',
                `pagination-size-${this.size}`,
                {
                    'pagination-disabled': this.disabled
                }
            ];
        },
        paginationClasses() {
            return [
                'pagination',
                `pagination-${this.variant}`
            ];
        },
        visiblePages() {
            const total = this.totalPages;
            const current = this.currentPage;
            const max = this.maxVisiblePages;
            
            if (total <= max) {
                return Array.from({ length: total }, (_, i) => i + 1);
            }
            
            const half = Math.floor(max / 2);
            let start = Math.max(1, current - half);
            let end = Math.min(total, start + max - 1);
            
            if (end - start + 1 < max) {
                start = Math.max(1, end - max + 1);
            }
            
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },
        showStartEllipsis() {
            return this.visiblePages[0] > 2;
        },
        showEndEllipsis() {
            return this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1;
        },
        infoText() {
            const start = (this.currentPage - 1) * this.localPageSize + 1;
            const end = Math.min(start + this.localPageSize - 1, this.totalItems);
            return `${start}-${end} / Total ${this.totalItems} items`;
        }
    },
    methods: {
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages && page !== this.currentPage && !this.disabled) {
                this.$emit('page-change', page);
            }
        },
        handlePageSizeChange() {
            this.$emit('page-size-change', this.localPageSize);
        }
    },
    watch: {
        pageSize(newValue) {
            this.localPageSize = newValue;
        }
    }
}