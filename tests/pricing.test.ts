import { describe, it, expect } from "vitest";
import {
  pricingData,
  getPlanPrice,
  getToolPlans,
  getToolNames,
  toolLabels,
} from "@/lib/pricing";

describe("pricing data", () => {
  it("has all expected tools", () => {
    expect(getToolNames()).toContain("cursor");
    expect(getToolNames()).toContain("copilot");
    expect(getToolNames()).toContain("claude");
    expect(getToolNames()).toContain("chatgpt");
    expect(getToolNames()).toContain("gemini");
  });

  it("has labels for all tools", () => {
    for (const tool of getToolNames()) {
      expect(toolLabels[tool]).toBeDefined();
    }
  });

  it("cursor pricing is correct", () => {
    expect(pricingData.cursor.hobby).toBe(0);
    expect(pricingData.cursor.pro).toBe(20);
    expect(pricingData.cursor.business).toBe(40);
    expect(pricingData.cursor.enterprise).toBe(60);
  });

  it("chatgpt pricing is correct", () => {
    expect(pricingData.chatgpt.plus).toBe(20);
    expect(pricingData.chatgpt.team).toBe(30);
    expect(pricingData.chatgpt.enterprise).toBe(60);
  });

  it("getPlanPrice returns correct prices", () => {
    expect(getPlanPrice("cursor", "pro")).toBe(20);
    expect(getPlanPrice("claude", "max")).toBe(100);
    expect(getPlanPrice("gemini", "ultra")).toBe(50);
  });

  it("getPlanPrice returns null for invalid tool", () => {
    expect(getPlanPrice("nonexistent", "pro")).toBeNull();
  });

  it("getPlanPrice returns null for invalid plan", () => {
    expect(getPlanPrice("cursor", "nonexistent")).toBeNull();
  });

  it("getToolPlans returns correct plans", () => {
    const cursorPlans = getToolPlans("cursor");
    expect(cursorPlans).toContain("hobby");
    expect(cursorPlans).toContain("pro");
    expect(cursorPlans).toContain("business");
    expect(cursorPlans).toContain("enterprise");
  });

  it("getToolPlans returns empty array for invalid tool", () => {
    expect(getToolPlans("nonexistent")).toEqual([]);
  });
});
