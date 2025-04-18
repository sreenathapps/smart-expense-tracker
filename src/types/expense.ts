export type Category =
  | "Food"
  | ""
  | "Transportation"
  | "Housing"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Shopping"
  | "Other";

export const CATEGORIES: Category[] = [
  "",
  "Food",
  "Transportation",
  "Housing",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Other",
];

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
  date: string; // ISO string format
}
