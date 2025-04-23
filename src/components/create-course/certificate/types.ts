
import { z } from "zod";

export const certificateFormSchema = z.object({
  templateType: z.enum(["standard", "premium"], {
    required_error: "Please select a template type",
  }),
  templateId: z.string({
    required_error: "Please select a template",
  }),
  enableBlockchain: z.boolean(),
  minGradeToIssue: z.string()
    .min(1, "Minimum grade is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 0 && num <= 100;
      },
      "Grade must be between 0 and 100"
    ),
  coBranding: z.boolean(),
});

export type CertificateFormValues = z.infer<typeof certificateFormSchema>;
