import { pricingData, toolLabels } from "@/lib/pricing";

export default function PricingComparison() {
  const tools = Object.keys(pricingData);

  return (
    <section id="how-it-works" className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading gradient-text mb-4">
            AI Tool Pricing at a Glance
          </h2>
          <p className="section-subheading mx-auto">
            We track real-time pricing across all major AI tools to find your
            best options.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <div
              key={tool}
              className="glass-card p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">
                  {tool === "chatgpt"
                    ? "🤖"
                    : tool === "cursor"
                    ? "⌨️"
                    : tool === "claude"
                    ? "🧠"
                    : tool === "copilot"
                    ? "🐙"
                    : "💎"}
                </span>
                <h3 className="font-semibold text-lg">
                  {toolLabels[tool] || tool}
                </h3>
              </div>
              <div className="space-y-2">
                {Object.entries(pricingData[tool]).map(([plan, price]) => (
                  <div
                    key={plan}
                    className="flex justify-between items-center py-1.5 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="text-sm text-muted-foreground capitalize">
                      {plan}
                    </span>
                    <span className="text-sm font-semibold">
                      {price === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        <span>${price}/mo</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
