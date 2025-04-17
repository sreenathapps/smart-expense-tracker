package com.saiapps.expensetracker;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.saiapps.expensetracker.model.Expenses;
import com.saiapps.expensetracker.service.ExpenseService;

@SpringBootApplication
public class ExpenseTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerApplication.class, args);
	}

	@Bean
	CommandLineRunner testExpenseService(ExpenseService expenseService) {
		return args -> {
			Expenses expense = new Expenses();
			expense.setDescription("Test expense");
			expense.setAmount(10.99);
			expense.setCategory("Other");

			expenseService.addExpense(expense);
			System.out.println("Saved expense: " + expense);
		};
	}

}
