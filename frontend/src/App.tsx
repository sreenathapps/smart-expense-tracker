import { Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { createExpense, deleteExpense, getExpenses } from "./api/Api";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTable from "./components/ExpenseTable";
import useLocalStorage from "./hooks/useLocalStorage";
import { Expense } from "./types/expense";

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getExpenses();
        console.log("Fetched expenses:", data); // Log to check data
        setExpenses(data); // Update state with API data
      } catch (err) {
        setError("Failed to load expenses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, []); // Empty dependency array to run once on mount

  const handleAddExpense = async (newExpense: Expense) => {
    try {
      const createdExpense = await createExpense(newExpense);
      setExpenses([createdExpense, ...expenses]);
    } catch (err) {
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await deleteExpense(id); // Call API to delete
      setExpenses(expenses.filter((expense) => expense.id !== id)); // Update state
    } catch (err) {
      setError("Failed to delete expense. Please try again.");
    }
  };

  const filteredExpenses =
    selectedCategory === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Receipt size={28} className="text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">
              Expense Tracker
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-600">Loading expenses...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ExpenseForm onAddExpense={handleAddExpense} />
              <ExpenseSummary expenses={expenses} />
            </div>
            <div className="lg:col-span-2">
              <ExpenseFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <ExpenseTable
                expenses={filteredExpenses}
                onDeleteExpense={handleDeleteExpense}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
