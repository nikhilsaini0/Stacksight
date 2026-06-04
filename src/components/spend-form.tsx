"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuditStore } from "@/lib/store";
import { pricingData, toolLabels, getToolPlans } from "@/lib/pricing";
import type { ToolInput } from "@/lib/audit-engine";

const useCases = [
  { value: "coding", label: "🖥️ Software Development" },
  { value: "writing", label: "✍️ Content & Writing" },
  { value: "research", label: "🔬 Research & Analysis" },
  { value: "mixed", label: "🔀 Mixed / General" },
];

export default function SpendForm() {
  const router = useRouter();
  const {
    tools,
    teamSize,
    useCase,
    isSubmitting,
    setTeamSize,
    setUseCase,
    addTool,
    removeTool,
    updateTool,
    setIsSubmitting,
  } = useAuditStore();

  const [error, setError] = useState<string | null>(null);

  function handleToolChange(
    index: number,
    field: keyof ToolInput,
    value: string | number
  ) {
    const updated = { ...tools[index], [field]: value };
    // Auto-calc spend when tool/plan/seats change
    if (field === "tool") {
      const plans = getToolPlans(value as string);
      updated.plan = plans[0] || "";
      const price = pricingData[value as string]?.[updated.plan] ?? 0;
      updated.monthlySpend = price * updated.seats;
    }
    if (field === "plan" || field === "seats") {
      const price = pricingData[updated.tool]?.[updated.plan] ?? 0;
      updated.monthlySpend =
        price * (field === "seats" ? (value as number) : updated.seats);
    }
    updateTool(index, updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (tools.length === 0) {
      setError("Add at least one tool to audit.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamSize, useCase, tools }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate audit");
      }

      const { id } = await res.json();
      router.push(`/audit/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="audit-form" className="px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading gradient-text mb-4">
            Audit Your AI Spend
          </h2>
          <p className="section-subheading mx-auto">
            Add your team&apos;s AI tools and subscriptions. We&apos;ll analyze your
            stack and find savings instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card-static p-8 space-y-8">
          {/* Team Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Team Size
              </label>
              <input
                type="number"
                min={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="input-field"
                placeholder="e.g. 5"
                id="team-size-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Primary Use Case
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="select-field"
                id="use-case-select"
              >
                {useCases.map((uc) => (
                  <option key={uc.value} value={uc.value}>
                    {uc.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider !w-full" />

          {/* Tools */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Tools & Subscriptions</h3>
              <button
                type="button"
                onClick={() =>
                  addTool({
                    tool: "chatgpt",
                    plan: "plus",
                    seats: 1,
                    monthlySpend: 20,
                  })
                }
                className="btn-secondary text-sm !px-4 !py-2"
                id="add-tool-button"
              >
                + Add Tool
              </button>
            </div>

            <div className="space-y-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1fr_80px_100px_40px] gap-3 items-end animate-fade-in-up"
                >
                  <div>
                    {index === 0 && (
                      <label className="block text-xs text-muted-foreground mb-1.5">
                        Tool
                      </label>
                    )}
                    <select
                      value={tool.tool}
                      onChange={(e) =>
                        handleToolChange(index, "tool", e.target.value)
                      }
                      className="select-field"
                    >
                      {Object.keys(pricingData).map((t) => (
                        <option key={t} value={t}>
                          {toolLabels[t] || t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {index === 0 && (
                      <label className="block text-xs text-muted-foreground mb-1.5">
                        Plan
                      </label>
                    )}
                    <select
                      value={tool.plan}
                      onChange={(e) =>
                        handleToolChange(index, "plan", e.target.value)
                      }
                      className="select-field"
                    >
                      {getToolPlans(tool.tool).map((p) => (
                        <option key={p} value={p}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {index === 0 && (
                      <label className="block text-xs text-muted-foreground mb-1.5">
                        Seats
                      </label>
                    )}
                    <input
                      type="number"
                      min={1}
                      value={tool.seats}
                      onChange={(e) =>
                        handleToolChange(index, "seats", Number(e.target.value))
                      }
                      className="input-field"
                    />
                  </div>
                  <div>
                    {index === 0 && (
                      <label className="block text-xs text-muted-foreground mb-1.5">
                        $/mo
                      </label>
                    )}
                    <input
                      type="number"
                      min={0}
                      value={tool.monthlySpend}
                      onChange={(e) =>
                        handleToolChange(
                          index,
                          "monthlySpend",
                          Number(e.target.value)
                        )
                      }
                      className="input-field"
                    />
                  </div>
                  <div>
                    {index === 0 && (
                      <span className="block text-xs text-transparent mb-1.5">
                        X
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="w-full h-[46px] flex items-center justify-center text-muted-foreground hover:text-danger transition-colors rounded-lg hover:bg-white/5"
                      aria-label="Remove tool"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {tools.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tools added yet. Click &quot;+ Add Tool&quot; to get started.</p>
                </div>
              )}
            </div>
          </div>

          {/* Summary bar */}
          {tools.length > 0 && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">
                  {tools.length}
                </span>{" "}
                tool{tools.length !== 1 ? "s" : ""} ·{" "}
                <span className="text-foreground font-semibold">
                  {tools.reduce((s, t) => s + t.seats, 0)}
                </span>{" "}
                total seats
              </div>
              <div className="text-sm">
                Total:{" "}
                <span className="text-foreground font-bold text-lg">
                  $
                  {tools
                    .reduce((s, t) => s + t.monthlySpend, 0)
                    .toLocaleString()}
                </span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || tools.length === 0}
            className="btn-primary w-full text-lg !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            id="generate-audit-button"
          >
            <span>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Generate Free Audit Report →"
              )}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
