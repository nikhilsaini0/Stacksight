import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit-engine";
import { auditFormSchema } from "@/lib/validators";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = auditFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { teamSize, useCase, tools } = parsed.data;
    const auditResult = runAudit(tools);
    const totalSpend = tools.reduce((s, t) => s + t.monthlySpend, 0);

    const audit = await prisma.audit.create({
      data: {
        teamSize,
        useCase,
        totalSpend,
        totalSavings: auditResult.totalMonthlySavings,
        tools: JSON.stringify(tools),
      },
    });

    return NextResponse.json({ id: audit.id, results: auditResult });
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
