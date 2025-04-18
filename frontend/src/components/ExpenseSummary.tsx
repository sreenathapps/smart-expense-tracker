import React, { useMemo } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { Expense } from '../types/expense';
import { formatCurrency } from '../utils/formatters';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const categorySummary = useMemo(() => {
    const summary: Record<string, number> = {};
    
    expenses.forEach((expense) => {
      if (summary[expense.category]) {
        summary[expense.category] += expense.amount;
      } else {
        summary[expense.category] = expense.amount;
      }
    });
    
    // Sort by amount (highest first)
    return Object.entries(summary)
      .sort(([, amountA], [, amountB]) => amountB - amountA)
      .slice(0, 3); // Top 3 categories
  }, [expenses]);

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Summary</h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg flex items-center">
        <DollarSign size={24} className="text-blue-600 mr-3" />
        <div>
          <p className="text-sm text-blue-600 font-medium">Total Expenses</p>
          <p className="text-2xl font-bold text-blue-700">{formatCurrency(totalAmount)}</p>
        </div>
      </div>
      
      {categorySummary.length > 0 && (
        <div>
          <div className="flex items-center mb-3">
            <TrendingUp size={18} className="text-gray-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-700">Top Categories</h3>
          </div>
          
          <div className="space-y-2">
            {categorySummary.map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${getCategoryDotColor(category)}`} />
                  <span className="text-sm text-gray-600">{category}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for category dot colors
const getCategoryDotColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    Food: 'bg-green-500',
    Transportation: 'bg-blue-500',
    Housing: 'bg-purple-500',
    Entertainment: 'bg-indigo-500',
    Utilities: 'bg-yellow-500',
    Healthcare: 'bg-red-500',
    Shopping: 'bg-pink-500',
    Other: 'bg-gray-500',
  };

  return colorMap[category] || 'bg-gray-500';
};

export default ExpenseSummary;