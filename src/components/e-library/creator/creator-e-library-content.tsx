
import { useState } from "react";
import { ResourceTypeSelector } from "./resource-type-selector";
import { ResourceCategorySelector } from "./resource-category-selector";
import { ResourceForm } from "./resource-form";
import { ResourcesList } from "./resources-list";

export type ResourceType = "audio" | "video" | "document";
export type ResourceCategory = "CSR" | "ESG" | "AI" | "Carbon market" | "Sustainability" | "Other";

// Mock data for resources
const mockResources = [
  {
    id: "1",
    title: "Introduction to ESG",
    type: "document" as ResourceType,
    category: "ESG" as ResourceCategory,
    description: "A comprehensive guide to Environmental, Social, and Governance",
    isPremium: false,
    createdAt: new Date(),
    creatorId: "user123"
  },
  {
    id: "2",
    title: "AI in Sustainability",
    type: "video" as ResourceType,
    category: "AI" as ResourceCategory,
    description: "How AI is transforming sustainability practices",
    isPremium: true,
    createdAt: new Date(),
    creatorId: "user123"
  }
];

export function CreatorELibraryContent() {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleReset = () => {
    setSelectedType(null);
    setSelectedCategory(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto py-6">
      {!selectedType && (
        <ResourceTypeSelector onSelect={setSelectedType} />
      )}
      
      {selectedType && !selectedCategory && (
        <ResourceCategorySelector
          resourceType={selectedType}
          onSelect={setSelectedCategory}
          onBack={handleReset}
        />
      )}
      
      {selectedType && selectedCategory && !showForm && (
        <ResourceForm
          resourceType={selectedType}
          category={selectedCategory}
          onSubmitted={() => {
            setShowForm(false);
            handleReset();
          }}
          onCancel={handleReset}
        />
      )}

      <div className="mt-8">
        <ResourcesList resources={mockResources} />
      </div>
    </div>
  );
}
