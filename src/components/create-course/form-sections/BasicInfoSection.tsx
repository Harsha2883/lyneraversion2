
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "lucide-react";
import { CategorySelector } from "../components/category/CategorySelector";
import { Control } from "react-hook-form";
import { CourseFormValues } from "../types/form-types";

interface BasicInfoSectionProps {
  control: Control<CourseFormValues>;
}

export function BasicInfoSection({ control }: BasicInfoSectionProps) {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Book className="h-4 w-4" /> Course Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter course name" {...field} />
            </FormControl>
            <FormDescription>
              A clear, concise title for your course.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <CategorySelector
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormDescription>
              Select a category for your course or suggest a new one
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Book className="h-4 w-4" /> Course Description
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter a detailed description of your course"
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide a comprehensive description of your course content and objectives.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
