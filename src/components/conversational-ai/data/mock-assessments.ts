
import { Assessment } from "../types/assessment-types";

export const mockAssessments: Assessment[] = [
  {
    id: 1,
    title: "Sustainability Fundamentals",
    description: "Test your knowledge on sustainability basics",
    status: "completed",
    attemptsUsed: 1,
    maxAttempts: 3,
    passScore: 70,
    tokenReward: 25,
    questions: [
      {
        id: 101,
        text: "What are the three pillars of sustainability?",
        type: "subjective"
      },
      {
        id: 102,
        text: "Which of the following is a renewable energy source?",
        type: "objective",
        options: ["Coal", "Natural Gas", "Solar", "Oil"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 2,
    title: "Carbon Reduction Strategies",
    description: "Assessment on carbon reduction methods",
    status: "incomplete",
    attemptsUsed: 0,
    maxAttempts: 3,
    passScore: 60,
    tokenReward: 30,
    questions: [
      {
        id: 201,
        text: "Explain carbon offsetting in your own words.",
        type: "subjective"
      },
      {
        id: 202,
        text: "Which sector is responsible for the largest percentage of global carbon emissions?",
        type: "objective",
        options: ["Transportation", "Energy production", "Agriculture", "Manufacturing"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: "ESG Reporting",
    description: "Environmental, Social and Governance reporting standards",
    status: "in-progress",
    attemptsUsed: 2,
    maxAttempts: 3,
    passScore: 80,
    tokenReward: 40,
    questions: [
      {
        id: 301,
        text: "Describe the importance of ESG reporting for businesses.",
        type: "subjective"
      },
      {
        id: 302,
        text: "Which framework is commonly used for sustainability reporting?",
        type: "objective",
        options: ["IFRS", "GRI", "FASB", "GAAP"],
        correctAnswer: 1
      }
    ]
  }
];
