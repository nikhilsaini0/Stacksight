import { describe, it, expect } from "vitest";
import { runAudit, type ToolInput } from "@/lib/audit-engine";

describe("audit engine", () => {
  it("detects ChatGPT Team overspend for small teams", () => {
    const tools: ToolInput[] = [
      { tool: "chatgpt", plan: "team", seats: 2, monthlySpend: 60 },
    ];
    const result = runAudit(tools);
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations[0].recommendedPlan).toBe("plus");
    expect(result.recommendations[0].monthlySavings).toBe(20);
  });

  it("detects Cursor Business overspend for small teams", () => {
    const tools: ToolInput[] = [
      { tool: "cursor", plan: "business", seats: 3, monthlySpend: 120 },
    ];
    const result = runAudit(tools);
    const rec = result.recommendations.find(
      (r) => r.tool === "cursor" && r.recommendedPlan === "pro"
    );
    expect(rec).toBeDefined();
    expect(rec!.monthlySavings).toBe(60);
    expect(rec!.annualSavings).toBe(720);
  });

  it("detects Claude Max overspend", () => {
    const tools: ToolInput[] = [
      { tool: "claude", plan: "max", seats: 3, monthlySpend: 300 },
    ];
    const result = runAudit(tools);
    const rec = result.recommendations.find((r) => r.severity === "high");
    expect(rec).toBeDefined();
    expect(rec!.monthlySavings).toBe(240);
  });

  it("detects Claude Team overspend for small teams", () => {
    const tools: ToolInput[] = [
      { tool: "claude", plan: "team", seats: 1, monthlySpend: 30 },
    ];
    const result = runAudit(tools);
    expect(
      result.recommendations.some((r) => r.recommendedPlan === "pro")
    ).toBe(true);
  });

  it("detects Copilot Enterprise overspend for small teams", () => {
    const tools: ToolInput[] = [
      { tool: "copilot", plan: "enterprise", seats: 5, monthlySpend: 195 },
    ];
    const result = runAudit(tools);
    const rec = result.recommendations.find(
      (r) => r.recommendedPlan === "business"
    );
    expect(rec).toBeDefined();
    expect(rec!.monthlySavings).toBe(100);
  });

  it("detects Gemini Ultra overspend for small teams", () => {
    const tools: ToolInput[] = [
      { tool: "gemini", plan: "ultra", seats: 2, monthlySpend: 100 },
    ];
    const result = runAudit(tools);
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations[0].monthlySavings).toBe(60);
  });

  it("returns no recommendations for optimal plans", () => {
    const tools: ToolInput[] = [
      { tool: "chatgpt", plan: "plus", seats: 5, monthlySpend: 100 },
    ];
    const result = runAudit(tools);
    expect(result.recommendations.length).toBe(0);
  });

  it("handles multiple tools", () => {
    const tools: ToolInput[] = [
      { tool: "chatgpt", plan: "team", seats: 2, monthlySpend: 60 },
      { tool: "cursor", plan: "business", seats: 3, monthlySpend: 120 },
    ];
    const result = runAudit(tools);
    expect(result.recommendations.length).toBeGreaterThanOrEqual(2);
    expect(result.totalMonthlySavings).toBeGreaterThan(0);
  });

  it("handles empty tools array", () => {
    const result = runAudit([]);
    expect(result.recommendations).toEqual([]);
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.optimizationScore).toBe(0);
  });

  it("calculates total savings correctly", () => {
    const tools: ToolInput[] = [
      { tool: "chatgpt", plan: "team", seats: 2, monthlySpend: 60 },
      { tool: "claude", plan: "max", seats: 1, monthlySpend: 100 },
    ];
    const result = runAudit(tools);
    const expectedMonthly = result.recommendations.reduce(
      (s, r) => s + r.monthlySavings,
      0
    );
    expect(result.totalMonthlySavings).toBe(expectedMonthly);
    expect(result.totalAnnualSavings).toBe(expectedMonthly * 12);
  });

  it("calculates optimization score", () => {
    const tools: ToolInput[] = [
      { tool: "claude", plan: "max", seats: 2, monthlySpend: 200 },
    ];
    const result = runAudit(tools);
    expect(result.optimizationScore).toBeGreaterThan(0);
    expect(result.optimizationScore).toBeLessThanOrEqual(100);
  });
});
