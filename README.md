# Bruno Lionel Raj M — Portfolio

A premium dark-themed portfolio website built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, GSAP, and Three.js.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Standalone output)
- **Language**: TypeScript 5
- **UI**: Tailwind CSS 4, shadcn/ui (new-york), Lucide icons
- **Animation**: Framer Motion, GSAP + ScrollTrigger
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Database**: Prisma ORM (SQLite for local; PostgreSQL recommended for production)
- **Package Manager**: Bun
- **Runtime**: Node.js 20

## Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Set up environment
cp .env.example .env

# 3. Generate Prisma client + push schema
bunx prisma generate
bunx prisma db push

# 4. Run dev server
bun run dev
# → http://localhost:3000
```

## Build & Run (Production)

```bash
bun run build
bun run start
```

## Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout + SEO metadata
│   ├── page.tsx              # Home page composition
│   ├── globals.css           # Global styles + design system
│   └── api/route.ts          # API route
├── src/
│   ├── components/
│   │   ├── portfolio/        # 11 portfolio components
│   │   │   ├── Hero.tsx      # Hero section with 3D photo card
│   │   │   ├── About.tsx     # About with avatar + expertise
│   │   │   ├── Experience.tsx
│   │   │   ├── CaseStudies.tsx # 3 detailed case studies (GBP automation, AEO/GEO, Domain Authority)
│   │   │   ├── Skills.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── ParticleField.tsx
│   │   │   ├── ThreeScene.tsx
│   │   │   └── WebGLScene.tsx
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   ├── resume-data.ts    # All content (single source of truth)
│   │   ├── utils.ts          # cn() helper
│   │   └── db.ts             # Prisma client
│   └── hooks/
├── public/
│   ├── profile.png           # Profile photo
│   ├── logo.svg
│   └── robots.txt
├── prisma/schema.prisma      # DB schema
├── .github/workflows/        # CI + Vercel deploy
├── vercel.json               # Vercel config
├── .nvmrc                    # Node 20
└── .env.example              # Env template
```

## Deployment

### Option A: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Framework preset: **Next.js** (auto-detected)
   - Build command: `bun run build` (auto-detected from `vercel.json`)
   - Install command: `bun install` (auto-detected)

3. **Set Environment Variables** (Project Settings → Environment Variables)
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```
   > ⚠️ SQLite (`file:./...`) does NOT persist on Vercel serverless. Use PostgreSQL (Neon, Supabase, Vercel Postgres).

4. **Deploy** — Vercel will build and deploy automatically.

5. **Custom Domain** (optional)
   - Project Settings → Domains → add `brunolionelraj.com`

### Option B: Vercel CLI

```bash
# Install CLI
bun add -g vercel

# Link project (run once)
vercel link

# Deploy to production
vercel --prod
```

### Option C: Automated Deploy via GitHub Actions

1. Set these repository secrets (GitHub → Settings → Secrets and variables → Actions):
   - `VERCEL_TOKEN` — Personal token from [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` — Team/user ID (found in `.vercel/project.json` after `vercel link`)
   - `VERCEL_PROJECT_ID` — Project ID (found in `.vercel/project.json` after `vercel link`)

2. Push to `main` — the `deploy.yml` workflow will build and deploy automatically.

## Database (Production)

The default schema uses SQLite for local dev. For Vercel production, switch to PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Set `DATABASE_URL` to your PostgreSQL connection string (Neon, Supabase, or Vercel Postgres).

3. Run migration:
   ```bash
   bunx prisma migrate deploy
   ```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Prisma connection string |
| `NEXT_PUBLIC_SITE_URL` | Optional | Site URL for SEO/canonical |

See `.env.example` for full template.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server on :3000 |
| `bun run build` | Production build (standalone) |
| `bun run start` | Run production server |
| `bun run lint` | ESLint |
| `bun run db:push` | Push Prisma schema to DB |
| `bun run db:generate` | Regenerate Prisma client |
| `bun run db:migrate` | Create DB migration |
| `bun run db:reset` | Reset DB (dev only) |

## Performance Notes

- Three.js scene pauses when off-screen (`frameloop="never"`)
- Custom cursor rAF stops when mouse is idle (150ms timeout)
- All mousemove listeners use `{ passive: true }`
- Native scroll (no Lenis) for maximum smoothness
- `output: "standalone"` for minimal Docker/serverless deployment

## License

Private project. All content © Bruno Lionel Raj M.
