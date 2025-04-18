package com.saiapps.expensetracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saiapps.expensetracker.model.Expenses;

@Repository
public interface ExpenseJpaRepository extends JpaRepository<Expenses, Long > {
    List<Expenses> findByCategory(String category);
}
