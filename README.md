# Next.js Starter Template

A production-ready starter built on **Next.js App Router** with authentication, Prisma-backed persistence, reusable UI primitives, and a baseline testing stack.

## What this template includes

- **Framework:** Next.js 16 (App Router) + React 19
- **Auth:** Better Auth (email/password) with route protection
- **Database:** Prisma + PostgreSQL
- **UI:** shadcn/ui components + Tailwind CSS v4
- **Quality:** Oxfmt + Oxlint + Husky + lint-staged
- **Testing:** Vitest + Testing Library + Playwright

## Auth flow and routes

The template ships with:

- `/login`
- `/register`
- `/dashboard` (protected)

Access control is enforced in [`proxy.ts`](./proxy.ts):

- unauthenticated users are redirected from `/dashboard` to `/login`
- authenticated users are redirected away from `/login` and `/register` to `/dashboard`

## Project structure

Commonly customized areas:

- [`app/`](./app/) - route segments and pages
- [`components/auth/`](./components/auth/) - auth forms, fields, and sign-out
- [`components/ui/`](./components/ui/) - reusable UI primitives
- [`lib/`](./lib/) - auth client/server setup, shared helpers
- [`prisma/`](./prisma/) - schema and DB config
- [`tests/unit/`](./tests/unit/) - unit/component tests
- [`tests/e2e/`](./tests/e2e/) - end-to-end tests

## Getting started

Use the CLI to scaffold this template:

```bash
pnpm create gloom next
```

Then:

```bash
cd <your-project-name>
cp .env.example .env
pnpm install
```

Configure required variables in `.env`:

- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_BETTER_AUTH_URL`
- `DATABASE_URL`

Prepare database:

```bash
pnpm exec prisma generate
# then run your preferred migrate/push flow
```

Start development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` - run local dev server
- `pnpm build` - production build
- `pnpm start` - run production server
- `pnpm format` / `pnpm format:check` - format code with Oxfmt
- `pnpm lint` / `pnpm lint:fix` - lint with Oxlint
- `pnpm check` - format + lint

## Testing

### Unit and component tests

```bash
pnpm test:unit
pnpm test:unit:watch
```

### E2E tests

Install browser once:

```bash
pnpm test:e2e:install
```

Run E2E:

```bash
pnpm test:e2e
```

Useful extras:

- `pnpm test:e2e:ui` - Playwright UI mode
- `pnpm test:e2e:headed` - headed browser mode
- `pnpm test:seed` - manually seed deterministic E2E auth user
- `pnpm test:all` - unit + e2e

Default E2E user (overridable via env):

- email: `e2e-user@test.local`
- password: `E2e_pass_1!`

## Customization notes

- Replace or remove starter page content in route components under `app/`.
- Auth forms are componentized in [`components/auth/forms/`](./components/auth/forms/).
- Validation helpers live in [`lib/auth/validators.ts`](./lib/auth/validators.ts).
- Dashboard content is split from route shell for easier replacement.

## Deployment

Deploy to any platform that supports Next.js + Node + PostgreSQL.

Before deploying:

- set production env vars (`BETTER_AUTH_URL`, `NEXT_PUBLIC_BETTER_AUTH_URL`, `DATABASE_URL`, `BETTER_AUTH_SECRET`)
- run Prisma generate/migrations in CI or release workflow
- run `pnpm check` and tests in CI
