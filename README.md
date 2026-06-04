# StackSight AI

**AI Spend Audit & Optimization Platform**

> Audit your team's AI tool subscriptions and find instant savings. Most startups are overspending 20–40% on AI tools.

---

## ✨ Features

- 🔍 **Smart Audit Engine** — Analyzes AI subscriptions against team size, plan tiers, and usage patterns
- 🤖 **AI-Powered Summary** — Claude-generated insights on your spending behavior
- 📊 **Savings Dashboard** — Clear breakdown of current vs optimized spend
- 🔗 **Shareable Reports** — Unique URLs for each audit with OpenGraph metadata
- 📧 **Email Reports** — Save and email audit results via Resend
- 🎯 **Lead Capture** — Integrated CRM-ready lead collection
- 🌙 **Premium Dark UI** — Glassmorphism design with smooth animations

## 🛠 Tech Stack

| Layer       | Technology                                      |
| ----------- | ----------------------------------------------- |
| Frontend    | Next.js 15, TypeScript, TailwindCSS v4          |
| State       | Zustand (persisted)                             |
| Forms       | React Hook Form, Zod                            |
| Backend     | Next.js API Routes                              |
| Database    | Prisma ORM + SQLite (Supabase PostgreSQL ready) |
| AI          | Anthropic Claude API                            |
| Email       | Resend                                          |
| Testing     | Vitest                                          |
| CI/CD       | GitHub Actions                                  |
| Deployment  | Vercel                                          |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone <repo-url>
cd stacksight-ai
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your API keys (optional for local dev)
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Testing

```bash
npx vitest run
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with SEO
│   ├── audit/[id]/page.tsx   # Shareable audit results
│   └── api/
│       ├── audit/route.ts    # Generate audit
│       ├── summary/route.ts  # AI summary
│       └── lead/route.ts     # Lead capture
├── components/
│   ├── hero.tsx
│   ├── spend-form.tsx
│   ├── audit-results.tsx
│   ├── savings-card.tsx
│   ├── email-capture.tsx
│   ├── pricing-comparison.tsx
│   ├── faq.tsx
│   └── footer.tsx
└── lib/
    ├── audit-engine.ts       # Core audit logic
    ├── pricing.ts            # Pricing data
    ├── validators.ts         # Zod schemas
    ├── anthropic.ts          # AI integration
    ├── resend.ts             # Email service
    ├── store.ts              # Zustand state
    └── db.ts                 # Prisma client
```

## 📡 API Endpoints

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| POST   | `/api/audit`   | Generate audit from tool data|
| POST   | `/api/summary` | Generate AI summary          |
| POST   | `/api/lead`    | Capture lead + send email    |

## 🚢 Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Set environment variables in Vercel dashboard:
- `DATABASE_URL` — Supabase PostgreSQL connection string
- `ANTHROPIC_API_KEY` — Anthropic API key
- `RESEND_API_KEY` — Resend API key
- `NEXT_PUBLIC_SITE_URL` — Production URL

## 📄 License

MIT
