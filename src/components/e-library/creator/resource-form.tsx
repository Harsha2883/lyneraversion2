
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { Resource, ResourceCategory, ResourceType } from "./creator-e-library-content";
import { ShareResourceModal } from "./share-resource-modal";

interface ResourceFormProps {
  resourceType: ResourceType;
  resourceCategory: ResourceCategory;
  onResourceAdded: (resource: Resource) => void;
  onBack: () => void;
}

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  url: z.string().url("Please enter a valid URL"),
  isPremium: z.boolean().default(false),
  courseId: z.string().optional(),
});

export function ResourceForm({ 
  resourceType, 
  resourceCategory, 
  onResourceAdded,
  onBack 
}: ResourceFormProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      isPremium: false,
      courseId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a new resource
    const newResource: Resource = {
      id: Date.now().toString(),
      type: resourceType,
      category: resourceCategory,
      title: values.title,
      url: values.url,
      isPremium: values.isPremium,
      courseId: values.courseId || null,
      createdAt: new Date(),
    };
    
    // Pass to parent component
    onResourceAdded(newResource);
    
    // Store for sharing
    setCurrentResource(newResource);
    
    // Show success toast
    toast.success(`${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} resource added successfully!`);
    
    // Open share modal
    setIsShareModalOpen(true);
  };

  const typeLabel = 
    resourceType === "audio" ? "Audio" :
    resourceType === "video" ? "Video" : "Document";

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack} 
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Add {typeLabel} Resource</h2>
            <p className="text-muted-foreground">
              Category: {resourceCategory} | Type: {typeLabel}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter resource title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={`Enter ${resourceType} URL`}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to Course (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Course ID or leave empty" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPremium"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Premium Content</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Mark this resource as premium content for paid subscribers only
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button type="submit">
                Add Resource
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {currentResource && (
        <ShareResourceModal
          resource={currentResource}
          open={isShareModalOpen}
          onOpenChange={setIsShareModalOpen}
        />
      )}
    </>
  );
}
