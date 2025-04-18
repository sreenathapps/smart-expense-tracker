/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string to a more readable format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Generate a unique ID
 */

export const generateLongId = (): number => {
  // Combine timestamp and random part to ensure uniqueness and fit within Java's Long range
  const timestampPart = Date.now(); // milliseconds since epoch
  const randomPart = Math.floor(Math.random() * 10000); // up to 4-digit random

  return Number(`${timestampPart}${randomPart}`);
};