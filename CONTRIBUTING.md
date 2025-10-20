# ViewLogic Application Development Guide

> **AI Developer Reference**: This guide is designed for AI-assisted development of ViewLogic applications. Follow these conventions to maintain consistency and quality.

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [CSS Guidelines](#css-guidelines)
- [JavaScript/Logic Guidelines](#javascript-logic-guidelines)
- [HTML/View Guidelines](#html-view-guidelines)
- [Dynamic Content Loading](#dynamic-content-loading)
- [Component Development](#component-development)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Routing and Navigation](#routing-and-navigation)
- [SEO Strategy](#seo-strategy)
- [Forms and Data Handling](#forms-and-data-handling)
- [Internationalization](#internationalization)
- [Quality Assurance](#quality-assurance)
- [Production Build](#production-build)

---

## Architecture Overview

ViewLogic follows a **strict separation of concerns** philosophy:

### Core Principles

1. **View-Logic Separation**
   - Views (`src/views/*.html`) contain ONLY presentation markup
   - Logic (`src/logic/*.js`) contains ONLY business logic and data
   - NEVER mix presentation and logic in the same file

2. **Zero Build Development**
   - Development mode works WITHOUT any build step
   - Changes are instantly visible without compilation
   - Build step is ONLY required for production optimization

3. **AI-First Design**
   - Predictable file naming: `src/views/user-profile.html` → `src/logic/user-profile.js` → `src/styles/user-profile.css`
   - Clear conventions make code generation reliable
   - Separated concerns allow independent file modification

### Framework Features

ViewLogic provides built-in functionality for:
- **Routing**: File-based, automatic route discovery
- **State Management**: Reactive global state without external libraries
- **Authentication**: JWT-based auth with multiple storage options
- **API Client**: HTTP client with automatic token injection and parameter substitution
- **i18n**: Multi-language support with lazy loading
- **Form Handling**: Automatic form processing with validation
- **Caching**: Smart caching with TTL and LRU eviction

### Routing Philosophy

ViewLogic uses **file-based routing without routing tables** for superior performance and simplicity:

**Why File-Based Routing?**
- **O(1) Performance**: Direct file-to-route mapping eliminates routing table lookups (O(n))
- **Zero Configuration**: No routing table to maintain or configure
- **100% Dynamic**: Routes discovered automatically from file structure
- **Proven at Scale**: Validated on large production applications

**Why Query Parameters Over Path Parameters?**

ViewLogic uses query parameters (`#/user-profile?userId=123`) instead of path parameters (`#/user-profile/123`):

- **SEO Friendly**: Query parameters work perfectly with SEO when using prerendering (YouTube, Amazon, etc.)
- **100% Dynamic Routing**: No routing table configuration required
- **Flexibility**: Easy to add/modify parameters without route changes
- **Backward Compatibility**: Legacy systems prove this approach scales well

**Performance Benefits**:
```
Traditional Routing Table: O(n) - Must search through all routes
File-Based Routing: O(1) - Direct file system lookup
```

This design enables fast, lightweight operation even on large-scale applications.

---

## Project Structure

### Basic Structure

```
project/
├── src/
│   ├── views/              # HTML templates (pure presentation)
│   │   ├── home.html
│   │   ├── user-profile.html
│   │   └── dashboard.html
│   ├── logic/              # Vue component logic (pure JavaScript)
│   │   ├── home.js
│   │   ├── user-profile.js
│   │   └── dashboard.js
│   ├── components/         # Reusable UI components (global only, flat structure)
│   │   ├── UserCard.js
│   │   ├── Modal.js
│   │   └── Button.js
│   ├── layouts/            # Layout templates
│   │   ├── default.html    # Default layout wrapper
│   │   └── admin.html      # Admin-specific layout
│   └── styles/             # Page-specific CSS files
│       ├── home.css
│       └── user-profile.css
├── css/                    # Global CSS files
│   └── base.css            # Base styles and common components
├── js/                     # JavaScript library files
│   ├── viewlogic-router.js      # Development version
│   ├── viewlogic-router.min.js  # Minified version
│   └── viewlogic-router.umd.js  # UMD bundle
├── i18n/                   # Internationalization files
│   ├── en.json
│   ├── ko.json
│   └── ja.json
├── routes/                 # Auto-generated after building
│   └── *.js                # Built route bundles
├── index.html              # Main entry point
└── package.json
```

### Nested Folder Structure (For Medium/Large Projects)

**IMPORTANT**: ViewLogic supports nested folder structures for better organization in medium to large projects:

```
project/
├── src/
│   ├── views/
│   │   ├── home.html                    # Simple page
│   │   ├── user/                        # User module folder
│   │   │   ├── profile.html             # Route: user/profile
│   │   │   ├── settings.html            # Route: user/settings
│   │   │   └── posts.html               # Route: user/posts
│   │   ├── admin/                       # Admin module folder
│   │   │   ├── dashboard.html           # Route: admin/dashboard
│   │   │   ├── users/                   # Nested module
│   │   │   │   ├── list.html            # Route: admin/users/list
│   │   │   │   └── edit.html            # Route: admin/users/edit
│   │   │   └── settings.html
│   │   └── shop/                        # Shop module folder
│   │       ├── products.html
│   │       ├── cart.html
│   │       └── checkout/
│   │           ├── shipping.html
│   │           └── payment.html
│   ├── logic/
│   │   ├── home.js                      # Simple page logic
│   │   ├── user/                        # Matches views structure
│   │   │   ├── profile.js
│   │   │   ├── settings.js
│   │   │   └── posts.js
│   │   ├── admin/
│   │   │   ├── dashboard.js
│   │   │   ├── users/
│   │   │   │   ├── list.js
│   │   │   │   └── edit.js
│   │   │   └── settings.js
│   │   └── shop/
│   │       ├── products.js
│   │       ├── cart.js
│   │       └── checkout/
│   │           ├── shipping.js
│   │           └── payment.js
│   └── styles/
│       ├── home.css                     # Simple page styles
│       ├── user/                        # Matches views structure
│       │   ├── profile.css
│       │   ├── settings.css
│       │   └── posts.css
│       ├── admin/
│       │   ├── dashboard.css
│       │   └── users/
│       │       ├── list.css
│       │       └── edit.css
│       └── shop/
│           └── checkout/
│               ├── shipping.css
│               └── payment.css
```

### File Naming Conventions

**CRITICAL**: Follow exact naming patterns for automatic route discovery:

#### Flat Structure (Small Projects)

| File Type | Pattern | Example | Route | URL |
|-----------|---------|---------|-------|-----|
| View | `src/views/{route-name}.html` | `src/views/user-profile.html` | `user-profile` | `#/user-profile` |
| Logic | `src/logic/{route-name}.js` | `src/logic/user-profile.js` | `user-profile` | `#/user-profile` |
| Style | `src/styles/{route-name}.css` | `src/styles/user-profile.css` | - | - |
| Component | `src/components/{ComponentName}.js` | `src/components/UserCard.js` | - | - |
| Layout | `src/layouts/{layout-name}.html` | `src/layouts/default.html` | - | - |

#### Nested Structure (Medium/Large Projects)

| File Type | Pattern | Example | Route | URL |
|-----------|---------|---------|-------|-----|
| View | `src/views/{folder}/{page}.html` | `src/views/user/profile.html` | `user/profile` | `#/user/profile` |
| Logic | `src/logic/{folder}/{page}.js` | `src/logic/user/profile.js` | `user/profile` | `#/user/profile` |
| Style | `src/styles/{folder}/{page}.css` | `src/styles/user/profile.css` | - | - |
| View (Nested) | `src/views/{folder}/{sub}/{page}.html` | `src/views/admin/users/list.html` | `admin/users/list` | `#/admin/users/list` |
| Logic (Nested) | `src/logic/{folder}/{sub}/{page}.js` | `src/logic/admin/users/list.js` | `admin/users/list` | `#/admin/users/list` |

**Route Naming Rules**:
- Use kebab-case: `user-profile`, `admin-dashboard`, `contact-us`
- Route name = file path from views folder (without extension)
- Folder separators become URL path separators
- URL examples:
  - `src/views/home.html` → Route: `home` → URL: `#/home`
  - `src/views/user/profile.html` → Route: `user/profile` → URL: `#/user/profile`
  - `src/views/admin/users/edit.html` → Route: `admin/users/edit` → URL: `#/admin/users/edit`

**Folder Structure Consistency**:
- **CRITICAL**: Keep folder structure identical across `views/`, `logic/`, and `styles/`
- If you have `src/views/admin/users/list.html`, you MUST have `src/logic/admin/users/list.js`
- Styles are optional: `src/styles/admin/users/list.css` (only if page needs unique styles)

---

## Development Workflow

### Starting a New Feature

#### Small Project (Flat Structure)

1. **Plan the structure**
   ```
   Feature: User Profile Management
   - View: src/views/user-profile.html
   - Logic: src/logic/user-profile.js
   - Style: src/styles/user-profile.css (if needed)
   - Components: src/components/UserAvatar.js (if reusable)
   ```

2. **Create files in order**
   - Start with Logic (define data structure)
   - Then View (use the data)
   - Finally Style (if needed)

#### Medium/Large Project (Nested Structure)

1. **Plan the module structure**: See [Project Structure](#project-structure) for detailed folder organization

2. **Create folder structure first**
   ```bash
   mkdir -p src/views/admin/users
   mkdir -p src/logic/admin/users
   mkdir -p src/styles/admin/users  # Optional
   ```

3. **Create files in order** (per page)
   - Start with Logic (define data structure)
   - Then View (use the data)
   - Finally Style (if needed)

### Choosing Structure: Flat vs Nested

**Use Flat Structure when:**
- Small project (< 10 pages)
- Simple, single-domain application
- Minimal feature modules
- Example: Landing page, portfolio, small blog

**Use Nested Structure when:**
- Medium to large project (10+ pages)
- Multiple feature modules (admin, user, shop, etc.)
- Clear domain separation needed
- Team collaboration on different modules
- Example: E-commerce, SaaS platform, CMS

### File Organization Best Practices

1. **Check for reusability**
   - **Global components** (used across ALL modules) → `src/components/`
   - **Module-specific patterns** → Keep as inline template in view or create local component
   - **Page-specific elements** → Keep in view file
   - **Shared styles** → Add to `css/base.css`
   - **Module-specific shared styles** → Create `src/styles/{module}/common.css`

   **Component Guidelines**:
   - Only create components in `src/components/` if used by 2+ different modules
   - If only used within one module, keep it inline in the view template
   - Components folder does NOT support nested structure (flat only)

2. **Maintain consistency**
   - Keep identical folder structure across `views/`, `logic/`, and `styles/`
   - Use same naming conventions throughout the project
   - Document module structure in README or comments

3. **Module isolation**
   ```
   ✅ GOOD: Clear module boundaries
   admin/
     users/
       list.html
       edit.html
     settings/
       general.html
       security.html

   ❌ BAD: Mixed structure
   admin/
     user-list.html
     settings/
       general.html
   ```

### Development Commands

```bash
# Start development server (zero build)
npm run dev

# Production build with optimization
npm run build

# Production build with full optimization
npm run build:prod

# Development build with verbose output
npm run build:dev

# Clean build artifacts
npm run build:clean

# Fresh build (ignore cache)
npm run build:fresh

# View build information
npm run build:info

# Analyze bundle sizes
npm run analyze
```

---

## CSS Guidelines

### Priority System

**CRITICAL**: Maintain strict CSS hierarchy to avoid duplication:

1. **`css/base.css`** - Global styles and common components
   - Typography, colors, spacing
   - Layout utilities (flexbox, grid)
   - Common UI elements (buttons, forms, cards)
   - Responsive breakpoints

2. **`src/styles/{page}.css`** - Page-specific styles ONLY
   - Unique page layouts
   - Page-specific component variations
   - DO NOT duplicate anything from `base.css`

### CSS Workflow

**BEFORE writing any CSS**:

1. **Check `css/base.css` first**
   ```bash
   # Search for existing styles
   grep -i "button" css/base.css
   grep -i "card" css/base.css
   ```

2. **Identify duplication**
   - If style exists in `base.css` → Use it, don't redefine
   - If it's a variation → Use CSS modifier classes
   - If it's truly unique → Add to page-specific CSS

3. **Common pattern detection**
   - If same style appears in 2+ pages → Move to `base.css`
   - Remove duplicates from page-specific files

### CSS Organization in base.css

```css
/* 1. CSS Variables */
:root {
    --primary-color: #3b82f6;
    --text-color: #1f2937;
}

/* 2. Reset and Base Elements */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui; }

/* 3. Layout Utilities */
.container { max-width: 1200px; margin: 0 auto; }
.flex { display: flex; }
.grid { display: grid; }

/* 4. Common Components */
.btn { /* button styles */ }
.card { /* card styles */ }
.form-input { /* input styles */ }

/* 5. Responsive Utilities */
@media (max-width: 768px) { /* mobile styles */ }
```

### CSS Best Practices

```css
/* ✅ GOOD: Semantic names, CSS variables, mobile-first */
.user-profile-header { color: var(--primary-color); }
.card { width: 100%; }
@media (min-width: 768px) { .card { width: 50%; } }

/* ❌ BAD: Generic names, hardcoded values, desktop-first */
.box1 { color: #3b82f6; }
```

### Style Removal Checklist

When adding common styles to `base.css`:

1. ✅ Add style to `css/base.css`
2. ✅ Remove duplicates from ALL page-specific CSS files
3. ✅ Update page styles to use new common class
4. ✅ Test all affected pages
5. ✅ Verify no visual regressions

---

## JavaScript/Logic Guidelines

### Logic File Structure

Every logic file (`src/logic/*.js`) should export a default Vue component configuration:

```javascript
export default {
    // Optional: Specify layout (defaults to 'default')
    layout: 'default',    // Use layouts/default.html
    // layout: 'admin',   // Use layouts/admin.html
    // layout: null,      // No layout (page content only)

    // Automatic API data loading
    dataURL: '/api/users',           // Single endpoint
    // OR multiple endpoints:
    dataURL: {
        users: '/api/users',
        profile: '/api/profile',
        stats: '/api/stats?userId={userId}'  // Parameter substitution
    },

    // Component data
    data() {
        return {
            // Define all data properties here
            message: 'Hello',
            count: 0,
            users: []
        };
    },

    // Computed properties
    computed: {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        // Access route/query parameters
        userId() {
            return this.getParam('userId', 'default-value');
        }
    },

    // Component methods
    methods: {
        // Business logic methods
        async loadUsers() {
            try {
                const users = await this.$api.get('/api/users');
                this.users = users;
            } catch (error) {
                this.log('error', 'Failed to load users', error);
            }
        },

        // Navigation
        goToProfile(userId) {
            this.navigateTo('user-profile', { userId });
        },

        // Form handlers
        onUserCreated(response) {
            this.$state.set('newUser', response);
            this.navigateTo('user-list');
        },

        onFormError(error) {
            this.log('error', 'Form submission failed', error);
        }
    },

    // Lifecycle hooks
    async mounted() {
        this.log('info', 'Component mounted');
        await this.loadUsers();
    },

    beforeUnmount() {
        this.log('info', 'Component unmounting');
    }
};
```

### Data Structure Consistency

**CRITICAL**: Maintain consistent data structures across components:

```javascript
// ✅ GOOD: Consistent user object structure
const user = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    avatar: '/images/avatar.jpg'
};

// ❌ BAD: Inconsistent structures
const user1 = { userId: 1, userName: 'John' };
const user2 = { id: 2, name: 'Jane' };

// ✅ GOOD: Define reusable structures
const EMPTY_USER = {
    id: null,
    name: '',
    email: '',
    avatar: '/images/default-avatar.jpg'
};

export default {
    data() {
        return {
            user: { ...EMPTY_USER }
        };
    }
};
```

### API Integration

Use ViewLogic's built-in API client:

```javascript
methods: {
    // GET request
    async fetchUser(userId) {
        const user = await this.$api.get(`/api/users/${userId}`);
        return user;
    },

    // GET with query parameters
    async searchUsers(query) {
        const results = await this.$api.get('/api/users', {
            params: { search: query, active: true }
        });
        return results;
    },

    // POST request
    async createUser(userData) {
        const newUser = await this.$api.post('/api/users', userData);
        return newUser;
    },

    // PUT/PATCH request
    async updateUser(userId, updates) {
        const updated = await this.$api.put(`/api/users/${userId}`, updates);
        return updated;
    },

    // DELETE request
    async deleteUser(userId) {
        await this.$api.delete(`/api/users/${userId}`);
    },

    // Parameter substitution from route/query
    // If URL is /user-profile?userId=123
    async loadUserProfile() {
        // {userId} is automatically replaced with 123
        const profile = await this.$api.get('/api/users/{userId}/profile');
        return profile;
    }
}
```

### Error Handling

Always handle errors properly:

```javascript
methods: {
    async loadData() {
        try {
            this.loading = true;
            const data = await this.$api.get('/api/data');
            this.data = data;
            this.log('info', 'Data loaded successfully', { count: data.length });
        } catch (error) {
            this.log('error', 'Failed to load data', error);
            this.errorMessage = 'Failed to load data. Please try again.';
        } finally {
            this.loading = false;
        }
    }
}
```

### Logging

Use built-in logging for debugging:

```javascript
// Log levels: 'debug', 'info', 'warn', 'error'
this.log('debug', 'User action started', { action: 'submit' });
this.log('info', 'Data loaded', { count: 10 });
this.log('warn', 'Using cached data', { age: '5 minutes' });
this.log('error', 'API request failed', error);
```

---

## HTML/View Guidelines

### View File Structure

Views are **pure presentation** with Vue template syntax:

```html
<!-- src/views/user-profile.html -->
<div class="user-profile">
    <!-- Header -->
    <header class="profile-header">
        <img :src="user.avatar" :alt="user.name" class="avatar">
        <h1>{{ user.name }}</h1>
        <p>{{ user.email }}</p>
    </header>

    <!-- Conditional rendering -->
    <div v-if="loading" class="loading">
        <Loading />
    </div>

    <div v-else-if="error" class="error">
        <Alert type="error">{{ errorMessage }}</Alert>
    </div>

    <div v-else class="profile-content">
        <!-- Tabs -->
        <Tabs :tabs="tabs" v-model="activeTab">
            <!-- Posts tab -->
            <template v-slot:posts>
                <div v-for="post in posts" :key="post.id" class="post">
                    <Card>
                        <h3>{{ post.title }}</h3>
                        <p>{{ post.content }}</p>
                        <button @click="editPost(post.id)" class="btn">Edit</button>
                    </Card>
                </div>
            </template>

            <!-- Settings tab -->
            <template v-slot:settings>
                <form action="/api/users/{userId}" method="PUT"
                      data-success="onProfileUpdated"
                      data-error="onFormError">
                    <Input v-model="user.name" name="name" label="Name" required />
                    <Input v-model="user.email" name="email" type="email" label="Email" required />
                    <Button type="submit">Save Changes</Button>
                </form>
            </template>
        </Tabs>
    </div>
</div>
```

### Template Best Practices

```html
<!-- ✅ GOOD: Use components -->
<UserCard :user="user" @edit="handleEdit" />

<!-- ❌ BAD: Repeat complex markup -->
<div class="user-card"><img :src="user.avatar">...</div>

<!-- ✅ GOOD: Clear conditions -->
<div v-if="isLoading">Loading...</div>
<div v-else-if="hasError">Error</div>
<div v-else>{{ content }}</div>

<!-- ✅ GOOD: v-for with :key -->
<div v-for="item in items" :key="item.id">
```

### Layout Integration

Specify layout in logic file:

```javascript
// src/logic/admin-dashboard.js
export default {
    layout: 'admin',  // Uses src/layouts/admin.html
    data() {
        return { /* ... */ };
    }
};
```

Layout file structure:

```html
<!-- src/layouts/admin.html -->
<div class="admin-layout">
    <Sidebar :menu="adminMenu" />

    <div class="admin-content">
        <header class="admin-header">
            <h1>Admin Dashboard</h1>
            <UserMenu />
        </header>

        <main class="admin-main">
            <!-- Page content is injected here -->
            {{ content }}
        </main>

        <footer class="admin-footer">
            <p>&copy; 2024 Admin Panel</p>
        </footer>
    </div>
</div>
```

---

## Dynamic Content Loading

ViewLogic provides two powerful components for loading dynamic content: **DynamicInclude** and **HtmlInclude**. Understanding when and how to use each is critical for building modular applications.

### DynamicInclude Component

**Purpose**: Load complete ViewLogic routes/pages dynamically within another page.

**How it works**: Uses ViewLogic Router's `createComponent()` function to load a full route (view + logic + styles) as a component.

#### Basic Usage

```html
<!-- src/views/admin/dashboard.html -->
<div class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <!-- Load entire user-stats route as a widget -->
    <DynamicInclude page="admin/widgets/user-stats" />

    <!-- Load sales chart route -->
    <DynamicInclude page="admin/widgets/sales-chart" />
</div>
```

```javascript
// src/logic/admin/widgets/user-stats.js
export default {
    data() {
        return {
            totalUsers: 0,
            activeUsers: 0
        };
    },
    async mounted() {
        const stats = await this.$api.get('/api/stats/users');
        this.totalUsers = stats.total;
        this.activeUsers = stats.active;
    }
};
```

```html
<!-- src/views/admin/widgets/user-stats.html -->
<div class="user-stats-widget">
    <h3>User Statistics</h3>
    <div class="stats">
        <div class="stat">
            <span class="label">Total Users</span>
            <span class="value">{{ totalUsers }}</span>
        </div>
        <div class="stat">
            <span class="label">Active Users</span>
            <span class="value">{{ activeUsers }}</span>
        </div>
    </div>
</div>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `page` | String | Yes | Route name to load (e.g., `'admin/widgets/user-stats'`) |

#### Features

- ✅ Loads complete routes (view + logic + styles)
- ✅ Route has full access to ViewLogic APIs (`$api`, `$state`, `$router`)
- ✅ Automatic style injection (styles scoped to route)
- ✅ Error handling with error messages
- ✅ Watches `page` prop for changes (reload on route change)

#### Use Cases

**1. Dashboard Widgets**
```html
<!-- Multiple independent widgets on dashboard -->
<div class="dashboard">
    <DynamicInclude page="widgets/revenue" />
    <DynamicInclude page="widgets/user-activity" />
    <DynamicInclude page="widgets/alerts" />
</div>
```

**2. Tab Content**
```html
<!-- Load different routes per tab -->
<div class="tabs">
    <button @click="activeTab = 'profile'">Profile</button>
    <button @click="activeTab = 'settings'">Settings</button>

    <DynamicInclude :page="`user/${activeTab}`" />
</div>
```

**3. Conditional Module Loading**
```html
<!-- Load admin panel only if user is admin -->
<div v-if="isAdmin">
    <DynamicInclude page="admin/control-panel" />
</div>
```

---

### HtmlInclude Component

**Purpose**: Load static HTML content from a file without Vue logic.

**How it works**: Uses `fetch()` to load raw HTML and renders it with `v-html`.

#### Basic Usage

```html
<!-- src/views/home.html -->
<div class="home">
    <h1>Welcome</h1>

    <!-- Include static header -->
    <HtmlInclude src="/templates/header.html" />

    <!-- Include footer -->
    <HtmlInclude src="/templates/footer.html" />
</div>
```

```html
<!-- /templates/header.html (static HTML file) -->
<header class="site-header">
    <div class="logo">My Site</div>
    <nav>
        <a href="#/home">Home</a>
        <a href="#/about">About</a>
        <a href="#/contact">Contact</a>
    </nav>
</header>
```

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | String | Yes | - | Path to HTML file (relative or absolute) |
| `sanitize` | Boolean | No | `true` | Remove `<script>` tags and inline event handlers |
| `loadingText` | String | No | `'Loading...'` | Text to show while loading |
| `wrapperClass` | String | No | `'html-include'` | CSS class for wrapper div |

#### Features

- ✅ Loads static HTML files
- ✅ Automatic path resolution (relative/absolute URLs)
- ✅ Security: Removes scripts by default (`sanitize` option)
- ✅ Loading and error states
- ✅ Watches `src` prop for changes

#### Use Cases

**1. Static Templates/Partials**
```html
<!-- Reusable static content across pages -->
<HtmlInclude src="/templates/contact-info.html" />
<HtmlInclude src="/templates/disclaimer.html" />
```

**2. CMS Content**
```html
<!-- Load content from CMS/backend -->
<HtmlInclude :src="`/api/content/${articleId}.html`" :sanitize="false" />
```

**3. Legal Documents**
```html
<!-- Include terms, privacy policy, etc. -->
<HtmlInclude src="/legal/terms-of-service.html" />
<HtmlInclude src="/legal/privacy-policy.html" />
```

**4. Custom Loading Text**
```html
<HtmlInclude
    src="/templates/sidebar.html"
    loadingText="Loading sidebar..."
    wrapperClass="sidebar-wrapper"
/>
```

---

### DynamicInclude vs HtmlInclude: When to Use What

| Feature | DynamicInclude | HtmlInclude |
|---------|----------------|-------------|
| **Loads** | Complete ViewLogic route (view + logic + styles) | Static HTML file only |
| **Vue Reactivity** | ✅ Yes (full Vue component) | ❌ No (static HTML) |
| **Access to APIs** | ✅ Yes (`$api`, `$state`, etc.) | ❌ No |
| **Event Handlers** | ✅ Yes (Vue events) | ❌ No (sanitized by default) |
| **Lifecycle Hooks** | ✅ Yes (`mounted`, etc.) | ❌ No |
| **Data Binding** | ✅ Yes (`{{ }}`, `v-model`) | ❌ No |
| **Use Case** | Interactive widgets, sub-pages, modules | Static content, templates, partials |
| **Performance** | Heavier (loads full component) | Lighter (just HTML) |

**Decision Tree**:

```
Does the content need Vue reactivity or logic?
├─ YES → Use DynamicInclude
│   └─ Example: Dashboard widget, user profile card, data table
│
└─ NO → Use HtmlInclude
    └─ Example: Header, footer, legal text, static content
```

---

### Common Patterns

#### Pattern 1: Modular Dashboard

```html
<!-- src/views/dashboard.html -->
<div class="dashboard">
    <aside class="sidebar">
        <!-- Static sidebar -->
        <HtmlInclude src="/templates/dashboard-nav.html" />
    </aside>

    <main class="content">
        <!-- Dynamic widgets with logic -->
        <div class="widgets">
            <DynamicInclude page="widgets/stats" />
            <DynamicInclude page="widgets/chart" />
            <DynamicInclude page="widgets/recent-activity" />
        </div>
    </main>
</div>
```

#### Pattern 2: Tab-Based Interface

```html
<!-- src/views/user/profile.html -->
<div class="user-profile">
    <div class="tabs">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="{ active: activeTab === tab.id }"
        >
            {{ tab.label }}
        </button>
    </div>

    <!-- Each tab is a separate route -->
    <div class="tab-content">
        <DynamicInclude :page="`user/tabs/${activeTab}`" />
    </div>
</div>
```

```javascript
// src/logic/user/profile.js
export default {
    data() {
        return {
            activeTab: 'overview',
            tabs: [
                { id: 'overview', label: 'Overview' },
                { id: 'posts', label: 'Posts' },
                { id: 'settings', label: 'Settings' }
            ]
        };
    }
};
```

---

### Best Practices

```html
<!-- ✅ GOOD: Use DynamicInclude for routes with logic -->
<DynamicInclude page="admin/widgets/user-stats" />

<!-- ✅ GOOD: Use HtmlInclude for static content -->
<HtmlInclude src="/templates/footer.html" />

<!-- ❌ BAD: Don't use DynamicInclude for static HTML -->
<DynamicInclude page="static-footer" />  <!-- Use HtmlInclude -->

<!-- ❌ BAD: Don't use HtmlInclude for interactive content -->
<HtmlInclude src="/widgets/user-form.html" />  <!-- No Vue reactivity -->
```

---

### Performance Tips

- **DynamicInclude**: Limit to 3-5 per page (loads full component)
- **HtmlInclude**: Lightweight, cache-friendly (static HTML only)

---

## Component Development

### Creating Reusable Components

**IMPORTANT**: Components in `src/components/` are **global only** and use **flat structure** (no nested folders).

Components go in `src/components/{ComponentName}.js`:

```javascript
// src/components/UserCard.js
export default {
    name: 'UserCard',

    template: `
        <div class="user-card">
            <img :src="user.avatar" :alt="user.name" class="user-avatar">
            <div class="user-info">
                <h3 class="user-name">{{ user.name }}</h3>
                <p class="user-email">{{ user.email }}</p>
                <p class="user-role">{{ user.role }}</p>
            </div>
            <div class="user-actions">
                <button @click="$emit('edit', user)" class="btn btn-primary">
                    Edit
                </button>
                <button @click="$emit('delete', user)" class="btn btn-danger">
                    Delete
                </button>
            </div>
        </div>
    `,

    props: {
        user: {
            type: Object,
            required: true,
            validator: (user) => {
                return user.id && user.name && user.email;
            }
        },
        editable: {
            type: Boolean,
            default: true
        }
    },

    emits: ['edit', 'delete'],

    computed: {
        avatarUrl() {
            return this.user.avatar || '/images/default-avatar.jpg';
        }
    }
};
```

### Component Naming

- **PascalCase** for component filenames: `UserCard.js`, `DataTable.js`
- **kebab-case** in templates: `<user-card>`, `<data-table>`
- Component name property should match filename

### Component Best Practices

```javascript
// ✅ GOOD: Clear prop definitions
props: {
    userId: { type: [String, Number], required: true },
    showActions: { type: Boolean, default: false }
}

// ❌ BAD: Minimal definitions
props: ['userId', 'showActions']

// ✅ GOOD: Document emits
emits: ['update', 'delete', 'select']

// ✅ GOOD: Single-purpose components (UserCard.js, UserAvatar.js)
// ❌ BAD: Monolithic components (UserEverything.js)
```

### When to Create a Component

**Decision Tree**:

1. **Is it used in 2+ different modules?**
   - YES → Create in `src/components/{ComponentName}.js`
   - NO → Go to step 2

2. **Is it used in 2+ pages within the same module?**
   - YES → Create as inline component in view or use local component definition
   - NO → Keep inline in the single view file

**Examples**:

```javascript
// ✅ GOOD: Global component (used in admin AND user modules)
// src/components/DataTable.js
export default {
    name: 'DataTable',
    // ... used by admin/users/list.html AND user/posts.html
}

// ✅ GOOD: Inline component for single module use
// src/views/admin/users/list.html
<div class="admin-users">
    <!-- Inline component definition in logic file -->
    <UserTableRow
        v-for="user in users"
        :key="user.id"
        :user="user"
    />
</div>

// src/logic/admin/users/list.js
export default {
    components: {
        UserTableRow: {
            props: ['user'],
            template: `
                <tr>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                </tr>
            `
        }
    },
    data() {
        return { users: [] };
    }
}

// ❌ BAD: Creating global component for single-module use
// src/components/AdminUserTableRow.js  // Only used in admin module
// Should be inline instead!
```

### Provided Components

ViewLogic template includes these components:

| Component | Purpose | Usage |
|-----------|---------|-------|
| `Accordion` | Collapsible content sections | `<Accordion :items="sections" />` |
| `Alert` | Alert/notification messages | `<Alert type="success">Saved!</Alert>` |
| `Badge` | Status badges | `<Badge color="primary">New</Badge>` |
| `Breadcrumb` | Navigation breadcrumbs | `<Breadcrumb :items="path" />` |
| `Button` | Styled buttons | `<Button type="primary">Submit</Button>` |
| `Card` | Content cards | `<Card title="User">...</Card>` |
| `Checkbox` | Checkbox inputs | `<Checkbox v-model="agreed" />` |
| `DatePicker` | Date selection | `<DatePicker v-model="date" />` |
| `FileUpload` | File upload widget | `<FileUpload @upload="handleFile" />` |
| `Input` | Text inputs | `<Input v-model="name" label="Name" />` |
| `Loading` | Loading spinner | `<Loading size="large" />` |
| `Modal` | Modal dialogs | `<Modal v-model="show">...</Modal>` |
| `Pagination` | Pagination controls | `<Pagination :total="100" :page="1" />` |
| `Progress` | Progress bars | `<Progress :value="75" />` |
| `Radio` | Radio button groups | `<Radio v-model="choice" :options="opts" />` |
| `Select` | Dropdown selects | `<Select v-model="value" :options="items" />` |
| `Sidebar` | Sidebar navigation | `<Sidebar :menu="items" />` |
| `Table` | Data tables | `<Table :columns="cols" :data="rows" />` |
| `Tabs` | Tabbed interface | `<Tabs :tabs="tabs" v-model="active" />` |
| `Toast` | Toast notifications | `<Toast :message="msg" />` |
| `Tooltip` | Tooltips | `<Tooltip text="Help">?</Tooltip>` |

---

## API Integration

### Automatic Data Loading

ViewLogic can automatically load data on component mount:

```javascript
// src/logic/user-profile.js
export default {
    // Single endpoint
    dataURL: '/api/users/{userId}',

    // Multiple endpoints
    dataURL: {
        profile: '/api/users/{userId}/profile',
        posts: '/api/users/{userId}/posts?page={page}',
        followers: '/api/users/{userId}/followers'
    },

    mounted() {
        // Data is automatically loaded and available as:
        // this.profile, this.posts, this.followers
        console.log(this.profile);
        console.log(this.posts);
    },

    methods: {
        // Manually refresh data
        async refresh() {
            await this.fetchData();  // Reloads all dataURL endpoints
        },

        // Refresh with new parameters
        async loadPage(page) {
            this.$query.page = page;
            await this.fetchData();  // Refetch with new page parameter
        }
    }
};
```

### Parameter Substitution

API URLs support automatic parameter substitution:

```javascript
// Route: /user-profile?userId=123&tab=posts

// These URLs automatically substitute parameters:
'/api/users/{userId}'                    → '/api/users/123'
'/api/users/{userId}/posts'              → '/api/users/123/posts'
'/api/posts?userId={userId}&tab={tab}'   → '/api/posts?userId=123&tab=posts'

methods: {
    async loadData() {
        // Parameters from route/query are auto-injected
        const user = await this.$api.get('/api/users/{userId}');
        const posts = await this.$api.get('/api/users/{userId}/posts');
    }
}
```

### Manual API Calls

```javascript
methods: {
    // GET with parameters
    async searchUsers(query) {
        const results = await this.$api.get('/api/users/search', {
            params: { q: query, limit: 10 }
        });
        // Request: GET /api/users/search?q=john&limit=10
        return results;
    },

    // POST with body
    async createPost(postData) {
        const newPost = await this.$api.post('/api/posts', {
            title: postData.title,
            content: postData.content,
            userId: this.getParam('userId')
        });
        return newPost;
    },

    // PUT with route parameter
    async updatePost(postId, updates) {
        // Store in route params for substitution
        this.$params.postId = postId;
        const updated = await this.$api.put('/api/posts/{postId}', updates);
        return updated;
    },

    // DELETE
    async deletePost(postId) {
        await this.$api.delete(`/api/posts/${postId}`);
    }
}
```

---

## State Management

ViewLogic includes built-in reactive state management:

### State API

```javascript
methods: {
    // Set state
    saveUserData() {
        this.$state.set('currentUser', {
            id: 1,
            name: 'John',
            role: 'admin'
        });
    },

    // Get state with default
    loadUserData() {
        const user = this.$state.get('currentUser', { name: 'Guest' });
        this.user = user;
    },

    // Check existence
    checkAuth() {
        if (this.$state.has('currentUser')) {
            console.log('User is logged in');
        }
    },

    // Watch for changes
    watchUserChanges() {
        this.$state.watch('currentUser', (newUser, oldUser) => {
            console.log('User changed:', newUser);
            this.user = newUser;  // Update component data
        });
    },

    // Bulk updates
    updateSettings() {
        this.$state.update({
            theme: 'dark',
            language: 'ko',
            notifications: true
        });
    },

    // Delete state
    logout() {
        this.$state.delete('currentUser');
        this.$state.delete('authToken');
    },

    // Get all state
    debugState() {
        const allState = this.$state.getAll();
        console.log('Current state:', allState);
    }
}
```

### State Sharing Between Components

```javascript
// Component A: Sets state
export default {
    methods: {
        selectUser(user) {
            this.$state.set('selectedUser', user);
            this.navigateTo('user-detail');
        }
    }
};

// Component B: Reads state
export default {
    data() {
        return {
            user: null
        };
    },
    mounted() {
        this.user = this.$state.get('selectedUser');
    }
};
```

---

## Routing and Navigation

### Route Definition

Routes are automatically discovered from files in `src/views/` and `src/logic/`:

**Flat Structure:**
```
src/views/home.html          → Route: 'home'         → URL: #/home
src/views/user-profile.html  → Route: 'user-profile' → URL: #/user-profile
```

**Nested Structure:**
```
src/views/user/profile.html        → Route: 'user/profile'        → URL: #/user/profile
src/views/admin/dashboard.html     → Route: 'admin/dashboard'     → URL: #/admin/dashboard
src/views/admin/users/list.html    → Route: 'admin/users/list'    → URL: #/admin/users/list
src/views/shop/checkout/payment.html → Route: 'shop/checkout/payment' → URL: #/shop/checkout/payment
```

**Important**: Route name matches the file path from `src/views/` folder (without `.html` extension).

### Navigation

```javascript
methods: {
    // Simple navigation (flat structure)
    goHome() {
        this.navigateTo('home');
    },

    // Navigate to nested route
    goToUserProfile() {
        this.navigateTo('user/profile');
        // URL: #/user/profile
    },

    // Navigate to deeply nested route
    goToAdminUserList() {
        this.navigateTo('admin/users/list');
        // URL: #/admin/users/list
    },

    // With query parameters (flat structure)
    viewUser(userId) {
        this.navigateTo('user-profile', { userId: userId });
        // URL: #/user-profile?userId=123
    },

    // With query parameters (nested structure)
    viewUserProfile(userId) {
        this.navigateTo('user/profile', { userId: userId });
        // URL: #/user/profile?userId=123
    },

    // Multiple parameters
    searchPosts(query, category) {
        this.navigateTo('search-results', {
            q: query,
            category: category,
            page: 1
        });
        // URL: #/search-results?q=vue&category=tutorial&page=1
    },

    // Nested route with parameters
    editAdminUser(userId) {
        this.navigateTo('admin/users/edit', { userId: userId });
        // URL: #/admin/users/edit?userId=123
    },

    // Object syntax
    goToUserPosts(userId) {
        this.navigateTo({
            route: 'user/posts',
            params: { userId, tab: 'recent' }
        });
        // URL: #/user/posts?userId=123&tab=recent
    },

    // Complex nested navigation
    goToCheckoutPayment(orderId) {
        this.navigateTo({
            route: 'shop/checkout/payment',
            params: { orderId, step: 'confirm' }
        });
        // URL: #/shop/checkout/payment?orderId=456&step=confirm
    }
}
```

### Navigation Best Practices

```javascript
// ✅ GOOD: Use full route path for nested routes
this.navigateTo('admin/users/list');

// ❌ BAD: Don't use partial paths
this.navigateTo('users/list');  // Will fail if not in admin context

// ✅ GOOD: Consistent route naming
// File: src/views/admin/users/edit.html
this.navigateTo('admin/users/edit', { userId: 123 });

// ✅ GOOD: Use route paths that match file structure
// Structure: src/views/shop/checkout/payment.html
this.navigateTo('shop/checkout/payment');

// ❌ BAD: Don't use different naming
this.navigateTo('shopping/payment');  // Won't match file structure
```

### Accessing Parameters

```javascript
computed: {
    // Get single parameter with default
    userId() {
        return this.getParam('userId', null);
    },

    currentPage() {
        return this.getParam('page', 1);
    },

    // Direct access
    searchQuery() {
        return this.$query.q || '';  // Query parameter
    },

    routeId() {
        return this.$params.id;  // Route parameter
    }
},

methods: {
    loadData() {
        // Get all parameters
        const params = this.getParams();
        console.log('All params:', params);
    }
}
```

### Protected Routes

Configure protected routes in router initialization:

```javascript
// index.html or main entry
ViewLogicRouter({
    authEnabled: true,
    loginRoute: 'login',
    protectedRoutes: ['dashboard', 'profile', 'admin'],
    protectedPrefixes: ['admin/', 'secure/'],
    publicRoutes: ['login', 'register', 'home']
});
```

---

## SEO Strategy

ViewLogic's query-based routing is **fully SEO-friendly** when combined with prerendering solutions. This approach is proven by major platforms like YouTube and Amazon.

### Prerendering for Public-Facing Sites

For public-facing websites that require SEO, use external prerendering solutions:

**Recommended Solutions**:
1. **Prerender.io** - Cloud-based prerendering service
2. **Puppeteer** - Self-hosted prerendering with headless Chrome
3. **Rendertron** - Google's prerendering solution
4. **Prerender SPA Plugin** - Webpack plugin for static prerendering

### How Prerendering Works

Prerendering generates static HTML snapshots of your SPA for search engine crawlers:

```
1. User/Bot requests: https://yoursite.com/#/user/profile?userId=123
2. Server detects bot (via User-Agent)
3. Server sends request to prerendering service
4. Prerendering service:
   - Loads page in headless browser
   - Executes JavaScript
   - Waits for content to load
   - Returns rendered HTML snapshot
5. Server returns HTML snapshot to bot
6. Search engine indexes the rendered content
```

### Implementation Example: Prerender.io

**1. Sign up for Prerender.io** and get your token

**2. Configure your web server** (Nginx example):

```nginx
server {
    listen 80;
    server_name yoursite.com;

    location / {
        # Detect bot traffic
        if ($http_user_agent ~* "googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator") {
            # Proxy to Prerender.io
            proxy_pass https://service.prerender.io;
            proxy_set_header X-Prerender-Token YOUR_TOKEN;
            rewrite .* /$scheme://$host$request_uri? break;
        }

        # Serve SPA for regular users
        try_files $uri $uri/ /index.html;
    }
}
```

**3. Add meta tags** for social sharing:

```html
<!-- index.html -->
<head>
    <meta name="description" content="Your app description">
    <meta property="og:title" content="Your App Title">
    <meta property="og:description" content="Your app description">
    <meta property="og:image" content="https://yoursite.com/og-image.jpg">
    <meta property="og:url" content="https://yoursite.com">
    <meta name="twitter:card" content="summary_large_image">
</head>
```

### Self-Hosted Prerendering with Puppeteer

For complete control, implement your own prerendering:

```javascript
// prerender-server.js
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

let browser;

(async () => {
    browser = await puppeteer.launch({ headless: true });
})();

app.get('/render', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL parameter required');
    }

    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        const html = await page.content();
        await page.close();

        res.send(html);
    } catch (error) {
        console.error('Prerender error:', error);
        res.status(500).send('Prerendering failed');
    }
});

app.listen(PORT, () => {
    console.log(`Prerender server running on port ${PORT}`);
});
```

**Nginx configuration for self-hosted**:

```nginx
location / {
    # Detect bot traffic
    if ($http_user_agent ~* "bot|crawler|spider") {
        proxy_pass http://localhost:3000/render?url=$scheme://$host$request_uri;
    }

    # Serve SPA for regular users
    try_files $uri $uri/ /index.html;
}
```

### URL Rewriting for Clean URLs (Optional)

If you need clean URLs for marketing/branding, use CDN/Nginx rewriting:

```nginx
# Rewrite clean URLs to query parameters
location ~ ^/user/profile/([0-9]+)$ {
    rewrite ^/user/profile/([0-9]+)$ /#/user/profile?userId=$1 permanent;
}

location ~ ^/blog/post/([a-zA-Z0-9-]+)$ {
    rewrite ^/blog/post/([a-zA-Z0-9-]+)$ /#/blog/post?slug=$1 permanent;
}
```

### SEO Best Practices with ViewLogic

**1. Use Meaningful Route Names**
```javascript
// ✅ GOOD: Descriptive route names
src/views/user/profile.html    → #/user/profile?userId=123
src/views/blog/post.html       → #/blog/post?slug=seo-guide

// ❌ BAD: Generic names
src/views/view1.html           → #/view1?id=123
```

**2. Include Meta Tags in Layouts**
```html
<!-- src/layouts/default.html -->
<head>
    <title>{{ pageTitle || 'ViewLogic App' }}</title>
    <meta name="description" :content="pageDescription || 'Default description'">
    <meta property="og:title" :content="pageTitle">
    <meta property="og:description" :content="pageDescription">
</head>
```

**3. Update Meta Tags Dynamically**
```javascript
// src/logic/blog/post.js
export default {
    dataURL: '/api/posts/{slug}',

    mounted() {
        // Update meta tags for SEO
        document.title = `${this.post.title} | Your Blog`;

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', this.post.excerpt);
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', this.post.title);
        }
    }
};
```

**4. Implement Structured Data**
```javascript
// src/logic/product/detail.js
export default {
    mounted() {
        // Add JSON-LD structured data
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": this.product.name,
            "description": this.product.description,
            "image": this.product.image,
            "offers": {
                "@type": "Offer",
                "price": this.product.price,
                "priceCurrency": "USD"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
};
```

### When to Use Prerendering

**Use Prerendering for**:
- ✅ Public-facing websites (blogs, e-commerce, marketing sites)
- ✅ Content that needs to be indexed by search engines
- ✅ Social media sharing (Open Graph, Twitter Cards)
- ✅ Sites requiring high SEO performance

**Don't Need Prerendering for**:
- ❌ Admin panels (no SEO requirements)
- ❌ Internal tools (behind authentication)
- ❌ Private dashboards (not public-facing)
- ❌ Developer tools (no search engine indexing needed)

### Performance Impact

Prerendering does **not** impact regular user experience:
- Regular users: Get SPA with instant navigation (no prerendering overhead)
- Search bots: Get prerendered HTML (slower but indexed correctly)

This approach gives you the best of both worlds: fast SPA for users + great SEO for bots.

---

## Forms and Data Handling

ViewLogic provides automatic form processing with minimal JavaScript:

### Basic Form

```html
<form action="/api/users" method="POST"
      data-success="onUserCreated"
      data-error="onFormError"
      data-loading="setLoading">
    <Input v-model="userData.name" name="name" label="Name" required />
    <Input v-model="userData.email" name="email" type="email" label="Email" required />
    <Button type="submit">Create User</Button>
</form>
```

```javascript
export default {
    data() {
        return {
            userData: { name: '', email: '' },
            loading: false
        };
    },
    methods: {
        onUserCreated(response, form) {
            this.log('info', 'User created', response);
            this.$state.set('newUser', response);
            this.navigateTo('user-list');
        },

        onFormError(error, form) {
            this.log('error', 'Form error', error);
            alert(`Error: ${error.message}`);
        },

        setLoading(isLoading, form) {
            this.loading = isLoading;
        }
    }
};
```

### Form with Parameter Substitution

```html
<!-- Update existing user: PUT /api/users/123 -->
<form action="/api/users/{userId}" method="PUT"
      data-success="onUserUpdated"
      data-redirect="user-profile">
    <Input v-model="user.name" name="name" label="Name" />
    <Input v-model="user.email" name="email" label="Email" />
    <Button type="submit">Save Changes</Button>
</form>
```

### File Upload Form

```html
<form action="/api/upload" method="POST"
      enctype="multipart/form-data"
      data-success="onFileUploaded">
    <FileUpload name="file" accept="image/*" />
    <Input v-model="description" name="description" label="Description" />
    <Button type="submit">Upload</Button>
</form>
```

### Form Validation

```html
<form action="/api/contact" method="POST">
    <Input
        v-model="email"
        name="email"
        type="email"
        label="Email"
        data-validation="validateEmail"
        required
    />
    <textarea
        v-model="message"
        name="message"
        data-validation="validateMessage"
        required
    ></textarea>
    <Button type="submit">Send</Button>
</form>
```

```javascript
methods: {
    validateEmail(value, input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.setCustomValidity('Please enter a valid email');
            return false;
        }
        input.setCustomValidity('');
        return true;
    },

    validateMessage(value, input) {
        if (value.length < 10) {
            input.setCustomValidity('Message must be at least 10 characters');
            return false;
        }
        input.setCustomValidity('');
        return true;
    }
}
```

### Form Attributes Reference

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `action` | API endpoint (supports parameter substitution) | `action="/api/users/{userId}"` |
| `method` | HTTP method | `method="POST"` or `method="PUT"` |
| `data-success` | Success callback method name | `data-success="onSaveSuccess"` |
| `data-error` | Error callback method name | `data-error="onSaveError"` |
| `data-loading` | Loading state callback | `data-loading="setLoading"` |
| `data-redirect` | Route to navigate to on success | `data-redirect="user-list"` |
| `data-validation` | Validation function name | `data-validation="validateField"` |

---

## Internationalization

### Setting Up i18n

Create translation files in `i18n/` folder:

```json
// i18n/en.json
{
    "welcome": {
        "message": "Welcome to ViewLogic!",
        "user": "Hello, {name}!"
    },
    "buttons": {
        "save": "Save",
        "cancel": "Cancel",
        "delete": "Delete"
    },
    "errors": {
        "validation": {
            "required": "This field is required",
            "email": "Please enter a valid email"
        }
    }
}
```

```json
// i18n/ko.json
{
    "welcome": {
        "message": "ViewLogic에 오신 것을 환영합니다!",
        "user": "안녕하세요, {name}님!"
    },
    "buttons": {
        "save": "저장",
        "cancel": "취소",
        "delete": "삭제"
    },
    "errors": {
        "validation": {
            "required": "필수 입력 항목입니다",
            "email": "올바른 이메일을 입력하세요"
        }
    }
}
```

### Using Translations

```html
<!-- In templates -->
<div class="welcome">
    <h1>{{ $t('welcome.message') }}</h1>
    <p>{{ $t('welcome.user', { name: userName }) }}</p>
    <Button>{{ $t('buttons.save') }}</Button>
    <Button>{{ $t('buttons.cancel') }}</Button>
</div>
```

```javascript
// In logic
export default {
    methods: {
        showWelcome() {
            const message = this.$t('welcome.message');
            const userMessage = this.$t('welcome.user', { name: this.user.name });
            console.log(message);
        },

        // Change language
        async switchLanguage(lang) {
            await this.setLanguage(lang);  // 'en', 'ko', 'ja', etc.
            // UI automatically updates
        },

        // Get current language
        getCurrentLang() {
            const lang = this.getLanguage();
            console.log('Current language:', lang);
        }
    }
};
```

### Language Switcher Component

```javascript
// Use built-in LanguageSwitcher component
<LanguageSwitcher :languages="['en', 'ko', 'ja']" />
```

---

## Quality Assurance

### Pre-Development Checklist

Before starting any development:

1. ✅ Read and understand existing code structure
2. ✅ Check `css/base.css` for existing styles
3. ✅ Check `src/components/` for existing components
4. ✅ Verify naming conventions match project standards
5. ✅ Identify reusable patterns

### Development Checklist

While developing:

1. ✅ Follow view-logic separation strictly
2. ✅ Use existing components before creating new ones
3. ✅ Avoid CSS duplication (check base.css first)
4. ✅ Use consistent data structures
5. ✅ Add proper error handling
6. ✅ Include logging for debugging
7. ✅ Validate all user inputs
8. ✅ Test with different parameter combinations

### Post-Development Checklist

After completing feature:

1. ✅ Remove unused code and imports
2. ✅ Clean up console.log statements (use this.log instead)
3. ✅ Check for CSS duplication across files
4. ✅ Verify responsive design (mobile/tablet/desktop)
5. ✅ Test error scenarios
6. ✅ Test with missing/invalid parameters
7. ✅ Verify navigation flows
8. ✅ Run quality checks:

```bash
npm run lint       # Code style check
npm run typecheck  # Type validation
npm run build:dev  # Development build test
```

### Code Quality Standards

```javascript
// ✅ GOOD: Clear, documented code
/**
 * Loads user profile data from API
 * @param {number|string} userId - User ID to load
 * @returns {Promise<Object>} User profile data
 */
async loadUserProfile(userId) {
    try {
        const profile = await this.$api.get(`/api/users/${userId}/profile`);
        this.log('info', 'Profile loaded', { userId });
        return profile;
    } catch (error) {
        this.log('error', 'Failed to load profile', { userId, error });
        throw error;
    }
}

// ❌ BAD: Unclear, undocumented code
async load(id) {
    const p = await this.$api.get(`/api/users/${id}/profile`);
    return p;
}
```

### Testing Scenarios

Test these scenarios for every feature:

1. **Happy path**: Normal usage with valid data
2. **Empty state**: No data available
3. **Loading state**: Data is loading
4. **Error state**: API errors, network failures
5. **Edge cases**: Extreme values, special characters
6. **Responsiveness**: Mobile, tablet, desktop views
7. **Navigation**: All navigation paths work
8. **Parameters**: Missing, invalid, or unexpected parameters

---

## Production Build

### Build Process

```bash
# Standard production build
npm run build

# Full optimization build
npm run build:prod

# Development build (with source maps)
npm run build:dev

# Clean build (remove cache)
npm run build:fresh
```

### Build Output

After building, the `routes/` folder contains optimized bundles:

```
routes/
├── home.js           # Optimized home route bundle
├── user-profile.js   # Optimized user-profile route bundle
├── dashboard.js      # Optimized dashboard route bundle
└── _components.js    # Shared components bundle
```

### Build Optimization Checklist

Before production deployment:

1. ✅ Run `npm run build:prod` for full optimization
2. ✅ Test production build with `npm run serve`
3. ✅ Verify all routes load correctly
4. ✅ Check bundle sizes with `npm run analyze`
5. ✅ Verify API endpoints are production URLs
6. ✅ Test authentication flows
7. ✅ Verify i18n works in all languages
8. ✅ Check console for errors
9. ✅ Test in different browsers
10. ✅ Verify responsive design

### Performance Optimization

ViewLogic automatically optimizes:

- ✅ **Code splitting**: Each route is a separate bundle
- ✅ **Tree shaking**: Unused code is eliminated
- ✅ **Minification**: Code is compressed
- ✅ **Lazy loading**: Routes load on demand
- ✅ **Caching**: Smart caching with TTL
- ✅ **Component bundling**: Shared components are extracted

### Bundle Size Guidelines

Keep bundle sizes reasonable:

- **Per-route bundle**: < 100KB (minified)
- **Shared components**: < 150KB (minified)
- **Total initial load**: < 200KB (minified)

Check sizes:
```bash
npm run analyze
```

---

## Common Patterns

### Master-Detail View

```javascript
// List page (src/logic/users.js)
export default {
    dataURL: '/api/users',
    methods: {
        viewUser(user) {
            this.$state.set('selectedUser', user);
            this.navigateTo('user-detail', { userId: user.id });
        }
    }
};

// Detail page (src/logic/user-detail.js)
export default {
    dataURL: '/api/users/{userId}',
    data() {
        return {
            user: null
        };
    },
    mounted() {
        // Data auto-loaded via dataURL
        this.user = this.userData;  // From dataURL
    }
};
```

### CRUD Operations

```javascript
export default {
    dataURL: '/api/items',

    methods: {
        // Create
        async createItem(itemData) {
            const newItem = await this.$api.post('/api/items', itemData);
            this.items.push(newItem);
            this.log('info', 'Item created', newItem);
        },

        // Read (auto-loaded via dataURL)
        // this.items is populated automatically

        // Update
        async updateItem(itemId, updates) {
            const updated = await this.$api.put(`/api/items/${itemId}`, updates);
            const index = this.items.findIndex(i => i.id === itemId);
            if (index !== -1) {
                this.items[index] = updated;
            }
            this.log('info', 'Item updated', updated);
        },

        // Delete
        async deleteItem(itemId) {
            await this.$api.delete(`/api/items/${itemId}`);
            this.items = this.items.filter(i => i.id !== itemId);
            this.log('info', 'Item deleted', { itemId });
        }
    }
};
```

### Pagination

```javascript
export default {
    dataURL: {
        items: '/api/items?page={page}&limit={limit}'
    },

    data() {
        return {
            page: 1,
            limit: 10,
            total: 0
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.total / this.limit);
        }
    },

    methods: {
        async changePage(newPage) {
            this.$query.page = newPage;
            this.$query.limit = this.limit;
            await this.fetchData();  // Refetch with new params
        },

        async nextPage() {
            if (this.page < this.totalPages) {
                await this.changePage(this.page + 1);
            }
        },

        async prevPage() {
            if (this.page > 1) {
                await this.changePage(this.page - 1);
            }
        }
    }
};
```

### Search and Filter

```javascript
export default {
    dataURL: {
        items: '/api/items?search={search}&category={category}&sort={sort}'
    },

    data() {
        return {
            search: '',
            category: 'all',
            sort: 'name'
        };
    },

    methods: {
        async applyFilters() {
            this.$query.search = this.search;
            this.$query.category = this.category;
            this.$query.sort = this.sort;
            await this.fetchData();  // Refetch with new filters
        },

        async resetFilters() {
            this.search = '';
            this.category = 'all';
            this.sort = 'name';
            await this.applyFilters();
        }
    }
};
```

---

## Troubleshooting

### Common Issues

**Issue**: Route not loading
- ✅ Check filename matches route name exactly
- ✅ Verify files exist in correct folders
- ✅ Check console for errors
- ✅ Verify export default in logic file

**Issue**: Styles not applying
- ✅ Check CSS file is linked correctly
- ✅ Verify class names match template
- ✅ Check for CSS specificity conflicts
- ✅ Inspect element in browser DevTools

**Issue**: Component not found
- ✅ Check component file exists in `src/components/`
- ✅ Verify component name is PascalCase
- ✅ Check component has `name` property
- ✅ Verify component export default

**Issue**: API calls failing
- ✅ Check API endpoint URL is correct
- ✅ Verify authentication token if required
- ✅ Check CORS settings
- ✅ Inspect network tab in DevTools
- ✅ Verify parameter substitution syntax

**Issue**: Parameters not working
- ✅ Check URL format: `#/route?param=value`
- ✅ Use `this.getParam('name')` not `this.$query.name`
- ✅ Verify parameter names match
- ✅ Check for typos in parameter substitution

### Debug Mode

Enable debug logging:

```javascript
// In router configuration
ViewLogicRouter({
    environment: 'development',
    logLevel: 'debug'  // Shows all logs
});

// In components
this.log('debug', 'Debug info', { data: this.data });
```

### Browser DevTools

Use browser tools effectively:

1. **Console**: Check for errors and logs
2. **Network**: Inspect API calls and responses
3. **Vue DevTools**: Inspect component state and props
4. **Elements**: Inspect DOM and CSS
5. **Application**: Check localStorage/sessionStorage

---

## AI Development Tips

### For AI Code Generators

When generating ViewLogic code:

1. **Always separate concerns**
   - Create separate view, logic, and style files
   - Never mix HTML and JavaScript in one file

2. **Follow naming conventions exactly**
   - Flat structure:
     - Views: `src/views/{route-name}.html`
     - Logic: `src/logic/{route-name}.js`
     - Styles: `src/styles/{route-name}.css`
   - Nested structure:
     - Views: `src/views/{module}/{page}.html`
     - Logic: `src/logic/{module}/{page}.js`
     - Styles: `src/styles/{module}/{page}.css`
     - Keep folder structure identical across views/, logic/, and styles/
   - Components (global only, flat structure): `src/components/{ComponentName}.js`
   - NO nested folders in components (use inline components for module-specific needs)

3. **Check for existing patterns**
   - Search for similar existing components
   - Reuse existing CSS from base.css
   - Follow established data structures

4. **Include proper error handling**
   - Wrap API calls in try-catch
   - Use this.log() for debugging
   - Handle loading and error states

5. **Generate complete features**
   - Don't leave TODO comments
   - Implement full CRUD operations
   - Include validation and error handling

6. **Maintain consistency**
   - Use same data structure across related pages
   - Follow existing code style
   - Match UI patterns from existing pages

### Code Generation Checklist

When AI generates code, verify:

- ✅ File structure matches conventions
- ✅ All imports/exports are correct
- ✅ No duplication of existing code
- ✅ Proper error handling included
- ✅ Logging statements added
- ✅ Validation implemented
- ✅ Responsive design considered
- ✅ Comments explain complex logic
- ✅ No hardcoded values (use config/constants)
- ✅ Follows ViewLogic API patterns

---

## Summary

**Key Principles for AI Development**:

1. **Separation of Concerns**: View (HTML) ≠ Logic (JS) ≠ Style (CSS)
2. **Convention Over Configuration**: Follow naming patterns exactly
3. **Reuse Before Create**: Check existing components and styles first
4. **Error Handling**: Always handle errors properly
5. **Consistency**: Match existing patterns and structures
6. **Quality**: Run lint and typecheck before finishing

**Essential File Patterns**:

Flat structure (small projects):
```
src/views/{page-name}.html      → Template
src/logic/{page-name}.js        → Component logic
src/styles/{page-name}.css      → Page styles (if unique)
src/components/{Name}.js        → Reusable component
css/base.css                    → Global styles
```

Nested structure (medium/large projects):
```
src/views/{module}/{page}.html           → Template
src/logic/{module}/{page}.js             → Component logic
src/styles/{module}/{page}.css           → Page styles (if unique)
src/components/{Name}.js                 → Global components only (flat structure)
src/views/{module}/{sub}/{page}.html     → Deeply nested template
src/logic/{module}/{sub}/{page}.js       → Deeply nested logic
```

**Important**: Components folder does NOT support nested structure. Use inline components for module-specific needs.

**Must-Use APIs**:
- `this.$api.get/post/put/delete()` - API calls
- `this.$state.get/set()` - State management
- `this.navigateTo()` - Navigation
- `this.getParam()` - Get URL parameters
- `this.log()` - Logging
- `this.$t()` - Translations

**Quality Checks**:
```bash
npm run lint       # Code style
npm run typecheck  # Type checking
npm run build:dev  # Build test
```

---

**Remember**: This guide ensures consistent, maintainable ViewLogic applications. Follow these conventions exactly for best results with AI-assisted development.

For issues or questions, refer to:
- [README.md](README.md) - Project overview and quick start
- [CLAUDE.md](CLAUDE.md) - Claude-specific development rules
- [ViewLogic Documentation](https://github.com/hopegiver/viewlogic) - Framework documentation
