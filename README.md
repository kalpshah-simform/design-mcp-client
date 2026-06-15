# Design System MCP Client

A React demo application that consumes a [Design System MCP server](USAGE.md) to generate UI components and pages that are validated against live design tokens, component metadata, and accessibility rules.

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS (design-token-aligned config) |
| Routing | React Router v6 |
| Component explorer | Storybook 10 |
| Testing | Vitest + Playwright (via Storybook addon) |
| MCP integration | `@storybook/addon-mcp` + `.mcp.json` |

## Getting Started

### Prerequisites

- Node.js 18+
- The Design System MCP server running at `http://localhost:3000` (see [USAGE.md](USAGE.md))

### Install

```bash
npm install
```

### Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Run Storybook

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006).

### Build

```bash
npm run build       # production app build
npm run build-storybook  # static Storybook build
```

### Run story tests

```bash
npx vitest --project=storybook
```

---

## Project Structure

```
src/
├── components/
│   └── ui/                  # Design system components
│       ├── Button.tsx
│       ├── Button.stories.tsx
│       ├── Input.tsx
│       ├── Input.stories.tsx
│       ├── Card.tsx
│       ├── Card.stories.tsx
│       ├── Modal.tsx
│       ├── Modal.stories.tsx
│       ├── DataTable.tsx
│       ├── DataTable.stories.tsx
│       └── index.ts
├── data/
│   ├── analytics.ts         # Mock analytics data + fetch helpers
│   └── projects.ts          # Mock project data + fetch helpers
├── pages/
│   ├── Analytics/           # Analytics dashboard page
│   └── ProjectManagement/   # Project management page
└── index.css                # Tailwind entry point
.storybook/
├── main.ts                  # Storybook config (react-vite framework)
└── preview.tsx              # Global decorators + Tailwind CSS import
tailwind.config.js           # Design tokens from MCP get-tailwind-theme
.mcp.json                    # MCP server connection (localhost:3000)
```

---

## Design System Components

All components are implemented against the MCP server's component specification. Props and variants are validated via `validate-design` and `validate-accessibility`.

| Component | Props | MCP spec |
|-----------|-------|----------|
| `Button` | `variant` (primary/secondary), `size` (sm/md/lg) | ✅ Validated |
| `Input` | `type` (text/email/password/search/date), `size` (sm/md/lg) | ✅ Validated |
| `Card` | `elevation` (none/sm/md), `padding` (sm/md/lg) | ✅ Validated |
| `Modal` | `size` (sm/md/lg), `dismissible` (bool) | ✅ Validated |
| `DataTable` | `density` (compact/comfortable), `pagination` (bool), `pageSize` | ✅ Validated |

All interactive components meet the `a11y.buttonMinHeight: 44px` touch target rule and include required ARIA attributes.

---

## Design Tokens

Tailwind is configured with tokens sourced directly from the MCP server's `get-tailwind-theme` response. **Never hardcode hex values or pixel sizes in components** — always use the token classes.

| Token group | Example classes |
|-------------|----------------|
| Colors | `bg-primary`, `text-secondary`, `bg-surface`, `text-gray-600` |
| Spacing | `p-sm`, `gap-md`, `px-lg` |
| Shadow | `shadow-sm`, `shadow-md` |
| Radius | `rounded-sm`, `rounded-md`, `rounded-lg` |
| A11y | `min-h-touch` (44px — required for all interactive elements) |

---

## MCP Server Integration

The app connects to the Design System MCP server via `.mcp.json`:

```json
{
  "mcpServers": {
    "design-system": {
      "type": "streamable-http",
      "url": "http://localhost:3000"
    }
  }
}
```

Available tools span three phases — see [USAGE.md](USAGE.md) for the full reference.

| Phase | Tools |
|-------|-------|
| 1 — Discovery | `get-theme`, `list-components`, `get-component-details`, `search-components` |
| 2 — Layout & Validation | `get-layout-patterns`, `validate-design` |
| 3 — Enhanced | `get-tailwind-theme`, `list-component-stories`, `get-component-deprecated`, `validate-accessibility` |

---

## Pages

### Project Management (`/projects`)

- Filterable and sortable project table using `DataTable` with built-in pagination
- Create project modal using `Modal` + `Input` + `Button`
- Search and filter toolbar using `Input` + `Button`

### Analytics (`/analytics`)

- KPI cards using `Card`
- Revenue Over Time bar chart (pure CSS, no chart library)
- Traffic by Channel horizontal bar chart
- Recent activity table using `DataTable`
- Date range selector and JSON export

---

## Storybook

Stories live alongside each component (`*.stories.tsx`). Each story uses:

- `tags: ['autodocs']` — auto-generates a Props documentation page
- `argTypes` — exposes controls for all relevant props in the Controls panel
- `@storybook/addon-a11y` — runs WCAG accessibility checks on every story
- `@storybook/addon-mcp` — connects Storybook to the MCP server for AI-assisted component discovery

| Story file | Stories |
|------------|---------|
| `Button.stories.tsx` | Primary, Secondary, Disabled, Small, Large |
| `Input.stories.tsx` | Text, Email, Password, Disabled |
| `Card.stories.tsx` | Default, Flat, Elevated |
| `Modal.stories.tsx` | Default, Small, NonDismissible |
| `DataTable.stories.tsx` | WithoutPagination, WithPagination, Compact |
