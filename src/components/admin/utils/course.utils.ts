export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

// Mock data for courses - in a real app, this would come from an API
export const mockCourses = [
  { 
    id: "1", 
    title: "Introduction to ESG Standards", 
    creatorName: "Jane Smith", 
    creatorEmail: "jane.smith@example.com",
    status: "approved", 
    submittedDate: "2024-03-15", 
    category: "ESG",
    earnings: 1250,
    enrollments: 78,
    completions: 45
  },
  { 
    id: "2", 
    title: "Carbon Market Fundamentals", 
    creatorName: "John Doe", 
    creatorEmail: "john.doe@example.com",
    status: "pending", 
    submittedDate: "2024-04-10", 
    category: "Carbon Markets",
    earnings: 0,
    enrollments: 0,
    completions: 0
  },
  { 
    id: "3", 
    title: "Sustainability in Corporate Governance", 
    creatorName: "Alice Williams", 
    creatorEmail: "alice.williams@example.com",
    status: "approved", 
    submittedDate: "2024-02-28", 
    category: "Sustainability",
    earnings: 875,
    enrollments: 42,
    completions: 36
  },
  { 
    id: "4", 
    title: "AI for Environmental Monitoring", 
    creatorName: "Robert Johnson", 
    creatorEmail: "robert.johnson@example.com",
    status: "rejected", 
    submittedDate: "2024-03-30", 
    category: "AI",
    earnings: 0,
    enrollments: 0,
    completions: 0
  },
  { 
    id: "5", 
    title: "CSR Implementation Strategies", 
    creatorName: "Emily Davis", 
    creatorEmail: "emily.davis@example.com",
    status: "pending", 
    submittedDate: "2024-04-05", 
    category: "CSR",
    earnings: 0,
    enrollments: 0,
    completions: 0
  }
] as const;
