export default {
    name: 'ComponentsPage',

    data() {
        return {
            pageTitle: 'ViewLogic Components',
            pageSubtitle: 'Comprehensive library of 25 pre-built UI components',
            activeCategory: 'all',
            demoComponent: null,
            demoInputValue: '',
            showModal: false,
            activeTab: 'tab1',

            categories: [
                { id: 'all', name: 'All Components', icon: '📦' },
                { id: 'form', name: 'Form Controls', icon: '📝' },
                { id: 'layout', name: 'Layout', icon: '🏗️' },
                { id: 'feedback', name: 'Feedback', icon: '💬' },
                { id: 'navigation', name: 'Navigation', icon: '🧭' },
                { id: 'data', name: 'Data Display', icon: '📊' },
                { id: 'utility', name: 'Utility', icon: '⚙️' }
            ],

            components: [
                {
                    name: 'Accordion',
                    category: 'layout',
                    description: 'Collapsible content sections with expand/collapse functionality',
                    preview: `
                        <div style="max-width: 400px;">
                            <div style="border: 1px solid #e9ecef; border-radius: 6px;">
                                <div style="padding: 15px; border-bottom: 1px solid #e9ecef; cursor: pointer; background: #f8f9fa;">
                                    <strong>Section 1</strong> <span style="float: right;">›</span>
                                </div>
                                <div style="padding: 15px; background: white;">
                                    <p style="margin: 0;">This is the content of section 1.</p>
                                </div>
                                <div style="padding: 15px; border-top: 1px solid #e9ecef; cursor: pointer;">
                                    <strong>Section 2</strong> <span style="float: right;">›</span>
                                </div>
                            </div>
                        </div>
                    `,
                    usage: `<Accordion
    :items="accordionItems"
    :multiple="false"
    v-model="activeAccordion"
>
    <template #content-0="{ item }">
        <p>Custom content for {{ item.title }}</p>
    </template>
</Accordion>

<!-- Data structure -->
const accordionItems = [
    { title: 'Section 1', content: 'Content 1', icon: '📝' },
    { title: 'Section 2', content: 'Content 2', badge: 'New' }
];`,
                    props: [
                        { name: 'items', type: 'Array', default: '[]', description: 'Array of accordion items with title, content, icon, badge' },
                        { name: 'modelValue', type: 'Number|Array', default: 'null', description: 'Active accordion index(es)' },
                        { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple sections open' },
                        { name: 'collapsible', type: 'Boolean', default: 'true', description: 'Allow sections to be collapsed' },
                        { name: 'variant', type: 'String', default: 'default', description: 'Accordion style variant' }
                    ]
                },
                {
                    name: 'Alert',
                    category: 'feedback',
                    description: 'Display important messages and notifications with various types',
                    preview: `
                        <div style="max-width: 400px;">
                            <div style="background: #d1ecf1; color: #0c5460; padding: 12px; border-radius: 4px; border-left: 4px solid #17a2b8;">
                                <strong>Info:</strong> This is an informational alert message.
                            </div>
                        </div>
                    `,
                    usage: `<Alert type="info" title="Information" :closable="true">
    This is an informational alert message.
</Alert>

<Alert type="success" title="Success" :show-icon="true">
    Operation completed successfully!
</Alert>

<Alert type="warning" title="Warning">
    Please check your input and try again.
</Alert>`,
                    props: [
                        { name: 'type', type: 'String', default: 'info', description: 'Alert type (success, error, warning, info)' },
                        { name: 'title', type: 'String', default: '""', description: 'Alert title' },
                        { name: 'closable', type: 'Boolean', default: 'false', description: 'Show close button' },
                        { name: 'showIcon', type: 'Boolean', default: 'true', description: 'Show type icon' },
                        { name: 'banner', type: 'Boolean', default: 'false', description: 'Display as banner style' }
                    ]
                },
                {
                    name: 'Badge',
                    category: 'data',
                    description: 'Display status, counts, or labels with various styles and colors',
                    preview: `
                        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                            <span style="background: #007bff; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">Primary</span>
                            <span style="background: #28a745; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">Success</span>
                            <span style="background: #dc3545; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">9</span>
                            <span style="background: #ffc107; color: #212529; padding: 4px 8px; border-radius: 12px; font-size: 12px;">New</span>
                        </div>
                    `,
                    usage: `<Badge text="Primary" variant="primary" />
<Badge text="Success" variant="success" />
<Badge text="9" variant="danger" shape="pill" />
<Badge text="New" variant="warning" :closable="true" />

<!-- With icon -->
<Badge text="Active" variant="success" icon="✓" />

<!-- Dot badge -->
<Badge variant="danger" size="small" shape="pill" />`,
                    props: [
                        { name: 'text', type: 'String', default: '""', description: 'Badge text content' },
                        { name: 'variant', type: 'String', default: 'primary', description: 'Badge color variant (primary, secondary, success, warning, danger, info)' },
                        { name: 'size', type: 'String', default: 'medium', description: 'Badge size (small, medium, large)' },
                        { name: 'shape', type: 'String', default: 'rounded', description: 'Badge shape (rounded, pill, square)' },
                        { name: 'icon', type: 'String', default: '""', description: 'Icon to display in badge' },
                        { name: 'closable', type: 'Boolean', default: 'false', description: 'Show close button' }
                    ]
                },
                {
                    name: 'Breadcrumb',
                    category: 'navigation',
                    description: 'Display current page location within navigation hierarchy',
                    preview: `
                        <div style="max-width: 400px;">
                            <nav style="padding: 8px 0;">
                                <span style="color: #6c757d;">🏠</span>
                                <span style="margin: 0 8px; color: #6c757d;">></span>
                                <span style="color: #6c757d;">Products</span>
                                <span style="margin: 0 8px; color: #6c757d;">></span>
                                <span style="color: #007bff; font-weight: 500;">Laptops</span>
                            </nav>
                        </div>
                    `,
                    usage: `<Breadcrumb :items="breadcrumbItems" separator=">" home-icon="🏠" />

<!-- Data structure -->
const breadcrumbItems = [
    { label: 'Home', route: 'home' },
    { label: 'Products', route: 'products' },
    { label: 'Laptops', route: 'products/laptops' },
    { label: 'MacBook Pro' } // Current page (no route)
];`,
                    props: [
                        { name: 'items', type: 'Array', default: '[]', description: 'Array of breadcrumb items with label and optional route' },
                        { name: 'separator', type: 'String', default: '/', description: 'Separator between breadcrumb items' },
                        { name: 'homeIcon', type: 'String', default: '""', description: 'Icon for home breadcrumb' },
                        { name: 'maxItems', type: 'Number', default: '0', description: 'Maximum items to show (0 = no limit)' },
                        { name: 'showHome', type: 'Boolean', default: 'true', description: 'Show home breadcrumb' }
                    ]
                },
                {
                    name: 'Button',
                    category: 'form',
                    description: 'Versatile button component with multiple variants and sizes',
                    preview: `
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-primary">Primary</button>
                            <button class="btn btn-secondary">Secondary</button>
                            <button class="btn btn-outline">Outline</button>
                        </div>
                    `,
                    usage: `<Button variant="primary" size="medium" :loading="false" @click="handleClick">
    Click Me
</Button>

<Button variant="success" icon="✓" :disabled="false">
    Save Changes
</Button>

<Button variant="outline" size="large" block>
    Full Width Button
</Button>`,
                    props: [
                        { name: 'variant', type: 'String', default: 'primary', description: 'Button style variant (primary, secondary, success, danger, outline)' },
                        { name: 'size', type: 'String', default: 'medium', description: 'Button size (small, medium, large)' },
                        { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading spinner' },
                        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable button interaction' },
                        { name: 'block', type: 'Boolean', default: 'false', description: 'Full width button' },
                        { name: 'icon', type: 'String', default: '""', description: 'Icon to display in button' }
                    ]
                },
                {
                    name: 'Card',
                    category: 'layout',
                    description: 'Flexible content container with header, body, and footer sections',
                    preview: `
                        <div style="max-width: 300px;">
                            <div class="card card-shadow-medium">
                                <div class="card-header">
                                    <div class="card-header-content">
                                        <h5 class="card-title">Sample Card</h5>
                                        <p class="card-subtitle">Card subtitle</p>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p class="card-content">This is card content area.</p>
                                </div>
                            </div>
                        </div>
                    `,
                    usage: `<Card title="Card Title" subtitle="Card subtitle" shadow="medium" hoverable>
    <p>Card content goes here</p>

    <template #header>
        <img src="image.jpg" alt="Card image" />
    </template>

    <template #footer>
        <button class="btn btn-primary">Action</button>
    </template>
</Card>`,
                    props: [
                        { name: 'title', type: 'String', default: '""', description: 'Card header title' },
                        { name: 'subtitle', type: 'String', default: '""', description: 'Card header subtitle' },
                        { name: 'shadow', type: 'String', default: 'small', description: 'Shadow intensity (none, small, medium, large)' },
                        { name: 'hoverable', type: 'Boolean', default: 'false', description: 'Add hover effects' },
                        { name: 'clickable', type: 'Boolean', default: 'false', description: 'Make card clickable' },
                        { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading state' }
                    ]
                },
                {
                    name: 'Checkbox',
                    category: 'form',
                    description: 'Checkbox input for boolean selections with various styles',
                    preview: `
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" checked /> Checked
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" /> Unchecked
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" disabled /> Disabled
                            </label>
                        </div>
                    `,
                    usage: `<Checkbox
    v-model="agreed"
    label="I agree to the terms and conditions"
    :required="true"
/>

<Checkbox
    v-model="newsletter"
    label="Subscribe to newsletter"
    help-text="Receive updates about new features"
/>

<Checkbox
    v-model="rememberMe"
    label="Remember me"
    size="small"
/>`,
                    props: [
                        { name: 'modelValue', type: 'Boolean', default: 'false', description: 'Checkbox state' },
                        { name: 'label', type: 'String', default: '""', description: 'Checkbox label' },
                        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable checkbox' },
                        { name: 'required', type: 'Boolean', default: 'false', description: 'Mark as required field' },
                        { name: 'size', type: 'String', default: 'medium', description: 'Checkbox size (small, medium, large)' },
                        { name: 'helpText', type: 'String', default: '""', description: 'Help text below checkbox' }
                    ]
                },
                {
                    name: 'DatePicker',
                    category: 'form',
                    description: 'Date selection component with calendar interface',
                    preview: `
                        <div style="max-width: 250px;">
                            <div style="border: 1px solid #ced4da; border-radius: 4px; padding: 8px 12px; background: white; cursor: pointer;">
                                <span style="color: #6c757d;">📅 Select a date</span>
                            </div>
                        </div>
                    `,
                    usage: `<DatePicker
    v-model="selectedDate"
    placeholder="Select a date"
    :disabled-dates="disabledDates"
    format="YYYY-MM-DD"
/>

<DatePicker
    v-model="startDate"
    placeholder="Start date"
    :min-date="new Date()"
    :max-date="maxDate"
    show-time
/>`,
                    props: [
                        { name: 'modelValue', type: 'Date|String', default: 'null', description: 'Selected date value' },
                        { name: 'placeholder', type: 'String', default: 'Select a date', description: 'Placeholder text' },
                        { name: 'format', type: 'String', default: 'YYYY-MM-DD', description: 'Date format string' },
                        { name: 'minDate', type: 'Date', default: 'null', description: 'Minimum selectable date' },
                        { name: 'maxDate', type: 'Date', default: 'null', description: 'Maximum selectable date' },
                        { name: 'disabledDates', type: 'Array', default: '[]', description: 'Array of disabled dates' },
                        { name: 'showTime', type: 'Boolean', default: 'false', description: 'Include time selection' }
                    ]
                },
                {
                    name: 'DynamicInclude',
                    category: 'utility',
                    description: 'Dynamically load ViewLogic pages with parameter injection',
                    preview: `
                        <div style="text-align: center; padding: 20px; border: 2px dashed #007bff; border-radius: 8px; color: #007bff;">
                            <div style="font-size: 24px; margin-bottom: 8px;">🔄</div>
                            <div>Dynamic Content Loading</div>
                            <div style="font-size: 12px; margin-top: 4px;">Loads ViewLogic pages dynamically</div>
                        </div>
                    `,
                    usage: `<DynamicInclude
    page="login"
    :use-cache="false"
    loading-text="Loading login page..."
    wrapper-class="dynamic-content"
    :params="{
        returnUrl: '/dashboard',
        showWelcome: true,
        theme: 'compact'
    }"
/>

<DynamicInclude
    page="user-profile"
    :params="{ userId: currentUserId }"
    @loaded="onContentLoaded"
    @error="onLoadError"
/>`,
                    props: [
                        { name: 'page', type: 'String', default: '""', description: 'Page name to load dynamically' },
                        { name: 'params', type: 'Object', default: '{}', description: 'Parameters to pass to the page' },
                        { name: 'useCache', type: 'Boolean', default: 'true', description: 'Enable content caching' },
                        { name: 'loadingText', type: 'String', default: 'Loading...', description: 'Loading indicator text' },
                        { name: 'wrapperClass', type: 'String', default: '""', description: 'CSS class for wrapper element' },
                        { name: 'timeout', type: 'Number', default: '10000', description: 'Loading timeout in milliseconds' }
                    ]
                },
                {
                    name: 'FileUpload',
                    category: 'form',
                    description: 'File upload component with drag & drop support',
                    preview: `
                        <div style="max-width: 300px;">
                            <div style="border: 2px dashed #ced4da; border-radius: 8px; padding: 30px; text-align: center; background: #f8f9fa;">
                                <div style="font-size: 24px; margin-bottom: 8px;">📁</div>
                                <div style="color: #6c757d; font-size: 14px;">Drop files here or click to browse</div>
                            </div>
                        </div>
                    `,
                    usage: `<FileUpload
    v-model="uploadedFiles"
    :multiple="true"
    :max-files="5"
    :max-size="10485760"
    accept="image/*,.pdf"
    @upload="handleUpload"
    @error="handleUploadError"
>
    <template #default="{ dragActive }">
        <div class="upload-content">
            📁 {{ dragActive ? 'Drop files here' : 'Choose files' }}
        </div>
    </template>
</FileUpload>`,
                    props: [
                        { name: 'modelValue', type: 'Array', default: '[]', description: 'Array of uploaded files' },
                        { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple file selection' },
                        { name: 'accept', type: 'String', default: '""', description: 'Accepted file types' },
                        { name: 'maxFiles', type: 'Number', default: '0', description: 'Maximum number of files (0 = unlimited)' },
                        { name: 'maxSize', type: 'Number', default: '0', description: 'Maximum file size in bytes' },
                        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable file upload' }
                    ]
                },
                {
                    name: 'HtmlInclude',
                    category: 'utility',
                    description: 'Include external HTML content with XSS protection',
                    preview: `
                        <div style="text-align: center; padding: 20px; border: 2px dashed #28a745; border-radius: 8px; color: #28a745;">
                            <div style="font-size: 24px; margin-bottom: 8px;">🌐</div>
                            <div>HTML Content Inclusion</div>
                            <div style="font-size: 12px; margin-top: 4px;">Safely includes external HTML</div>
                        </div>
                    `,
                    usage: `<HtmlInclude
    src="/widgets/weather.html"
    :sanitize="true"
    :use-cache="false"
    loading-text="Loading widget..."
    wrapper-class="html-widget"
/>

<HtmlInclude
    src="/partials/footer.html"
    :sanitize="false"
    fallback="<p>Content not available</p>"
    @loaded="onHtmlLoaded"
/>`,
                    props: [
                        { name: 'src', type: 'String', default: '""', description: 'URL of HTML content to include' },
                        { name: 'sanitize', type: 'Boolean', default: 'true', description: 'Sanitize HTML content for XSS protection' },
                        { name: 'useCache', type: 'Boolean', default: 'true', description: 'Enable content caching' },
                        { name: 'loadingText', type: 'String', default: 'Loading...', description: 'Loading indicator text' },
                        { name: 'fallback', type: 'String', default: '""', description: 'Fallback content when loading fails' },
                        { name: 'wrapperClass', type: 'String', default: '""', description: 'CSS class for wrapper element' }
                    ]
                },
                {
                    name: 'Input',
                    category: 'form',
                    description: 'Enhanced input field with validation and various types',
                    preview: `
                        <div style="max-width: 300px;">
                            <div class="input-wrapper">
                                <label class="input-label">Sample Input</label>
                                <div class="input-container">
                                    <input class="input-field" placeholder="Enter text here" />
                                </div>
                            </div>
                        </div>
                    `,
                    usage: `<Input
    label="Email Address"
    type="email"
    placeholder="Enter your email"
    v-model="email"
    :required="true"
    help-text="We'll never share your email"
/>

<Input
    label="Password"
    type="password"
    v-model="password"
    show-password-toggle
    prefix-icon="🔒"
/>`,
                    props: [
                        { name: 'label', type: 'String', default: '""', description: 'Input label text' },
                        { name: 'type', type: 'String', default: 'text', description: 'Input type (text, email, password, number, etc.)' },
                        { name: 'placeholder', type: 'String', default: '""', description: 'Placeholder text' },
                        { name: 'required', type: 'Boolean', default: 'false', description: 'Mark field as required' },
                        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable input field' },
                        { name: 'helpText', type: 'String', default: '""', description: 'Help text below input' },
                        { name: 'showPasswordToggle', type: 'Boolean', default: 'false', description: 'Show password visibility toggle' },
                        { name: 'prefixIcon', type: 'String', default: '""', description: 'Icon before input text' }
                    ]
                },
                {
                    name: 'LanguageSwitcher',
                    category: 'utility',
                    description: 'Language selection component for internationalization',
                    preview: `
                        <div style="max-width: 150px;">
                            <div style="border: 1px solid #ced4da; border-radius: 4px; padding: 8px 12px; background: white; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                                <span>🌐</span>
                                <span>English</span>
                                <span style="margin-left: auto; font-size: 12px;">▼</span>
                            </div>
                        </div>
                    `,
                    usage: `<LanguageSwitcher
    v-model="currentLanguage"
    :languages="supportedLanguages"
    display-type="dropdown"
    @change="onLanguageChange"
/>

<!-- Data structure -->
const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
];`,
                    props: [
                        { name: 'modelValue', type: 'String', default: '""', description: 'Current language code' },
                        { name: 'languages', type: 'Array', default: '[]', description: 'Array of available languages' },
                        { name: 'displayType', type: 'String', default: 'dropdown', description: 'Display type (dropdown, select, inline)' },
                        { name: 'showFlag', type: 'Boolean', default: 'true', description: 'Show language flags' },
                        { name: 'size', type: 'String', default: 'medium', description: 'Component size (small, medium, large)' }
                    ]
                },
                {
                    name: 'Loading',
                    category: 'feedback',
                    description: 'Loading spinner and progress indicators',
                    preview: `
                        <div style="display: flex; gap: 20px; align-items: center;">
                            <div class="loading-spinner" style="width: 40px; height: 40px;">
                                <div class="spinner-ring" style="border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; width: 100%; height: 100%; animation: spin 1s linear infinite;"></div>
                            </div>
                            <span>Loading...</span>
                        </div>
                    `,
                    usage: `<Loading
    :loading="isLoading"
    text="Loading data..."
    size="large"
    overlay
/>

<!-- Inline loading -->
<Loading :loading="true" text="Processing..." size="small" />

<!-- Custom loading content -->
<Loading :loading="true">
    <template #spinner>
        <div class="custom-spinner">⭐</div>
    </template>
    <template #text>
        <p>Custom loading message</p>
    </template>
</Loading>`,
                    props: [
                        { name: 'loading', type: 'Boolean', default: 'true', description: 'Show loading state' },
                        { name: 'text', type: 'String', default: 'Loading...', description: 'Loading text' },
                        { name: 'size', type: 'String', default: 'medium', description: 'Spinner size (small, medium, large)' },
                        { name: 'overlay', type: 'Boolean', default: 'false', description: 'Show as full-page overlay' },
                        { name: 'cancelable', type: 'Boolean', default: 'false', description: 'Show cancel button' }
                    ]
                },
                {
                    name: 'Modal',
                    category: 'feedback',
                    description: 'Overlay dialog for displaying content above the page',
                    preview: `
                        <div style="text-align: center;">
                            <button class="btn btn-primary btn-small">Open Modal</button>
                        </div>
                    `,
                    usage: `<Modal v-model="showModal" title="Modal Title" size="medium">
    <p>Modal content goes here</p>

    <template #footer>
        <button class="btn btn-primary" @click="showModal = false">OK</button>
        <button class="btn btn-outline" @click="showModal = false">Cancel</button>
    </template>
</Modal>

<!-- Full-screen modal -->
<Modal v-model="showFullModal" size="fullscreen" :mask-closable="false">
    <h2>Full Screen Content</h2>
</Modal>`,
                    props: [
                        { name: 'modelValue', type: 'Boolean', default: 'false', description: 'Modal visibility state' },
                        { name: 'title', type: 'String', default: '""', description: 'Modal header title' },
                        { name: 'size', type: 'String', default: 'medium', description: 'Modal size (small, medium, large, extra-large, fullscreen)' },
                        { name: 'closable', type: 'Boolean', default: 'true', description: 'Show close button' },
                        { name: 'maskClosable', type: 'Boolean', default: 'true', description: 'Close when clicking outside' },
                        { name: 'centered', type: 'Boolean', default: 'true', description: 'Center modal vertically' }
                    ]
                },
                {
                    name: 'Pagination',
                    category: 'navigation',
                    description: 'Navigate through multiple pages of content',
                    preview: `
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button class="btn btn-outline btn-small" disabled>←</button>
                            <button class="btn btn-primary btn-small">1</button>
                            <button class="btn btn-outline btn-small">2</button>
                            <button class="btn btn-outline btn-small">3</button>
                            <span style="color: #6c757d; margin: 0 8px;">...</span>
                            <button class="btn btn-outline btn-small">10</button>
                            <button class="btn btn-outline btn-small">→</button>
                        </div>
                    `,
                    usage: `<Pagination
    v-model="currentPage"
    :total="totalItems"
    :page-size="pageSize"
    :show-size-changer="true"
    :show-quick-jumper="true"
    :show-total="true"
/>

<Pagination
    v-model="page"
    :total="1000"
    :page-size="20"
    size="small"
    simple
/>`,
                    props: [
                        { name: 'modelValue', type: 'Number', default: '1', description: 'Current page number' },
                        { name: 'total', type: 'Number', default: '0', description: 'Total number of items' },
                        { name: 'pageSize', type: 'Number', default: '10', description: 'Items per page' },
                        { name: 'showSizeChanger', type: 'Boolean', default: 'false', description: 'Show page size selector' },
                        { name: 'showQuickJumper', type: 'Boolean', default: 'false', description: 'Show quick page jumper' },
                        { name: 'showTotal', type: 'Boolean', default: 'false', description: 'Show total items count' },
                        { name: 'simple', type: 'Boolean', default: 'false', description: 'Simple pagination style' }
                    ]
                },
                {
                    name: 'Progress',
                    category: 'feedback',
                    description: 'Display progress of operations with customizable styles',
                    preview: `
                        <div style="max-width: 300px;">
                            <div style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 4px;">
                                    <span>Progress</span>
                                    <span>65%</span>
                                </div>
                                <div style="background: #e9ecef; border-radius: 4px; height: 8px; overflow: hidden;">
                                    <div style="background: #007bff; height: 100%; width: 65%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                        </div>
                    `,
                    usage: `<Progress :value="65" :max="100" color="primary" show-text />

<Progress
    :value="uploadProgress"
    color="success"
    size="large"
    :animated="true"
    :striped="true"
/>

<!-- Circular progress -->
<Progress
    :value="75"
    type="circle"
    :size="120"
    color="warning"
/>`,
                    props: [
                        { name: 'value', type: 'Number', default: '0', description: 'Current progress value' },
                        { name: 'max', type: 'Number', default: '100', description: 'Maximum progress value' },
                        { name: 'color', type: 'String', default: 'primary', description: 'Progress bar color (primary, success, warning, danger)' },
                        { name: 'size', type: 'String', default: 'medium', description: 'Progress bar size (small, medium, large)' },
                        { name: 'showText', type: 'Boolean', default: 'false', description: 'Show percentage text' },
                        { name: 'animated', type: 'Boolean', default: 'false', description: 'Animated progress bar' },
                        { name: 'striped', type: 'Boolean', default: 'false', description: 'Striped progress bar' },
                        { name: 'type', type: 'String', default: 'line', description: 'Progress type (line, circle)' }
                    ]
                },
                {
                    name: 'Radio',
                    category: 'form',
                    description: 'Radio button input for single selection from multiple options',
                    preview: `
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="radio" name="demo" checked /> Option 1
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="radio" name="demo" /> Option 2
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="radio" name="demo" disabled /> Disabled
                            </label>
                        </div>
                    `,
                    usage: `<Radio
    v-model="selectedOption"
    :options="radioOptions"
    name="preferences"
/>

<!-- Individual radio buttons -->
<Radio v-model="choice" value="option1" label="Option 1" />
<Radio v-model="choice" value="option2" label="Option 2" />

<!-- Data structure -->
const radioOptions = [
    { value: 'small', label: 'Small Size' },
    { value: 'medium', label: 'Medium Size' },
    { value: 'large', label: 'Large Size' }
];`,
                    props: [
                        { name: 'modelValue', type: 'String|Number', default: '""', description: 'Selected radio value' },
                        { name: 'options', type: 'Array', default: '[]', description: 'Array of radio options' },
                        { name: 'name', type: 'String', default: '""', description: 'Radio group name attribute' },
                        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable all radio buttons' },
                        { name: 'direction', type: 'String', default: 'horizontal', description: 'Layout direction (horizontal, vertical)' }
                    ]
                },
                {
                    name: 'Select',
                    category: 'form',
                    description: 'Dropdown selection component with search capability',
                    preview: `
                        <div style="max-width: 200px;">
                            <select class="input-field" style="width: 100%;">
                                <option>Please select</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                        </div>
                    `,
                    usage: `<Select
    v-model="selectedOption"
    :options="selectOptions"
    placeholder="Please select"
    searchable
    clearable
/>

<!-- Multiple selection -->
<Select
    v-model="selectedItems"
    :options="options"
    multiple
    :max-selections="3"
/>

<!-- Data structure -->
const selectOptions = [
    { value: 'option1', label: 'Option 1', disabled: false },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
];`,
                    props: [
                        { name: 'modelValue', type: 'String|Number|Array', default: '""', description: 'Selected value(s)' },
                        { name: 'options', type: 'Array', default: '[]', description: 'Array of option objects' },
                        { name: 'placeholder', type: 'String', default: 'Please select', description: 'Placeholder text' },
                        { name: 'searchable', type: 'Boolean', default: 'false', description: 'Enable search functionality' },
                        { name: 'clearable', type: 'Boolean', default: 'false', description: 'Show clear button' },
                        { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple selections' },
                        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable select' }
                    ]
                },
                {
                    name: 'Sidebar',
                    category: 'layout',
                    description: 'Collapsible sidebar navigation component',
                    preview: `
                        <div style="display: flex; max-width: 300px; height: 200px; border: 1px solid #e9ecef; border-radius: 4px;">
                            <div style="width: 200px; background: #f8f9fa; border-right: 1px solid #e9ecef; padding: 15px;">
                                <div style="font-weight: 600; margin-bottom: 10px;">Navigation</div>
                                <div style="font-size: 14px; padding: 5px 0; color: #6c757d;">Dashboard</div>
                                <div style="font-size: 14px; padding: 5px 0; color: #007bff;">Products</div>
                                <div style="font-size: 14px; padding: 5px 0; color: #6c757d;">Settings</div>
                            </div>
                            <div style="flex: 1; padding: 15px; background: white;">
                                <div style="color: #6c757d; font-size: 14px;">Main content area</div>
                            </div>
                        </div>
                    `,
                    usage: `<Sidebar
    v-model="sidebarVisible"
    :items="sidebarItems"
    position="left"
    :collapsible="true"
    width="250px"
>
    <template #header>
        <div class="sidebar-logo">My App</div>
    </template>

    <template #footer>
        <div class="sidebar-footer">© 2025</div>
    </template>
</Sidebar>

<!-- Data structure -->
const sidebarItems = [
    { label: 'Dashboard', icon: '📊', route: 'dashboard' },
    { label: 'Products', icon: '📦', route: 'products', badge: '5' },
    { label: 'Settings', icon: '⚙️', route: 'settings' }
];`,
                    props: [
                        { name: 'modelValue', type: 'Boolean', default: 'true', description: 'Sidebar visibility' },
                        { name: 'items', type: 'Array', default: '[]', description: 'Array of sidebar navigation items' },
                        { name: 'position', type: 'String', default: 'left', description: 'Sidebar position (left, right)' },
                        { name: 'width', type: 'String', default: '250px', description: 'Sidebar width' },
                        { name: 'collapsible', type: 'Boolean', default: 'true', description: 'Allow sidebar to be collapsed' },
                        { name: 'overlay', type: 'Boolean', default: 'false', description: 'Show overlay on mobile' }
                    ]
                },
                {
                    name: 'Table',
                    category: 'data',
                    description: 'Data table with sorting, filtering, and pagination',
                    preview: `
                        <div style="max-width: 500px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead style="background: #f8f9fa;">
                                    <tr>
                                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dee2e6;">Name ↕</th>
                                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dee2e6;">Email</th>
                                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dee2e6;">Status</th>
                                        <th style="padding: 8px; text-align: left; border-bottom: 1px solid #dee2e6;">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">John Doe</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">john@example.com</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><span style="background: #28a745; color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px;">Active</span></td>
                                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><button style="font-size: 12px; padding: 2px 6px;">Edit</button></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">Jane Smith</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">jane@example.com</td>
                                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><span style="background: #dc3545; color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px;">Inactive</span></td>
                                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><button style="font-size: 12px; padding: 2px 6px;">Edit</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `,
                    usage: `<Table
    :data="tableData"
    :columns="columns"
    :pagination="true"
    :sortable="true"
    :filterable="true"
    :selectable="true"
    row-key="id"
/>

<!-- Column definitions -->
const columns = [
    { key: 'name', title: 'Name', sortable: true, width: '200px' },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'status', title: 'Status', filterable: true },
    { key: 'actions', title: 'Actions', width: '120px' }
];`,
                    props: [
                        { name: 'data', type: 'Array', default: '[]', description: 'Table data array' },
                        { name: 'columns', type: 'Array', default: '[]', description: 'Column definitions' },
                        { name: 'pagination', type: 'Boolean', default: 'false', description: 'Enable pagination' },
                        { name: 'sortable', type: 'Boolean', default: 'false', description: 'Enable column sorting' },
                        { name: 'filterable', type: 'Boolean', default: 'false', description: 'Enable data filtering' },
                        { name: 'selectable', type: 'Boolean', default: 'false', description: 'Enable row selection' },
                        { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading state' }
                    ]
                },
                {
                    name: 'Tabs',
                    category: 'navigation',
                    description: 'Organize content into multiple panels with various styles',
                    preview: `
                        <div style="max-width: 400px;">
                            <div class="tabs">
                                <div class="tabs-header">
                                    <div class="tab tab-active">Tab 1</div>
                                    <div class="tab">Tab 2</div>
                                    <div class="tab">Tab 3</div>
                                </div>
                                <div class="tabs-content">
                                    <div class="tab-panel tab-panel-active" style="padding: 16px;">
                                        This is the content of Tab 1
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
                    usage: `<Tabs v-model="activeTab" variant="default">
    <template #tabs>
        <div class="tab" data-tab="tab1">
            <span class="tab-icon">🏠</span>
            <span class="tab-label">Home</span>
        </div>
        <div class="tab" data-tab="tab2">
            <span class="tab-icon">⚙️</span>
            <span class="tab-label">Settings</span>
        </div>
    </template>

    <div class="tab-panel" data-panel="tab1">Home content</div>
    <div class="tab-panel" data-panel="tab2">Settings content</div>
</Tabs>

<!-- Pills variant -->
<Tabs v-model="activeTab" variant="pills" position="vertical" />`,
                    props: [
                        { name: 'modelValue', type: 'String', default: '""', description: 'Active tab identifier' },
                        { name: 'variant', type: 'String', default: 'default', description: 'Tab style (default, pills, underline, card)' },
                        { name: 'position', type: 'String', default: 'horizontal', description: 'Tab position (horizontal, vertical)' },
                        { name: 'animated', type: 'Boolean', default: 'true', description: 'Enable transition animations' },
                        { name: 'closable', type: 'Boolean', default: 'false', description: 'Allow tabs to be closed' },
                        { name: 'addable', type: 'Boolean', default: 'false', description: 'Show add tab button' }
                    ]
                },
                {
                    name: 'Toast',
                    category: 'feedback',
                    description: 'Temporary notification messages with auto-dismiss',
                    preview: `
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <div style="background: #d4edda; color: #155724; padding: 8px 12px; border-radius: 4px; font-size: 14px; border-left: 4px solid #28a745;">✓ Success Toast</div>
                            <div style="background: #f8d7da; color: #721c24; padding: 8px 12px; border-radius: 4px; font-size: 14px; border-left: 4px solid #dc3545;">✗ Error Toast</div>
                        </div>
                    `,
                    usage: `<!-- Add Toast container to your template -->
<Toast ref="toastContainer" position="top-right" />

<!-- Use in JavaScript -->
methods: {
    showSuccess() {
        this.$refs.toastContainer.show('Success message!', 'success');
    },
    showError() {
        this.$refs.toastContainer.show('Error message!', 'error');
    },
    showCustom() {
        this.$refs.toastContainer.show({
            title: 'Custom Toast',
            message: 'This is a custom toast',
            type: 'info',
            duration: 5000
        });
    }
}`,
                    props: [
                        { name: 'position', type: 'String', default: 'top-right', description: 'Toast position (top-right, top-left, bottom-right, etc.)' },
                        { name: 'duration', type: 'Number', default: '4000', description: 'Auto-close duration in milliseconds' },
                        { name: 'closable', type: 'Boolean', default: 'true', description: 'Show close button' },
                        { name: 'maxCount', type: 'Number', default: '5', description: 'Maximum number of toasts' },
                        { name: 'pauseOnHover', type: 'Boolean', default: 'true', description: 'Pause auto-close on hover' }
                    ]
                },
                {
                    name: 'Tooltip',
                    category: 'feedback',
                    description: 'Display helpful information on hover or focus',
                    preview: `
                        <div style="text-align: center;">
                            <button class="btn btn-primary btn-small" style="position: relative;">
                                Hover Me
                                <div style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #333; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; white-space: nowrap; margin-bottom: 5px; opacity: 0.8;">
                                    This is a tooltip
                                </div>
                            </button>
                        </div>
                    `,
                    usage: `<Tooltip content="This is a helpful tooltip" placement="top">
    <button class="btn btn-primary">Hover me</button>
</Tooltip>

<Tooltip
    content="Rich content tooltip"
    placement="bottom"
    trigger="click"
    :arrow="true"
>
    <span>Click for tooltip</span>
</Tooltip>

<!-- HTML content -->
<Tooltip placement="right">
    <template #content>
        <div>
            <strong>Rich Content</strong><br>
            <em>This tooltip has HTML content</em>
        </div>
    </template>
    <button class="btn btn-outline">Rich tooltip</button>
</Tooltip>`,
                    props: [
                        { name: 'content', type: 'String', default: '""', description: 'Tooltip content text' },
                        { name: 'placement', type: 'String', default: 'top', description: 'Tooltip placement (top, bottom, left, right)' },
                        { name: 'trigger', type: 'String', default: 'hover', description: 'Trigger event (hover, click, focus)' },
                        { name: 'arrow', type: 'Boolean', default: 'true', description: 'Show tooltip arrow' },
                        { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable tooltip' },
                        { name: 'delay', type: 'Number', default: '0', description: 'Show delay in milliseconds' }
                    ]
                }
            ]
        };
    },

    computed: {
        filteredComponents() {
            if (this.activeCategory === 'all') {
                return this.components;
            }
            return this.components.filter(component => component.category === this.activeCategory);
        }
    },

    methods: {
        setActiveCategory(categoryId) {
            this.activeCategory = categoryId;
        },

        showDemo(componentName) {
            this.demoComponent = componentName;
            // Scroll to demo section
            this.$nextTick(() => {
                const demoSection = document.querySelector('.demo-section');
                if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        },

        copyUsage(usage) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(usage).then(() => {
                    this.showToast('Code copied to clipboard!', 'success');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = usage;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showToast('Code copied to clipboard!', 'success');
            }
        },

        showToast(message, type = 'info') {
            if (this.$refs.toastContainer) {
                this.$refs.toastContainer.show(message, type);
            }
        }
    }
};