package com.saiapps.expensetracker.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String miniToolApiKey; // API Key should be in your application.properties or application.yml
    @Value("${api.url.env}")
    private String MINITOOL_API_URL; // Use the appropriate URL for MiniTool AI API

    private final HttpClient httpClient;

    public AIService() {
        this.httpClient = HttpClient.newHttpClient();
    }

    /**
     * Calls the MiniTool AI API to classify the expense description into a
     * category.
     * 
     * @param description The description of the expense.
     * @return The categorized expense type.
     */
    public String categorizeExpense(String description) {
        try {
            // Build the request body to simulate the conversation (including system, user,
            // assistant roles)
            JSONArray requestBody = new JSONArray();
            requestBody.put(new JSONObject().put("role", "system").put("content", "You are a helpful assistant."));
            requestBody.put(
                    new JSONObject().put("role", "user").put("content", "Categorize this expense in ONE word (Food, Travel, Shopping, Entertainment, Bills, Other)" + description));

            // Build the HttpRequest with appropriate headers and body
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(MINITOOL_API_URL))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + miniToolApiKey) // Authorization header for API key
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                    .build();

            // Send the HTTP request and receive the response
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            // Check the response status code
            if (response.statusCode() == 200) {
                // Parse the response using org.json
                JSONObject responseBody = new JSONObject(response.body());
                JSONArray choices = responseBody.getJSONArray("choices");

                // Assuming the assistant's reply (the last choice) contains the category
                String category = choices.getJSONObject(0).getString("content").trim();

                return category;
            } else {
                // Handle non-200 responses
                return "Error: Unable to categorize expense";
            }
        } catch (Exception e) {

            return e.toString(); // Default if an error occurs
        }
    }
}
