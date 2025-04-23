
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, Eye, EyeOff, Tags } from "lucide-react";
import { Control } from "react-hook-form";
import { CourseFormValues } from "../types/form-types";
import { TagSelector } from "../components/tags/TagSelector";

interface CourseSettingsSectionProps {
  control: Control<CourseFormValues>;
}

export function CourseSettingsSection({ control }: CourseSettingsSectionProps) {
  return (
    <>
      <FormField
        control={control}
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
                  <FormLabel className="font-normal">Beginner</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="intermediate" />
                  </FormControl>
                  <FormLabel className="font-normal">Intermediate</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="advanced" />
                  </FormControl>
                  <FormLabel className="font-normal">Advanced</FormLabel>
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
        control={control}
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
        control={control}
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
    </>
  );
}
