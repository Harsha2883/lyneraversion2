
import { Card } from "@/components/ui/card";
import { Book, BookText } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { CertificateFormValues } from "./types";

interface TemplateSelectionProps {
  selectedTemplate: "standard" | "premium";
  setSelectedTemplate: (template: "standard" | "premium") => void;
  control: Control<CertificateFormValues>;
}

export function TemplateSelection({ 
  selectedTemplate, 
  setSelectedTemplate, 
  control 
}: TemplateSelectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Template Selection</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`p-4 cursor-pointer ${selectedTemplate === "standard" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setSelectedTemplate("standard")}
        >
          <div className="flex items-center gap-2">
            <BookText className="h-5 w-5 text-primary" />
            <div className="font-medium">Lynera Standard Templates</div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            IICSR/Lynera format certificates - included with all courses
          </p>
        </Card>

        <Card 
          className={`p-4 cursor-pointer ${selectedTemplate === "premium" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setSelectedTemplate("premium")}
        >
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            <div className="font-medium">Premium Templates</div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Premium templates from ACTD, EAHEA, MEPSC (paid options)
          </p>
        </Card>
      </div>

      <FormField
        control={control}
        name="templateId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Template</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectedTemplate === "standard" ? (
                  <>
                    <SelectItem value="lynera-1">Lynera Standard 1</SelectItem>
                    <SelectItem value="lynera-2">Lynera Standard 2</SelectItem>
                    <SelectItem value="iicsr-1">IICSR Certificate</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="actd-pro">ACTD Professional</SelectItem>
                    <SelectItem value="eahea-standard">EAHEA Standard</SelectItem>
                    <SelectItem value="mepsc-official">MEPSC Official</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            <FormDescription>
              {selectedTemplate === "premium" && 
                "Premium templates require additional payment for each certificate issued."
              }
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
}
