
import { z } from "zod";

export const certificateFormSchema = z.object({
  templateType: z.enum(["standard", "premium"]),
  templateId: z.string(),
  enableBlockchain: z.boolean(),
  minGradeToIssue: z.string(),
  coBranding: z.boolean(),
});

export type CertificateFormValues = z.infer<typeof certificateFormSchema>;
