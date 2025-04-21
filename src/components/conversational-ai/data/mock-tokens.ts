
import { TokenEntry, TokenRedemptionOption, TokenStats } from "../types/token-types";

export const mockTokenHistory: TokenEntry[] = [
  { 
    id: 1, 
    description: "Completed Sustainability Fundamentals Course", 
    amount: 50, 
    date: "2024-01-15",
    source: "course_completion",
    courseId: 1,
    creatorId: "creator1"
  },
  { 
    id: 2, 
    description: "Passed Carbon Reduction Strategies Assessment", 
    amount: 25, 
    date: "2024-02-20",
    source: "assessment_success",
    courseId: 2,
    creatorId: "creator1" 
  },
  { 
    id: 3, 
    description: "Top performer in ESG Reporting assessment", 
    amount: 75, 
    date: "2024-03-10",
    source: "top_performance",
    courseId: 3,
    creatorId: "creator2" 
  },
  { 
    id: 4, 
    description: "Participation in Sustainable Energy workshop", 
    amount: 15, 
    date: "2024-04-05",
    source: "participation",
    creatorId: "creator3" 
  }
];

export const mockRedemptionOptions: TokenRedemptionOption[] = [
  {
    id: 101,
    title: "Advanced Sustainability Practices",
    description: "Unlock this premium course on cutting-edge sustainability methods",
    tokenCost: 100,
    type: "course",
    creatorId: "creator1",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 102,
    title: "Green Business Transformation E-Book",
    description: "A comprehensive guide to transforming business practices",
    tokenCost: 75,
    type: "ebook",
    creatorId: "creator2",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 103,
    title: "Exclusive Research Papers Bundle",
    description: "Access to premium research content on environmental science",
    tokenCost: 50,
    type: "content",
    creatorId: "creator1",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 104,
    title: "Sustainable Leadership Course",
    description: "Learn how to lead sustainability initiatives in organizations",
    tokenCost: 120,
    type: "course",
    creatorId: "creator3",
    imageUrl: "/placeholder.svg"
  }
];

export const mockTokenStats: TokenStats = {
  total: 165,
  rank: "Silver",
  nextRank: "Gold",
  nextRankTokens: 250
};
