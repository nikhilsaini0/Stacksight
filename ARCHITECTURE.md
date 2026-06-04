# Architecture

## System Flow

```
User Input → Spend Form → Audit Engine → Savings Calculation
                                              ↓
                                    AI Summary (Claude)
                                              ↓
                                    Save to Database (Prisma)
                                              ↓
                                    Generate Public URL → /audit/[id]
                                              ↓
                                    Lead Capture → Email (Resend)
```

## Component Architecture

### Frontend Layer
- **Landing Page** (`page.tsx`) — Assembles Hero, PricingComparison, SpendForm, FAQ, Footer
- **Audit Page** (`audit/[id]/page.tsx`) — Server component that fetches audit data and renders AuditResults
- **Zustand Store** — Client-side state persistence for form data across navigation

### API Layer
- `POST /api/audit` — Validates input → runs audit engine → saves to DB → returns audit ID
- `POST /api/summary` — Fetches audit → calls Anthropic Claude → updates DB → returns summary
- `POST /api/lead` — Validates lead data → saves to DB → sends email via Resend

### Data Layer
- **Prisma ORM** with SQLite (local) / PostgreSQL (production)
- Two models: `Audit` (core data) and `Lead` (email capture), 1:1 relationship
- Tools stored as JSON string for flexibility

### Business Logic
- **Audit Engine** — Rule-based analysis with 7+ heuristics for plan optimization
- **Pricing Data** — Static pricing reference for 5 AI tools with helper lookups
- **Validators** — Zod schemas for type-safe input validation

## Key Design Decisions

1. **SQLite for local dev** — Zero-config, instant setup. Swap to Supabase PostgreSQL via DATABASE_URL
2. **JSON tools column** — Flexible schema for varying tool configurations
3. **Fallback summaries** — App works fully without Anthropic API key
4. **Server Components** — Audit page is server-rendered for SEO and OG metadata
5. **Zustand persist** — Form state survives page refreshes during multi-step input
