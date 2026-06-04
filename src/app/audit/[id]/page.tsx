import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { runAudit } from "@/lib/audit-engine";
import AuditResults from "@/components/audit-results";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const audit = await prisma.audit.findUnique({ where: { id } });

  if (!audit) {
    return { title: "Audit Not Found" };
  }

  return {
    title: `$${audit.totalSavings}/mo Savings Found`,
    description: `StackSight AI found $${audit.totalSavings}/mo in potential savings for a ${audit.teamSize}-person team. Annual savings: $${audit.totalSavings * 12}.`,
    openGraph: {
      title: `AI Spend Audit — $${audit.totalSavings}/mo Savings`,
      description: `StackSight AI found $${audit.totalSavings * 12}/year in potential savings.`,
    },
  };
}

export default async function AuditPage({ params }: Props) {
  const { id } = await params;
  const audit = await prisma.audit.findUnique({ where: { id } });

  if (!audit) {
    notFound();
  }

  const tools = JSON.parse(audit.tools);
  const results = runAudit(tools);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
              S
            </div>
            <span className="font-semibold text-lg">StackSight AI</span>
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              {audit.teamSize} member{audit.teamSize !== 1 ? "s" : ""} ·{" "}
              {audit.useCase}
            </span>
          </div>
        </div>
      </header>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <AuditResults
          results={results}
          auditId={audit.id}
          summary={audit.summary}
        />
      </div>
    </main>
  );
}
