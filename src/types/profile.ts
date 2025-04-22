
export interface ProfileFormData {
  first_name: string;
  last_name: string;
  gender: string;
  birthdate: Date | string | undefined;
  profession: string;
  education: string;
  aspiration: string;
  social_media: Record<string, string>;
  avatar_url: string;
}

export interface ProfileFormState {
  formData: ProfileFormData;
  loading: boolean;
  saving: boolean;
  error: string | null;
  editMode: boolean;
  pendingAvatarFile: File | null;
}
