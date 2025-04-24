
/**
 * Formats a date string to a localized date format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

/**
 * Formats a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
};

/**
 * Calculates completion rate percentage
 */
export const calculateCompletionRate = (completions: number, enrollments: number): string => {
  if (enrollments === 0) return 'N/A';
  return `${Math.round((completions / enrollments) * 100)}%`;
};
