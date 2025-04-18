package com.saiapps.expensetracker.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface AIRepository {
    public String categorizeExpense(String description);
}
