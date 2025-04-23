
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Book, Users } from "lucide-react";
import { Control } from "react-hook-form";
import { CourseFormValues } from "../types/form-types";

interface CourseOutcomesSectionProps {
  control: Control<CourseFormValues>;
}

export function CourseOutcomesSection({ control }: CourseOutcomesSectionProps) {
  return (
    <>
      <FormField
        control={control}
        name="outcomes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Book className="h-4 w-4" /> Course Outcomes
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="What will learners achieve by the end of this course?"
                className="min-h-20"
                {...field}
              />
            </FormControl>
            <FormDescription>
              List the key skills or knowledge learners will gain.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="audience"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Target Audience
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Who is this course designed for?"
                className="min-h-20"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Describe the ideal participants for this course.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
