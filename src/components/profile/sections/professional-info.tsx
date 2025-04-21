
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProfessionalInfoProps {
  control: any;
}

export function ProfessionalInfo({ control }: ProfessionalInfoProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="profession"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profession</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="education"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Education Qualification</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="aspiration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Aspiration</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
