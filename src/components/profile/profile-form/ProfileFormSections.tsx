
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvatarSection } from "../sections/AvatarSection";
import { PersonalInfoSection } from "../sections/PersonalInfoSection";
import { ProfessionalInfoSection } from "../sections/ProfessionalInfoSection";
import { SocialMediaSection } from "../sections/SocialMediaSection";
import { ReviewsList } from "../reviews/ReviewsList";
import { FormActionsFooter } from "../form-actions";
import { useProfileForm } from "@/hooks/useProfileForm";
import { CourseReview } from "@/components/conversational-ai/types/review-types";

interface ProfileFormSectionsProps {
  isOwnProfile: boolean;
}

export function ProfileFormSections({ isOwnProfile }: ProfileFormSectionsProps) {
  const [currentTab, setCurrentTab] = useState("personal");
  const { formState, handleSaveChanges, handleCancelChanges } = useProfileForm();

  // Mock reviews data for the profile
  const mockReviews: CourseReview[] = [
    {
      id: "1",
      course_id: "course-1",
      reviewer_id: "user-1",
      creator_id: "creator-1",
      rating: 5,
      review_text: "This was an amazing course with great content!",
      created_at: new Date().toISOString(),
      is_public: true
    },
    {
      id: "2",
      course_id: "course-2",
      reviewer_id: "user-2",
      creator_id: "creator-1",
      rating: 4,
      review_text: "Very informative and well-structured course.",
      created_at: new Date().toISOString(),
      is_public: true
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6 pt-6">
          <AvatarSection isEditable={isOwnProfile} />
          <PersonalInfoSection isEditable={isOwnProfile} />
        </TabsContent>

        <TabsContent value="professional" className="space-y-6 pt-6">
          <ProfessionalInfoSection isEditable={isOwnProfile} />
        </TabsContent>

        <TabsContent value="social" className="space-y-6 pt-6">
          <SocialMediaSection isEditable={isOwnProfile} />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6 pt-6">
          <ReviewsList reviews={mockReviews} />
        </TabsContent>
      </Tabs>

      {isOwnProfile && (
        <FormActionsFooter
          onSave={handleSaveChanges}
          onCancel={handleCancelChanges}
          isDirty={formState.isDirty}
          isSubmitting={formState.isSubmitting}
        />
      )}
    </div>
  );
}
