<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Next.js agents (MCP)

- At the start of work on this repo, use the **Next.js DevTools** MCP **`init`** tool, then use **`nextjs_docs`** (and the docs index resource) for any Next.js behavior, APIs, or config—**not** training-data defaults.
- **Runtime tools** from that MCP need **`pnpm dev`** running (Next 16+).

## Lint and format (Oxc)

- **Lint:** `pnpm lint` / `pnpm lint:fix` — Oxlint with type-aware + type-check (see `.oxlintrc.json`). Requires **`oxlint-tsgolint`** (already a dev dependency).
- **Format:** `pnpm format` / `pnpm format:check` — Oxfmt (see `.oxfmtrc.json`).
- **Both:** `pnpm check`.
- Prefer this stack over ad hoc Prettier/ESLint unless the team explicitly standardizes on something else.

## This template’s stack (pointers)

- **Database:** Prisma — `prisma/schema.prisma`, `prisma.config.ts`; use `pnpm exec prisma` for CLI tasks. Do not commit secrets; align new env vars with `.env.example`.
- **Auth:** Better Auth — use project patterns and the **Better Auth** MCP when unsure of APIs.
- **UI:** shadcn/ui + Tailwind v4 — reuse `components/ui/`; the **shadcn** MCP can scaffold or adjust components.

## MCP configuration

Project servers live in **`.cursor/mcp.json`**: `next-devtools`, `prisma`, `shadcn`, `better-auth`. Disable any you do not use in a given clone.
