package com.saiapps.expensetracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saiapps.expensetracker.model.Expenses;
import com.saiapps.expensetracker.repository.ExpenseJpaRepository;
import com.saiapps.expensetracker.repository.ExpenseRepository;

@Service
public class ExpenseService implements ExpenseRepository {
    @Autowired
    private ExpenseJpaRepository expenseRepository;

    @Override
    public Expenses addExpense(Expenses expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expenses> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public Expenses getExpense(Long id) {
        return expenseRepository.findById(id).get();
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    @Override
    public List<Expenses> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category);
    }
}
