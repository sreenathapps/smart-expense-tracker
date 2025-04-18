package com.saiapps.expensetracker.repository;

import java.util.List;

import com.saiapps.expensetracker.model.Expenses;

public interface ExpenseRepository {
    List<Expenses> getAllExpenses();

    Expenses getExpense(Long id);

    Expenses addExpense(Expenses expense);

    void deleteExpense(Long id);

    List<Expenses> getExpensesByCategory(String category);
}
