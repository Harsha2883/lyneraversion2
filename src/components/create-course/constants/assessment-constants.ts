
/**
 * Constants for the assessment system
 */

// Question configuration
export const MAX_QUESTIONS = 10;
export const DEFAULT_OPTIONS_LIMIT = 5;
export const RECOMMENDED_QUESTIONS_COUNT = 10;

// Question types
export const QUESTION_TYPES = {
  OBJECTIVE: "objective",
  SUBJECTIVE: "subjective",
} as const;

// Scoring
export const SUBJECTIVE_MAX_SCORE = 10;

// Filter types
export const FILTER_TYPES = {
  PENDING: "pending",
  REVIEWED: "reviewed",
} as const;
