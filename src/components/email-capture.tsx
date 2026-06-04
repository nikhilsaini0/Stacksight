"use client";

import { useState } from "react";

export default function EmailCapture({ auditId }: { auditId: string }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, email, companyName: company, role }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card-static p-8 text-center animate-fade-in-up">
        <span className="text-4xl mb-3 block">📬</span>
        <h3 className="text-lg font-semibold mb-1">Report Saved!</h3>
        <p className="text-muted-foreground text-sm">
          We&apos;ve emailed your audit report. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card-static p-8 animate-fade-in-up delay-500">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-1">Save Your Report</h3>
        <p className="text-sm text-muted-foreground">
          Get a copy of your audit results emailed to you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="input-field"
          required
          id="email-capture-input"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (optional)"
            className="input-field"
            id="company-name-input"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your role (optional)"
            className="input-field"
            id="role-input"
          />
        </div>

        {status === "error" && (
          <p className="text-danger text-sm">
            Something went wrong. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="btn-primary w-full disabled:opacity-50"
          id="save-report-button"
        >
          <span>
            {status === "loading" ? "Saving..." : "Save & Email Report →"}
          </span>
        </button>
      </form>
    </div>
  );
}
