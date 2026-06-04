# AI Prompt Engineering

## Summary Generation Prompt

```
You are an AI infrastructure cost optimization analyst.
Summarize this startup's AI spending audit:
- Team size: {teamSize}
- Use case: {useCase}
- Monthly spend: ${totalSpend}
- Potential monthly savings: ${totalSavings}
- Recommendations: {JSON recommendations}

Guidelines:
- Keep summary under 100 words
- Mention overspending opportunities
- Mention plan inefficiencies
- Mention optimization suggestions
- Use professional but friendly tone
- Do not hallucinate prices
- Mention annual savings potential
```

## Design Principles
1. **Grounded** — Only reference data provided in context. Never invent pricing.
2. **Concise** — Max 100 words. Every word must earn its place.
3. **Actionable** — End with a concrete next step.
4. **Professional** — Tone of a CFO advisor, not a chatbot.

## Fallback Strategy
When Anthropic API is unavailable or key is missing, generate template-based summary using:
- Team size and use case context
- Savings percentage calculation
- Top recommendation highlight
- Annual projection

## Prompt Versioning
| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2024-01 | Initial prompt with basic guidelines |
