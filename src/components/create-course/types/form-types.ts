
import { z } from "zod";

export const courseFormSchema = z.object({
  name: z.string().min(3, {
    message: "Course name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Course description must be at least 10 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  outcomes: z.string().min(10, {
    message: "Course outcomes must be at least 10 characters.",
  }),
  audience: z.string().min(10, {
    message: "Target audience must be at least 10 characters.",
  }),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "You must select a course level.",
  }),
  visibility: z.enum(["public", "invite-only"], {
    required_error: "You must select a visibility option.",
  }),
  tags: z.array(z.string()),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;
