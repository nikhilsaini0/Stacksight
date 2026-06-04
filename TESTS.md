# Test Strategy

## Philosophy
Test business logic exhaustively, test integrations through contract, test UI through user stories.

## Test Categories

### Unit Tests (Implemented)
- **Audit Engine** (`tests/audit-engine.test.ts`) — 11 test cases covering all optimization rules
- **Pricing Data** (`tests/pricing.test.ts`) — 9 test cases for data integrity and lookups

### Integration Tests (Future)
- API route tests with mocked database
- Form submission → API → database flow

### E2E Tests (Future)
- Full audit flow: landing page → form → submit → results page
- Share link functionality
- Email capture flow

## Running Tests

```bash
# Run all tests
npx vitest run

# Watch mode
npx vitest

# With coverage
npx vitest run --coverage
```

## Coverage Goals
- Business logic: 90%+ (audit engine, pricing)
- API routes: 80%+ (happy path + error cases)
- UI components: 60%+ (critical user flows)
