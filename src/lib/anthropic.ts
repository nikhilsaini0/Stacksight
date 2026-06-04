import Anthropic from "@anthropic-ai/sdk";

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

interface AuditSummaryInput {
  teamSize: number;
  useCase: string;
  totalSpend: number;
  totalSavings: number;
  recommendations: Array<{
    tool: string;
    recommendation: string;
    monthlySavings: number;
    reason: string;
  }>;
}

function generateFallbackSummary(data: AuditSummaryInput): string {
  const savingsPercent =
    data.totalSpend > 0
      ? Math.round((data.totalSavings / data.totalSpend) * 100)
      : 0;
  const topRec = data.recommendations[0];
  const toolList = data.recommendations.map((r) => r.tool).join(", ");

  return `Your ${data.teamSize}-person ${data.useCase} team is spending $${data.totalSpend}/mo on AI tools${
    toolList ? ` (${toolList})` : ""
  }. We identified $${data.totalSavings}/mo in potential savings — a ${savingsPercent}% reduction. ${
    topRec
      ? `Top recommendation: ${topRec.recommendation} to save $${topRec.monthlySavings}/mo. ${topRec.reason}`
      : "Your stack looks well-optimized."
  } Annual savings potential: $${data.totalSavings * 12}.`;
}

export async function generateSummary(
  data: AuditSummaryInput
): Promise<string> {
  if (!anthropic) {
    return generateFallbackSummary(data);
  }

  try {
    const prompt = `You are an AI infrastructure cost optimization analyst.
Summarize this startup's AI spending audit:
- Team size: ${data.teamSize}
- Use case: ${data.useCase}
- Monthly spend: $${data.totalSpend}
- Potential monthly savings: $${data.totalSavings}
- Recommendations: ${JSON.stringify(data.recommendations)}

Guidelines:
- Keep summary under 100 words
- Mention overspending opportunities
- Mention plan inefficiencies  
- Mention optimization suggestions
- Use professional but friendly tone
- Do not hallucinate prices
- Mention annual savings potential`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    return content.type === "text"
      ? content.text
      : generateFallbackSummary(data);
  } catch {
    return generateFallbackSummary(data);
  }
}
