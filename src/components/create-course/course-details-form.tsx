import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Book, Users, Star, Eye, EyeOff, Tags } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CategorySelector } from "./components/category/CategorySelector";
import { TagSelector } from "./components/tags/TagSelector";

const courseFormSchema = z.object({
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

type CourseFormValues = z.infer<typeof courseFormSchema>;

// Sample tag options
const tagOptions = [
  { id: "esg", label: "ESG" },
  { id: "ai-healthcare", label: "AI in Healthcare" },
  { id: "sustainability", label: "Sustainability" },
  { id: "net-zero", label: "Net Zero" },
  { id: "carbon-management", label: "Carbon Management" },
  { id: "green-finance", label: "Green Finance" },
];

export function CourseDetailsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default form values
  const defaultValues: Partial<CourseFormValues> = {
    name: "",
    description: "",
    category: "",
    outcomes: "",
    audience: "",
    level: "beginner",
    visibility: "public",
    tags: [],
  };

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
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
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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

            <FormField
              control={form.control}
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
              control={form.control}
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

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    <Star className="h-4 w-4" /> Course Level
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="beginner" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Beginner
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="intermediate" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Intermediate
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="advanced" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Advanced
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Select the difficulty level of your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    {field.value === "public" ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                    Visibility
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="public" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Public - Visible to all users
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="invite-only" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Invite-only - Limited access
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Choose who can access your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Tags</FormLabel>
                  <FormControl>
                    <TagSelector
                      tags={field.value}
                      onChange={field.onChange}
                      maxTags={10}
                    />
                  </FormControl>
                  <FormDescription>
                    Add up to 10 tags to improve your course's visibility (press Enter or click + to add)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
