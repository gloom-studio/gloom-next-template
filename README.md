This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

After cloning (or creating a repo from this template), install dependencies once. The `prepare` script in `package.json` runs **Husky** automatically during that install, so Git hooks are wired up—you do not need to run `pnpm run prepare` by hand.

Use a normal install and avoid skipping lifecycle scripts (`pnpm install --ignore-scripts` will skip Husky). In Docker or CI where hooks are not needed, you can set `HUSKY=0` for that install.

```bash
pnpm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

This template includes **Vitest** + **Testing Library** for fast unit/component tests and **Playwright** for end-to-end checks (auth + protected routes).

### Prerequisites

- Copy [`.env.example`](./.env.example) to `.env` / `.env.local` and set at least `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `NEXT_PUBLIC_BETTER_AUTH_URL`.
- Run Prisma against your database (see your usual `pnpm exec prisma` workflow) so the Better Auth tables exist.
- Generate the Prisma client if needed (`pnpm exec prisma generate`).

### Unit / component tests

```bash
pnpm test:unit
pnpm test:unit:watch
```

Tests live under [`tests/unit/`](./tests/unit/).

### End-to-end tests

Install the Playwright browser once per machine:

```bash
pnpm test:e2e:install
```

`pnpm test:e2e` starts `pnpm dev` automatically (unless you reuse an existing server locally), runs [`tests/e2e/global-setup.ts`](./tests/e2e/global-setup.ts) to **reset and seed** a deterministic user, then runs specs in [`tests/e2e/`](./tests/e2e/).

Default credentials (override with env vars from `.env.example`):

- Email: `e2e-user@test.local`
- Password: `E2e_pass_1!`

To seed manually while a dev server is already running:

```bash
pnpm test:seed
```

Run everything (format/lint not included):

```bash
pnpm test:all
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
