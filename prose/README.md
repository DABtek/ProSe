# ProSe Web MVP

Web MVP for family-court self-representation workflows.

## Current Architecture

- `Next.js 16` app router
- `Prisma` with `PostgreSQL` models (`User`, `Case`, `Document`, `Deadline`)
- `NextAuth` credentials auth
- User- and case-scoped document APIs
- Mobile/tablet/desktop wireframe-aligned UI components

## Environment

Copy `.env.example` to `.env` and set values:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prose?schema=public"
AUTH_SECRET="replace-with-a-long-random-secret"
PROSE_DEMO_MODE="true"
```

## Install

```bash
npm install
```

## Database

Generate client:

```bash
npm run prisma:generate
```

Apply schema (requires running Postgres):

```bash
npm run prisma:migrate
```

Optional DB UI:

```bash
npm run prisma:studio
```

## Run

```bash
npm run dev
```

- App: `http://localhost:3000`
- Sign in: `http://localhost:3000/signin`
- Register: `http://localhost:3000/register`

## Demo Mode

- `PROSE_DEMO_MODE="true"` lets you browse the app without creating an account or running Postgres.
- It uses a mock session and local JSON metadata in `.data/demo-documents.json`.
- Set `PROSE_DEMO_MODE="false"` when you are ready to use real auth + Postgres-backed case data.

## Auth + Case Scoping

- Protected app pages are enforced via `src/proxy.ts`.
- `/api/documents` and `/api/upload` require session auth.
- Documents are read/written against the active case for the authenticated user.

## UI Contract

Reusable UI contracts live in:

- `src/contracts/wireframe.ts`
- `src/components/WireframeInserts.tsx`
- `src/components/DesktopShell.tsx`

Use these components/types when extending pages to keep wireframe parity stable.
