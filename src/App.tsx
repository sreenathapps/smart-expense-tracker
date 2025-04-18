import React, { useState } from 'react';
import { Receipt } from 'lucide-react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSummary from './components/ExpenseSummary';
import { Expense } from './types/expense';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const filteredExpenses = selectedCategory === 'all'
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Receipt size={28} className="text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;