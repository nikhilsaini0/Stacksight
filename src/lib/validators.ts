import { z } from "zod";

export const toolInputSchema = z.object({
  tool: z.string().min(1, "Tool is required"),
  plan: z.string().min(1, "Plan is required"),
  seats: z.coerce.number().min(1, "At least 1 seat required"),
  monthlySpend: z.coerce.number().min(0, "Spend must be 0 or more"),
});

export const auditFormSchema = z.object({
  teamSize: z.coerce.number().min(1, "Team size must be at least 1"),
  useCase: z.enum(["coding", "writing", "research", "mixed"], {
    required_error: "Use case is required",
  }),
  tools: z.array(toolInputSchema).min(1, "Add at least one tool"),
});

export const leadSchema = z.object({
  auditId: z.string().min(1),
  email: z.string().email("Valid email required"),
  companyName: z.string().optional(),
  role: z.string().optional(),
});

export type ToolInputForm = z.infer<typeof toolInputSchema>;
export type AuditFormData = z.infer<typeof auditFormSchema>;
export type LeadFormData = z.infer<typeof leadSchema>;
