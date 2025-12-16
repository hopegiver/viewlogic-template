# ViewLogic Template

> ViewLogic application template with zero build development

## Quick Start

```bash
npm run dev
# Open http://localhost:8000
```

## Project Structure

```
src/
├── views/          # HTML templates
├── logic/          # JavaScript logic
├── components/     # Global components
└── layouts/        # Layout templates

css/
└── base.css        # Global styles
i18n/               # Translations
```

## Creating a Page

**1. View** (`src/views/hello.html`):
```html
<div class="hello-page">
    <h1>{{ message }}</h1>
    <Button @click="increment">Count: {{ count }}</Button>
</div>
```

**2. Logic** (`src/logic/hello.js`):
```javascript
export default {
    data() {
        return { message: 'Hello!', count: 0 };
    },
    methods: {
        increment() { this.count++; }
    }
};
```

**3. Navigate to** `#/hello`

## Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run build:prod   # Full optimization
```

## Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Complete development guide (AI-friendly)
- **[CLAUDE.md](CLAUDE.md)** - Claude Code guidelines
- **[ViewLogic Docs](https://github.com/hopegiver/viewlogic)** - Framework documentation

## Development Rules

**Before coding, read [CONTRIBUTING.md](CONTRIBUTING.md)!**

Quick rules:
1. Separate concerns: `views/` (HTML) ≠ `logic/` (JS) ≠ `styles/` (CSS)
2. Check `css/base.css` before adding styles
3. Reuse `src/components/` before creating new ones
4. Follow naming: `views/page.html` → `logic/page.js` → `styles/page.css`

## License

MIT
