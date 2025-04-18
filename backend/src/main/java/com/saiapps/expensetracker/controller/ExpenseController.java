package com.saiapps.expensetracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saiapps.expensetracker.model.Expenses;
import com.saiapps.expensetracker.service.AIService;
import com.saiapps.expensetracker.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private AIService aIService;

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public List<Expenses> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/{id}")
    public Expenses getExpense(@PathVariable Long id) {
        return expenseService.getExpense(id);
    }

    @PostMapping
    public ResponseEntity<Expenses> addExpense(@RequestBody Expenses expense) {

        if (expense.getCategory() == null || expense.getCategory().isEmpty()) {
            expense.setCategory(aIService.categorizeExpense(expense.getDescription()));
        }

        Expenses savedExpense = expenseService.addExpense(expense);
        return ResponseEntity.ok(savedExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpenses(@PathVariable Long id) {
        try {
            expenseService.deleteExpense(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Expenses>> getCategoryResponses(@PathVariable String category) {
        try {
            return ResponseEntity.ok(expenseService.getExpensesByCategory(category));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

}
