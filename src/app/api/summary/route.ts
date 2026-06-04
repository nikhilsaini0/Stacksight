import { NextResponse } from "next/server";
import { generateSummary } from "@/lib/anthropic";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { auditId } = await req.json();

    if (!auditId) {
      return NextResponse.json(
        { error: "auditId is required" },
        { status: 400 }
      );
    }

    const audit = await prisma.audit.findUnique({ where: { id: auditId } });

    if (!audit) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 });
    }

    const tools = JSON.parse(audit.tools);
    const summary = await generateSummary({
      teamSize: audit.teamSize,
      useCase: audit.useCase,
      totalSpend: audit.totalSpend,
      totalSavings: audit.totalSavings,
      recommendations: tools.map((t: { tool: string; plan: string; monthlySpend: number }) => ({
        tool: t.tool,
        recommendation: `Optimize ${t.tool} plan`,
        monthlySavings: 0,
        reason: `Currently on ${t.plan} plan`,
      })),
    });

    await prisma.audit.update({
      where: { id: auditId },
      data: { summary },
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summary API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
