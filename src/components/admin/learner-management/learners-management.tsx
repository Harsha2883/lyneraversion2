
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { useFilters } from "../shared/hooks/useFilters";
import { TableFilters } from "../shared/components/filters/TableFilters";
import { TablePagination } from "../shared/components/pagination/TablePagination";
import { LearnersList } from "./learners-list/LearnersList";
import { LearnerDetails } from "./learner-details/LearnerDetails";
import type { Learner, LearnerFilters } from "../types/learner.types";

// Mock data for learners
const mockLearners: Learner[] = [
  { id: "1", name: "Morgan Smith", email: "morgan.smith@example.com", enrolledCourses: 12, completedCourses: 7, status: "active", joinedDate: "2023-09-15", lastActive: "2024-04-22", progress: 58 },
  { id: "2", name: "Jamie Johnson", email: "jamie.johnson@example.com", enrolledCourses: 8, completedCourses: 8, status: "active", joinedDate: "2024-01-10", lastActive: "2024-04-24", progress: 100 },
  { id: "3", name: "Taylor Rodriguez", email: "taylor.rodriguez@example.com", enrolledCourses: 5, completedCourses: 2, status: "active", joinedDate: "2024-02-22", lastActive: "2024-04-21", progress: 40 },
  { id: "4", name: "Casey Williams", email: "casey.williams@example.com", enrolledCourses: 3, completedCourses: 0, status: "inactive", joinedDate: "2023-11-05", lastActive: "2024-03-10", progress: 0 },
  { id: "5", name: "Riley Martinez", email: "riley.martinez@example.com", enrolledCourses: 7, completedCourses: 5, status: "active", joinedDate: "2023-12-18", lastActive: "2024-04-23", progress: 71 },
  { id: "6", name: "Jordan Davis", email: "jordan.davis@example.com", enrolledCourses: 2, completedCourses: 2, status: "active", joinedDate: "2024-03-05", lastActive: "2024-04-20", progress: 100 },
  { id: "7", name: "Avery Thompson", email: "avery.thompson@example.com", enrolledCourses: 9, completedCourses: 1, status: "inactive", joinedDate: "2023-10-30", lastActive: "2024-02-28", progress: 11 },
  { id: "8", name: "Quinn Robinson", email: "quinn.robinson@example.com", enrolledCourses: 4, completedCourses: 3, status: "active", joinedDate: "2024-01-25", lastActive: "2024-04-24", progress: 75 },
];

export function LearnersManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(null);
  
  const { filters, setFilter } = useFilters<LearnerFilters>({
    search: "",
    status: "all"
  });
  
  // Filter learners based on search query and status filter
  const filteredLearners = mockLearners.filter(learner => {
    const matchesSearch = 
      learner.name.toLowerCase().includes(filters.search.toLowerCase()) || 
      learner.email.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === "all" || learner.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLearners = filteredLearners.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredLearners.length / itemsPerPage);

  const handleViewLearner = (learnerId: string) => {
    setSelectedLearnerId(learnerId);
  };

  const handleDeleteLearner = (learnerId: string) => {
    // In a real app, this would call an API to delete the learner
    toast.success("Learner deleted successfully");
    // Remove from the UI in the mock data example
  };

  const handleExportData = () => {
    // In a real app, this would generate and download a CSV/Excel file
    toast.success("Exporting learner data");
  };

  // Status options for filter
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" }
  ];

  // If a learner is selected, show their detailed view
  if (selectedLearnerId) {
    const learner = mockLearners.find(l => l.id === selectedLearnerId);
    if (learner) {
      return (
        <LearnerDetails 
          learnerId={selectedLearnerId} 
          onBack={() => setSelectedLearnerId(null)} 
        />
      );
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
          <h2 className="text-lg font-medium">Learners Management</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExportData} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <TableFilters
          searchValue={filters.search}
          onSearchChange={(value) => setFilter("search", value)}
          filterOptions={[
            {
              name: "status",
              value: filters.status,
              options: statusOptions,
              onChange: (value) => setFilter("status", value)
            }
          ]}
          className="mb-6"
        />

        <LearnersList 
          learners={paginatedLearners}
          onViewLearner={handleViewLearner}
          onDeleteLearner={handleDeleteLearner}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsShown={paginatedLearners.length}
          totalItems={filteredLearners.length}
        />
      </CardContent>
    </Card>
  );
}
