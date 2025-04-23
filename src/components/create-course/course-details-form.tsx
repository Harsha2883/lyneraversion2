
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CourseFormValues, courseFormSchema } from "./types/form-types";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { CourseOutcomesSection } from "./form-sections/CourseOutcomesSection";
import { CourseSettingsSection } from "./form-sections/CourseSettingsSection";

export function CourseDetailsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      outcomes: "",
      audience: "",
      level: "beginner",
      visibility: "public",
      tags: [],
    },
  });

  function onSubmit(data: CourseFormValues) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Course details:", data);
      toast.success("Course details saved successfully");
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6 bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoSection control={form.control} />
            <CourseOutcomesSection control={form.control} />
            <CourseSettingsSection control={form.control} />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save and Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
