package com.saiapps.expensetracker.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Value("${ai.apikey.env}")
    private String apiKey;

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World! I'm the first test attempt of Expense Tracker with AI application " + apiKey;
    }
}
