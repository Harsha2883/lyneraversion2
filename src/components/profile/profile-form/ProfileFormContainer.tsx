
import { useProfileForm } from "@/hooks/useProfileForm";
import { ProfileFormError, ProfileFormLoading } from "../states/profile-form-states";
import { FormActions } from "../form-actions";
import { ProfileFormCard } from "./ProfileFormCard";
import { ProfileFormSections } from "./ProfileFormSections";
import { toast } from "sonner";

export function ProfileFormContainer() {
  const {
    formData,
    loading,
    saving,
    error,
    editMode,
    pendingAvatarFile,
    handleFieldChange,
    handleSave,
    handleEdit,
    handleCancel,
    setAvatarFile,
    retry
  } = useProfileForm();

  if (loading) {
    return <ProfileFormLoading />;
  }

  if (error) {
    return <ProfileFormError error={error} onRetry={retry} />;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting profile form with data:", formData);
    
    // Client-side validation
    if (editMode) {
      if (!formData.first_name || !formData.last_name) {
        console.error("First name and last name are required");
        toast.error("First name and last name are required");
        return;
      }
    }
    
    handleSave(e);
  };

  return (
    <form onSubmit={onSubmit}>
      <ProfileFormCard>
        <ProfileFormSections
          formData={formData}
          editMode={editMode}
          pendingAvatarFile={pendingAvatarFile}
          setAvatarFile={setAvatarFile}
          handleFieldChange={handleFieldChange}
        />
        <FormActions 
          editMode={editMode} 
          saving={saving} 
          onEdit={handleEdit} 
          onCancel={handleCancel} 
        />
      </ProfileFormCard>
    </form>
  );
}
