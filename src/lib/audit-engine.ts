import { getPlanPrice } from "./pricing";

export type ToolInput = {
  tool: string;
  plan: string;
  seats: number;
  monthlySpend: number;
};

export type AuditRecommendation = {
  tool: string;
  currentPlan: string;
  recommendedPlan: string;
  recommendation: string;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
  severity: "high" | "medium" | "low";
};

export type AuditResult = {
  recommendations: AuditRecommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  totalCurrentSpend: number;
  optimizationScore: number;
};

function checkOverspend(item: ToolInput): AuditRecommendation | null {
  const expectedCost = (getPlanPrice(item.tool, item.plan) ?? 0) * item.seats;
  if (expectedCost > 0 && item.monthlySpend > expectedCost * 1.1) {
    const overspend = item.monthlySpend - expectedCost;
    return {
      tool: item.tool,
      currentPlan: item.plan,
      recommendedPlan: item.plan,
      recommendation: `Verify billing — you may be overpaying for ${item.tool}`,
      monthlySavings: Math.round(overspend),
      annualSavings: Math.round(overspend * 12),
      reason: `Expected cost is $${expectedCost}/mo for ${item.seats} seats, but you're spending $${item.monthlySpend}/mo.`,
      severity: "medium",
    };
  }
  return null;
}

export function runAudit(tools: ToolInput[]): AuditResult {
  const recommendations: AuditRecommendation[] = [];

  for (const item of tools) {
    const tool = item.tool.toLowerCase();
    const plan = item.plan.toLowerCase();

    // ChatGPT Team → Plus for small teams
    if (tool === "chatgpt" && plan === "team" && item.seats <= 2) {
      const savings = 10 * item.seats;
      recommendations.push({
        tool: item.tool,
        currentPlan: item.plan,
        recommendedPlan: "plus",
        recommendation: "Switch to ChatGPT Plus",
        monthlySavings: savings,
        annualSavings: savings * 12,
        reason:
          "Small teams rarely benefit from Team collaboration features. Plus at $20/seat saves $10/seat/mo.",
        severity: "medium",
      });
    }

    // Cursor Business → Pro for small teams
    if (tool === "cursor" && plan === "business" && item.seats < 5) {
      const savings = 20 * item.seats;
      recommendations.push({
        tool: item.tool,
        currentPlan: item.plan,
        recommendedPlan: "pro",
        recommendation: "Downgrade to Cursor Pro",
        monthlySavings: savings,
        annualSavings: savings * 12,
        reason:
          "Business tier admin features are only economical with 5+ engineers. Pro at $20/seat saves $20/seat/mo.",
        severity: "medium",
      });
    }

    // Claude Max → Pro (high savings)
    if (tool === "claude" && plan === "max") {
      const savings = 80 * item.seats;
      recommendations.push({
        tool: item.tool,
        currentPlan: item.plan,
        recommendedPlan: "pro",
        recommendation: "Downgrade to Claude Pro",
        monthlySavings: savings,
        annualSavings: savings * 12,
        reason:
          "Claude Max ($100/seat) is 5x the cost of Pro ($20/seat). Unless you need extended context and priority access, Pro covers most use cases.",
        severity: "high",
      });
    }

    // Claude Team → Pro for small teams
    if (tool === "claude" && plan === "team" && item.seats <= 2) {
      const savings = 10 * item.seats;
      recommendations.push({
        tool: item.tool,
        currentPlan: item.plan,
        recommendedPlan: "pro",
        recommendation: "Switch to Claude Pro",
        monthlySavings: savings,
        annualSavings: savings * 12,
        reason:
          "Team plan collaboration features are underutilized with 1–2 users. Pro at $20/seat saves $10/seat/mo.",
        severity: "low",
      });
    }

    // Copilot Enterprise → Business for small teams
    if (tool === "copilot" && plan === "enterprise" && item.seats < 10) {
      const savings = 20 * item.seats;
      recommendations.push({
        tool: item.tool,
        currentPlan: item.plan,
        recommendedPlan: "business",
        recommendation: "Downgrade to Copilot Business",
        monthlySavings: savings,
        annualSavings: savings * 12,
        reason:
          "Enterprise fine-tuning and policy features need 10+ seats to justify cost. Business at $19/seat saves $20/seat/mo.",
        severity: "medium",
      });
    }

    // Gemini Ultra → Pro for small teams
    if (tool === "gemini" && plan === "ultra" && item.seats <= 3) {
      const savings = 30 * item.seats;
      recommendations.push({
        tool: item.tool,
        currentPlan: item.plan,
        recommendedPlan: "pro",
        recommendation: "Switch to Gemini Pro",
        monthlySavings: savings,
        annualSavings: savings * 12,
        reason:
          "Ultra tier premium features are cost-effective only for larger teams. Pro at $20/seat saves $30/seat/mo.",
        severity: "medium",
      });
    }

    // Any enterprise plan with < 5 seats
    if (plan === "enterprise" && item.seats < 5 && tool !== "copilot") {
      const alreadyRecommended = recommendations.some(
        (r) => r.tool === item.tool
      );
      if (!alreadyRecommended) {
        const businessPrice = getPlanPrice(item.tool, "business") ?? getPlanPrice(item.tool, "pro") ?? 0;
        const enterprisePrice = getPlanPrice(item.tool, "enterprise") ?? 0;
        const savings = (enterprisePrice - businessPrice) * item.seats;
        if (savings > 0) {
          recommendations.push({
            tool: item.tool,
            currentPlan: item.plan,
            recommendedPlan: businessPrice === getPlanPrice(item.tool, "business") ? "business" : "pro",
            recommendation: `Downgrade from Enterprise — team too small`,
            monthlySavings: savings,
            annualSavings: savings * 12,
            reason: `Enterprise plans are designed for 5+ seats. You have ${item.seats} seats, paying a $${enterprisePrice - businessPrice}/seat premium.`,
            severity: "high",
          });
        }
      }
    }

    // Overspend check
    const overspend = checkOverspend(item);
    if (overspend) {
      recommendations.push(overspend);
    }
  }

  const totalCurrentSpend = tools.reduce((s, t) => s + t.monthlySpend, 0);
  const totalMonthlySavings = recommendations.reduce(
    (s, r) => s + r.monthlySavings,
    0
  );
  const totalAnnualSavings = totalMonthlySavings * 12;
  const optimizationScore =
    totalCurrentSpend > 0
      ? Math.min(100, Math.round((totalMonthlySavings / totalCurrentSpend) * 100))
      : 0;

  return {
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings,
    totalCurrentSpend,
    optimizationScore,
  };
}
