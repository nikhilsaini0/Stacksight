import { toolLabels } from "@/lib/pricing";
import type { AuditRecommendation } from "@/lib/audit-engine";

export default function SavingsCard({
  rec,
  index,
}: {
  rec: AuditRecommendation;
  index: number;
}) {
  return (
    <div
      className="glass-card p-6 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-lg">
            {rec.tool === "chatgpt"
              ? "🤖"
              : rec.tool === "cursor"
              ? "⌨️"
              : rec.tool === "claude"
              ? "🧠"
              : rec.tool === "copilot"
              ? "🐙"
              : rec.tool === "gemini"
              ? "💎"
              : "🔧"}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {toolLabels[rec.tool] || rec.tool}
            </h3>
            <p className="text-sm text-muted-foreground">
              {rec.currentPlan.charAt(0).toUpperCase() +
                rec.currentPlan.slice(1)}{" "}
              →{" "}
              <span className="text-accent">
                {rec.recommendedPlan.charAt(0).toUpperCase() +
                  rec.recommendedPlan.slice(1)}
              </span>
            </p>
          </div>
        </div>
        <span
          className={`badge ${
            rec.severity === "high"
              ? "badge-high"
              : rec.severity === "medium"
              ? "badge-medium"
              : "badge-low"
          }`}
        >
          {rec.severity}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {rec.reason}
      </p>

      <div className="flex items-end justify-between pt-3 border-t border-white/[0.06]">
        <div>
          <p className="text-xs text-muted-foreground">Monthly savings</p>
          <p className="text-xl font-bold gradient-text-savings">
            ${rec.monthlySavings.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Annual savings</p>
          <p className="text-lg font-semibold text-foreground">
            ${rec.annualSavings.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
