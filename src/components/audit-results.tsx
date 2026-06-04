"use client";

import { useState } from "react";
import SavingsCard from "./savings-card";
import EmailCapture from "./email-capture";
import type { AuditResult } from "@/lib/audit-engine";

export default function AuditResults({
  results,
  auditId,
  summary,
}: {
  results: AuditResult;
  auditId: string;
  summary?: string | null;
}) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center animate-fade-in-up">
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
          Your Potential Savings
        </p>
        <div className="savings-number gradient-text-savings mb-2">
          ${results.totalMonthlySavings.toLocaleString()}
          <span className="text-3xl text-muted-foreground font-normal">
            /mo
          </span>
        </div>
        <p className="text-xl text-muted-foreground">
          <span className="text-foreground font-semibold">
            ${results.totalAnnualSavings.toLocaleString()}
          </span>{" "}
          per year
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 animate-fade-in-up delay-100">
        <div className="glass-card-static p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Current Spend</p>
          <p className="text-2xl font-bold">
            ${results.totalCurrentSpend.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">/mo</p>
        </div>
        <div className="glass-card-static p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Optimized Spend</p>
          <p className="text-2xl font-bold text-accent">
            $
            {(
              results.totalCurrentSpend - results.totalMonthlySavings
            ).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">/mo</p>
        </div>
        <div className="glass-card-static p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Optimization</p>
          <p className="text-2xl font-bold gradient-text-savings">
            {results.optimizationScore}%
          </p>
          <p className="text-xs text-muted-foreground">score</p>
        </div>
      </div>

      {/* AI Summary */}
      {summary && (
        <div className="glass-card-static p-6 animate-fade-in-up delay-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✨</span>
            <h3 className="font-semibold">AI Analysis</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Recommendations */}
      {results.recommendations.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {results.recommendations.length} Optimization
            {results.recommendations.length !== 1 ? "s" : ""} Found
          </h3>
          <div className="grid gap-4">
            {results.recommendations.map((rec, i) => (
              <SavingsCard key={i} rec={rec} index={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card-static p-8 text-center animate-fade-in-up delay-200">
          <span className="text-4xl mb-4 block">🎉</span>
          <h3 className="text-xl font-semibold mb-2">
            Your stack is well-optimized!
          </h3>
          <p className="text-muted-foreground">
            We didn&apos;t find significant savings opportunities. Your plan
            selections match your team size.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
        <button onClick={copyLink} className="btn-secondary flex-1" id="copy-link-button">
          {copied ? "✓ Copied!" : "📋 Copy Share Link"}
        </button>
        <a href="/" className="btn-secondary flex-1 text-center">
          ← Run Another Audit
        </a>
      </div>

      {/* Email Capture */}
      <EmailCapture auditId={auditId} />
    </div>
  );
}
