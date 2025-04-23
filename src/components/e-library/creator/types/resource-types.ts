
import { ResourceType, ResourceCategory } from "../creator-e-library-content";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  category: ResourceCategory;
  description: string;
  isPremium: boolean;
  createdAt: Date;
  creatorId: string;
  url?: string;
  thumbnailUrl?: string;
}
