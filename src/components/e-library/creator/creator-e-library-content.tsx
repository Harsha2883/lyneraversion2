
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ResourceTypeSelector } from "@/components/e-library/creator/resource-type-selector";
import { ResourceCategorySelector } from "@/components/e-library/creator/resource-category-selector";
import { ResourceForm } from "@/components/e-library/creator/resource-form";
import { ResourcesList } from "@/components/e-library/creator/resources-list";

export type ResourceType = "audio" | "video" | "document";
export type ResourceCategory = "CSR" | "ESG" | "AI" | "Carbon market" | "Sustainability" | "Other";

export interface Resource {
  id: string;
  type: ResourceType;
  category: ResourceCategory;
  title: string;
  url: string;
  isPremium: boolean;
  courseId?: string | null;
  createdAt: Date;
}

export function CreatorELibraryContent() {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);

  // Reset category when type changes
  const handleTypeChange = (type: ResourceType) => {
    setSelectedType(type);
    setSelectedCategory(null);
  };

  const handleResourceAdded = (resource: Resource) => {
    setResources(prev => [resource, ...prev]);
    // Reset selections after adding
    setSelectedType(null);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="E-Library Management"
        description="Upload and manage your educational resources for learners"
      />

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="create">Create Resource</TabsTrigger>
          <TabsTrigger value="manage">Manage Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          {!selectedType ? (
            <ResourceTypeSelector onSelect={handleTypeChange} />
          ) : !selectedCategory ? (
            <ResourceCategorySelector 
              resourceType={selectedType}
              onSelect={setSelectedCategory}
              onBack={() => setSelectedType(null)}
            />
          ) : (
            <ResourceForm 
              resourceType={selectedType} 
              resourceCategory={selectedCategory}
              onResourceAdded={handleResourceAdded}
              onBack={() => setSelectedCategory(null)}
            />
          )}
        </TabsContent>

        <TabsContent value="manage">
          <ResourcesList resources={resources} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
