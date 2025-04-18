import axios from "axios";
import { Expense } from "../types/expense";

const API_URL = "http://localhost:8080";

// Fetch all expenses from the backend
export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/expenses`);
    // Map backend data to match Expense interface (convert id to string)
    return response.data.map((item: any) => ({
      id: item.id.toString(), // Convert Long to string
      description: item.description,
      amount: item.amount,
      category: item.category,
      date: item.date,
    }));
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error("Failed to fetch expenses");
  }
};
export const deleteExpense = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/expenses/${id}`);
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw new Error("Failed to delete expense");
  }
};
export const createExpense = async (expense: Expense): Promise<Expense> => {
  let newExpense = (({ id, ...object }) => object)(expense);

  console.log(JSON.stringify(newExpense));

  try {
    const response = await axios.post(`${API_URL}/api/expenses`, newExpense);
    return {
      id: response.data.id,
      description: response.data.description,
      amount: response.data.amount,
      category: response.data.category,
      date: response.data.date,
    };
  } catch (error) {
    console.error("Error creating expense:", error);
    throw new Error("Failed to create expense");
  }
};
