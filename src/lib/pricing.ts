export const pricingData: Record<string, Record<string, number>> = {
  cursor: {
    hobby: 0,
    pro: 20,
    business: 40,
    enterprise: 60,
  },
  copilot: {
    individual: 10,
    business: 19,
    enterprise: 39,
  },
  claude: {
    free: 0,
    pro: 20,
    max: 100,
    team: 30,
    enterprise: 60,
  },
  chatgpt: {
    plus: 20,
    team: 30,
    enterprise: 60,
  },
  gemini: {
    pro: 20,
    ultra: 50,
  },
};

export const toolLabels: Record<string, string> = {
  cursor: "Cursor",
  copilot: "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  gemini: "Gemini",
};

export function getPlanPrice(tool: string, plan: string): number | null {
  const toolData = pricingData[tool.toLowerCase()];
  if (!toolData) return null;
  const price = toolData[plan.toLowerCase()];
  return price !== undefined ? price : null;
}

export function getToolPlans(tool: string): string[] {
  const toolData = pricingData[tool.toLowerCase()];
  if (!toolData) return [];
  return Object.keys(toolData);
}

export function getToolNames(): string[] {
  return Object.keys(pricingData);
}
