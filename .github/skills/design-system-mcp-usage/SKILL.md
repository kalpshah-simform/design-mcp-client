---
name: design-system-mcp-usage
description: Use the Design System MCP server to fetch themes and component metadata, then generate UI code that strictly follows returned tokens, components, and accessibility requirements.
---

# Design System MCP Skill

Use this skill whenever a user asks to generate or modify UI using the Design System MCP server.

## Server

- Base URL: http://localhost:3000
- MCP Streamable HTTP endpoints:
	- `POST /`
	- `POST /mcp`
- For MCP clients, use either:
	- `http://localhost:3000`
	- `http://localhost:3000/mcp`
- Health check: GET /health

## VS Code MCP Client Config

Use top-level `servers` (not `mcpServers`):

```json
{
	"servers": {
		"design-system": {
			"type": "streamable-http",
			"url": "http://localhost:3000"
		}
	}
}
```

Alternative:

```json
{
	"servers": {
		"design-system": {
			"type": "streamable-http",
			"url": "http://localhost:3000/mcp"
		}
	}
}
```

If MCP logs show `Route POST:/ not found`, restart the server so the latest code is running.

## Output Contract

All tool endpoints return one envelope:

```json
{ "success": true, "data": ... }
```

Errors return:

```json
{ "success": false, "error": { "code": "...", "message": "..." } }
```

Always validate `success` before using `data`.

## Tools

1. `GET /tools/get-theme?theme=<theme>`
- Default theme: `default`
- Allowed themes: `default`, `customer-a`, `customer-b`
- Returns tokens: colors, typography, spacing, radius, shadows, and `a11y`

2. `GET /tools/list-components`
- Returns all valid component names

3. `GET /tools/search-components?q=<intent>`
- Natural-language search across component name/description/tags
- Returns component names sorted by relevance

4. `GET /tools/get-component-details?name=<component>`
- Returns description, props, examples, tags for one component

## Mandatory Workflow

When asked to generate UI, call tools in this order:

1. `get-theme`
2. `list-components`
3. `search-components` using user intent
4. `get-component-details` for each selected component
5. Generate code using only retrieved tokens/components

## Generation Rules (Strict)

- Use only color tokens from `get-theme`.
- Use only spacing tokens from `get-theme`.
- Do not hardcode hex or spacing pixel values when token equivalents exist.
- Use only components returned by `list-components`.
- Do not invent component names.
- Follow JSX syntax patterns from `examples` in `get-component-details`.
- Enforce `a11y.buttonMinHeight` (44px) on interactive elements.
- If `a11y.requiredAria` is `true`, include appropriate ARIA attributes on interactive components.

## Error Handling

- `THEME_NOT_FOUND` (404): ask for a valid theme or fall back to `default` if user allows.
- `INVALID_REQUEST` (400): fix missing query params (`name` or `q`) and retry.
- `COMPONENT_NOT_FOUND` (404): re-check exact component name from `list-components` and retry.

## Known Components

- Button
- Input
- Card
- Modal
- DataTable

## Known Theme Defaults

- default: primary `#0052CC`
- customer-a: primary `#0A7A5D`
- customer-b: primary `#BF4B00`

## Practical Prompt Pattern

When implementing a UI request:

1. Resolve theme from user context (default if unspecified).
2. Discover and shortlist components via intent search.
3. Pull detailed metadata for shortlisted components.
4. Produce implementation that references fetched design tokens and component props.
5. Include ARIA coverage in the output if required by theme a11y config.
