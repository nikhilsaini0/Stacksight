"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [count, setCount] = useState(0);
  const target = 4280;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    }
    const timer = setTimeout(() => requestAnimationFrame(animate), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px] animate-float delay-300" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Free AI Spend Analysis — No credit card required
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-100 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6">
          <span className="text-white">Stop </span>
          <span className="gradient-text">Overpaying</span>
          <br />
          <span className="text-white">for AI Tools</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          StackSight AI audits your team&apos;s AI tool subscriptions and finds
          instant savings. Most startups are overspending by{" "}
          <span className="text-accent font-semibold">20–40%</span>.
        </p>

        {/* Savings Counter */}
        <div className="animate-fade-in-up delay-300 mb-10">
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
            Average annual savings found
          </p>
          <div className="savings-number gradient-text-savings">
            ${count.toLocaleString()}
          </div>
          <p className="text-muted-foreground text-sm mt-1">per year, per team</p>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#audit-form"
            className="btn-primary animate-pulse-glow text-lg px-8 py-4 rounded-xl"
          >
            <span>Audit My AI Spend →</span>
          </a>
          <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
            See How It Works
          </a>
        </div>

        {/* Social Proof */}
        <div className="animate-fade-in-up delay-500 mt-14 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                "bg-gradient-to-br from-violet-500 to-purple-600",
                "bg-gradient-to-br from-cyan-500 to-blue-600",
                "bg-gradient-to-br from-pink-500 to-rose-600",
                "bg-gradient-to-br from-amber-500 to-orange-600",
              ].map((bg, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${bg} border-2 border-[#07080d] flex items-center justify-center text-white text-xs font-bold`}
                >
                  {["S", "A", "M", "K"][i]}
                </div>
              ))}
            </div>
            <span>1,200+ audits generated</span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <span>⭐ 4.9/5 from startup founders</span>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <span>🔒 No data stored without consent</span>
        </div>
      </div>
    </section>
  );
}
