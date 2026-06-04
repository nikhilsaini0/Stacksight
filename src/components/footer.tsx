export default function Footer() {
  return (
    <footer className="px-6 py-16 mt-8">
      <div className="max-w-5xl mx-auto">
        {/* CTA */}
        <div className="glass-card-static p-12 text-center mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
          <div className="relative z-10">
            <h2 className="section-heading text-white mb-4">
              Ready to Optimize Your AI Spend?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Join 1,200+ teams who found savings with StackSight AI. Free, fast,
              and no credit card required.
            </p>
            <a href="#audit-form" className="btn-primary text-lg px-10 py-4">
              <span>Start Free Audit →</span>
            </a>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              S
            </div>
            <span className="font-semibold text-foreground">StackSight AI</span>
          </div>
          <p>© {new Date().getFullYear()} StackSight AI. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Terms
            </span>
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
