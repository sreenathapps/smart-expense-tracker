import React from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES, Category } from '../types/expense';

interface ExpenseFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center mb-6 space-x-2">
      <Filter size={20} className="text-gray-500" />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700 bg-white"
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;