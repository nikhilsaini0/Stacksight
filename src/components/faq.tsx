"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does StackSight AI find savings?",
    a: "We analyze your AI tool subscriptions against your team size and usage patterns. Our audit engine checks for plan-size mismatches, enterprise tier overspend, unused features, and vendor alternatives to identify concrete savings opportunities.",
  },
  {
    q: "Is my data stored or shared?",
    a: "Your audit data is stored securely only if you choose to save your report. We never share your data with third parties. You can run anonymous audits without providing any personal information.",
  },
  {
    q: "How accurate are the savings estimates?",
    a: "Our estimates are based on published pricing from each AI tool provider as of 2024. Actual savings may vary based on negotiated enterprise rates, annual billing discounts, and usage patterns.",
  },
  {
    q: "What AI tools do you support?",
    a: "We currently support ChatGPT, Claude, Cursor, GitHub Copilot, and Google Gemini. We're actively adding more tools including Midjourney, Jasper, and custom API usage tracking.",
  },
  {
    q: "Can I share my audit report?",
    a: "Yes! Every audit generates a unique shareable URL. You can share it with your team, manager, or finance department. You can also save and email the report to yourself.",
  },
  {
    q: "Is StackSight AI free?",
    a: "The basic audit is completely free with no limits. We offer premium features like ongoing monitoring, benchmark comparisons, and team dashboards for growing companies.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading gradient-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="section-subheading mx-auto">
            Everything you need to know about optimizing your AI spend.
          </p>
        </div>

        <div className="glass-card-static p-2">
          {faqs.map((faq, i) => (
            <div key={i} className="accordion-item">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="accordion-trigger px-6"
                data-open={open === i}
                id={`faq-trigger-${i}`}
              >
                {faq.q}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className="accordion-content px-6"
                data-open={open === i}
              >
                <p className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
