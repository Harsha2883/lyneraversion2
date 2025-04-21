
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AvatarUpload } from "./avatar-upload";
import { PersonalInfo } from "./sections/personal-info";
import { ProfessionalInfo } from "./sections/professional-info";
import { SocialMedia } from "./sections/social-media";

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.string().optional(),
  birthdate: z.string().optional(),
  profession: z.string().optional(),
  education: z.string().optional(),
  aspiration: z.string().optional(),
  social_media: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { profile, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      gender: profile?.gender || "",
      birthdate: profile?.birthdate || "",
      profession: profile?.profession || "",
      education: profile?.education || "",
      aspiration: profile?.aspiration || "",
      social_media: profile?.social_media as ProfileFormValues["social_media"] || {
        linkedin: "",
        twitter: "",
        github: "",
      },
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", user.id)
        .single();

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <AvatarUpload />
          <PersonalInfo control={form.control} />
          <ProfessionalInfo control={form.control} />
          <SocialMedia control={form.control} />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
