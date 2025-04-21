
import { 
  CourseHistoryItem, 
  LearningCurveData, 
  SkillComparisonData, 
  CourseRecommendation 
} from "../types";

// Mock course history data
export const mockCourseHistory: CourseHistoryItem[] = [
  {
    id: "course1",
    title: "ESG Reporting Fundamentals",
    description: "Learn the essentials of Environmental, Social, and Governance reporting standards and practices.",
    status: "completed",
    duration: "6 hours",
    enrollmentDate: "2023-11-15",
    completionDate: "2023-12-01",
    score: 92
  },
  {
    id: "course2",
    title: "Carbon Footprint Calculation",
    description: "Master the methods to accurately measure and report carbon emissions for businesses and products.",
    status: "completed",
    duration: "8 hours",
    enrollmentDate: "2023-12-10",
    completionDate: "2023-12-28",
    score: 85
  },
  {
    id: "course3",
    title: "Sustainable Supply Chain Management",
    description: "Strategies for developing and maintaining environmentally responsible supply chains.",
    status: "in-progress",
    duration: "10 hours",
    enrollmentDate: "2024-01-15",
  },
  {
    id: "course4",
    title: "Climate Regulations & Compliance",
    description: "Navigate the complex landscape of global climate regulations and ensure business compliance.",
    status: "not-started",
    duration: "7 hours"
  },
  {
    id: "course5",
    title: "Renewable Energy Integration",
    description: "Learn how to integrate renewable energy sources into existing business operations.",
    status: "completed",
    duration: "12 hours",
    enrollmentDate: "2024-02-01",
    completionDate: "2024-02-20",
    score: 90
  },
  {
    id: "course6",
    title: "Corporate Social Responsibility",
    description: "Develop effective CSR strategies that align with business goals and stakeholder expectations.",
    status: "in-progress",
    duration: "9 hours",
    enrollmentDate: "2024-03-05",
  }
];

// Mock learning curve data
export const mockLearningCurveData: LearningCurveData[] = [
  {
    date: "Jan 2023",
    score: 68,
    courseId: "course0",
    courseName: "Sustainability Basics"
  },
  {
    date: "Feb 2023",
    score: 72,
    courseId: "course1",
    courseName: "ESG Reporting Fundamentals"
  },
  {
    date: "Mar 2023",
    score: 75,
    courseId: "course2",
    courseName: "Carbon Footprint Calculation"
  },
  {
    date: "Apr 2023",
    score: 73,
    courseId: "course3",
    courseName: "Sustainable Supply Chain Management"
  },
  {
    date: "May 2023",
    score: 80,
    courseId: "course4",
    courseName: "Climate Regulations & Compliance"
  },
  {
    date: "Jun 2023",
    score: 85,
    courseId: "course5",
    courseName: "Renewable Energy Integration"
  },
  {
    date: "Jul 2023",
    score: 83,
    courseId: "course6",
    courseName: "Corporate Social Responsibility"
  },
  {
    date: "Aug 2023",
    score: 88,
    courseId: "course7",
    courseName: "Green Supply Chain"
  },
  {
    date: "Sep 2023",
    score: 90,
    courseId: "course8",
    courseName: "Sustainable Business Models"
  },
  {
    date: "Oct 2023",
    score: 89,
    courseId: "course9",
    courseName: "ESG Investment Strategies"
  },
  {
    date: "Nov 2023",
    score: 92,
    courseId: "course10",
    courseName: "Advanced Sustainability Analysis"
  },
  {
    date: "Dec 2023",
    score: 91,
    courseId: "course11",
    courseName: "Corporate Carbon Strategy"
  }
];

// Mock skill comparison data
export const mockSkillComparisonData: SkillComparisonData = {
  skills: [
    { name: "ESG Knowledge", userScore: 85, industryAverage: 70 },
    { name: "Carbon Management", userScore: 78, industryAverage: 65 },
    { name: "Sustainable Business", userScore: 92, industryAverage: 75 },
    { name: "Climate Regulations", userScore: 68, industryAverage: 72 },
    { name: "Environmental Risk", userScore: 88, industryAverage: 68 },
    { name: "CSR Strategy", userScore: 82, industryAverage: 76 }
  ],
  strengths: [
    "Sustainable Business Strategy Development",
    "Environmental Risk Assessment",
    "ESG Knowledge Integration",
    "Corporate Sustainability Planning"
  ],
  areasToImprove: [
    "Climate Regulations Compliance",
    "International Carbon Markets",
    "Green Finance Instruments"
  ]
};

// Mock course recommendations
export const mockRecommendedCourses = {
  basedOnHistory: [
    {
      id: "rec1",
      title: "Advanced ESG Reporting & Analysis",
      description: "Take your ESG reporting skills to the next level with in-depth analysis techniques.",
      image: "/placeholder.svg",
      creator: {
        name: "Dr. Sarah Johnson",
        image: "/placeholder.svg",
      },
      categoryBadge: "ESG Compliance",
      duration: "8 hours",
      matchScore: 98
    },
    {
      id: "rec2",
      title: "Corporate Carbon Neutrality Strategies",
      description: "Learn how to develop effective carbon neutrality strategies for organizations.",
      image: "/placeholder.svg",
      creator: {
        name: "Prof. Michael Chen",
        image: "/placeholder.svg",
      },
      categoryBadge: "Carbon Management",
      duration: "10 hours",
      matchScore: 95
    },
    {
      id: "rec3",
      title: "Lifecycle Assessment for Products",
      description: "Master the techniques for conducting comprehensive lifecycle assessments.",
      image: "/placeholder.svg",
      creator: {
        name: "Emma Rodriguez",
        image: "/placeholder.svg",
      },
      categoryBadge: "Sustainable Business",
      duration: "9 hours",
      matchScore: 92
    }
  ],
  basedOnSkillGaps: [
    {
      id: "gap1",
      title: "EU Sustainability Reporting Directives",
      description: "Stay compliant with the latest EU sustainability reporting directives and regulations.",
      image: "/placeholder.svg",
      creator: {
        name: "Anna Fischer",
        image: "/placeholder.svg",
      },
      categoryBadge: "Climate Regulations",
      duration: "6 hours"
    },
    {
      id: "gap2",
      title: "Carbon Markets & Trading",
      description: "Understand the fundamentals of carbon markets, credits, and trading mechanisms.",
      image: "/placeholder.svg",
      creator: {
        name: "Dr. James Wilson",
        image: "/placeholder.svg",
      },
      categoryBadge: "Carbon Management",
      duration: "7 hours"
    },
    {
      id: "gap3",
      title: "Green Bonds & Sustainable Finance",
      description: "Learn about green bonds, sustainability-linked loans, and ESG investment products.",
      image: "/placeholder.svg",
      creator: {
        name: "Maria Sanchez",
        image: "/placeholder.svg",
      },
      categoryBadge: "Green Finance",
      duration: "8 hours"
    }
  ],
  trending: [
    {
      id: "trend1",
      title: "AI for Sustainability Analytics",
      description: "Leveraging artificial intelligence to enhance sustainability data analysis and reporting.",
      image: "/placeholder.svg",
      creator: {
        name: "Alex Turner",
        image: "/placeholder.svg",
      },
      categoryBadge: "Tech & Sustainability",
      duration: "10 hours"
    },
    {
      id: "trend2",
      title: "Biodiversity Impact Assessment",
      description: "Methods to measure, report, and mitigate impacts on biodiversity in business operations.",
      image: "/placeholder.svg",
      creator: {
        name: "Dr. Clara Morgan",
        image: "/placeholder.svg",
      },
      categoryBadge: "Environmental Impact",
      duration: "8 hours"
    },
    {
      id: "trend3",
      title: "Net Zero Strategy Implementation",
      description: "Practical approaches to implementing a net zero carbon strategy in organizations.",
      image: "/placeholder.svg",
      creator: {
        name: "Prof. Richard Lee",
        image: "/placeholder.svg",
      },
      categoryBadge: "Carbon Management",
      duration: "12 hours"
    }
  ]
};
