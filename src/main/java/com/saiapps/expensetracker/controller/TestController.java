package com.saiapps.expensetracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saiapps.expensetracker.service.AIService;

@RestController
public class TestController {

    @Autowired
    private AIService aiService;

    @Value("${openai.api.key}")
    private String apiKey;

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World! I'm the first test attempt of Expense Tracker with AI application " + apiKey;
    }

    @GetMapping("/test")
    public String getCategory() {
        return aiService.predictCategory("Spent 1500$ at Chineese Restarent eating Tandoori");
    }

}
