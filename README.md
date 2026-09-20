# Michael Brylinski Portfolio

Next.js portfolio with a private **Mission Control** career OS at `/admin/mission-control`.

## Scripts

```bash
npm run dev      # turbopack dev server
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (SEO) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token for Mission Control JSON (optional in local dev) |

Without a Blob token, Mission Control stores JSON under `.data/mission/` on disk. Production should set `BLOB_READ_WRITE_TOKEN`.


## Mission Control

Private dashboard for the six-month mission:

**Remote engineering job → financial runway → RV life**

- URL: `/admin/mission-control`
- Login: `/admin/login`
- Public portfolio routes are unchanged and do not render admin chrome

### Authentication

- Hardcoded password in `lib/mission/constants.ts` (`ADMIN_PASSWORD`)
- HTTP-only signed session cookie (`mission_session`, 7-day TTL)
- `middleware.ts` gates `/admin/*` (except login) and mission API routes
- Unauthenticated page visits redirect to login; APIs return `401`

### Vercel Blob setup

1. In the Vercel project, create a Blob store and copy the read/write token.
2. Set `BLOB_READ_WRITE_TOKEN` in Vercel env (Production + Preview as needed).
3. Mission data is stored as **private** JSON blobs under `mission/`.
4. Blob URLs are never sent to the browser; all reads/writes go through server routes.

Suggested paths:

- `mission/settings.json`
- `mission/goals.json`
- `mission/phases.json`
- `mission/activities.json`
- `mission/applications.json`
- `mission/recruiters.json`
- `mission/interviews.json`
- `mission/finances.json`
- `mission/rv-readiness.json`
- `mission/backups/*` (previous versions on write)

First authenticated load seeds the six-month plan/tasks only (no fake applications, recruiters, or finances).

### API

Authenticated route handlers:

- `GET/PATCH /api/mission`
- `GET/POST/PATCH/DELETE /api/applications`
- `GET/POST/PATCH/DELETE /api/recruiters`
- `GET/POST/PATCH/DELETE /api/activities`
- `GET/PATCH /api/goals`
- `GET/PATCH /api/finances`
- `GET/PATCH /api/rv`
- `GET/PATCH /api/interviews`
- `GET /api/export?type=json|applications|recruiters|activities`
- `POST /api/import`
- `POST /api/auth/login`
- `POST /api/auth/logout`

Payloads are validated with Zod. Concurrent updates use document `version` and return `409` on conflict.

### Backup / restore

From **Data** in Mission Control:

- Export CSV for applications, recruiters, or activities
- Export a full JSON backup
- Import a JSON backup to restore Blob documents

Writes also best-effort copy the previous document into `mission/backups/`.

### Deployment

1. Set all env vars on Vercel.
2. Deploy as usual (`git push` or Vercel CLI).
3. Visit `/admin/login`, authenticate, confirm `/admin/mission-control` loads and seeds.
4. Confirm public `/` still shows the portfolio (no admin nav).

**JOB SECURED** and **RV READY** are independent flags — securing a job does not auto-complete RV readiness.
