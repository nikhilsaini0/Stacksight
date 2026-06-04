import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators";
import { sendAuditEmail } from "@/lib/resend";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { auditId, email, companyName, role } = parsed.data;

    const audit = await prisma.audit.findUnique({ where: { id: auditId } });
    if (!audit) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 });
    }

    await prisma.lead.upsert({
      where: { auditId },
      update: { email, companyName, role },
      create: { auditId, email, companyName, role },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    await sendAuditEmail(
      email,
      `${siteUrl}/audit/${auditId}`,
      audit.totalSavings
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
