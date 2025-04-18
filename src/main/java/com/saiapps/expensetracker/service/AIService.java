package com.saiapps.expensetracker.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.saiapps.expensetracker.repository.AIRepository;

@Service
public class AIService implements AIRepository {

    @Value("${openai.api.key}")
    private String geminiApiKey; // Use the Gemini API Key
    @Value("${api.url.env}")
    private String GEMINI_API_URL; // Use the appropriate Gemini API URL

    private final HttpClient httpClient;

    public AIService() {
        this.httpClient = HttpClient.newHttpClient();
    }

    /**
     * Calls the Gemini AI API to classify the expense description into a
     * category.
     *
     * @param description The description of the expense.
     * @return The categorized expense type.
     */
    @Override
    public String categorizeExpense(String description) {
        try {
            // Build the request body to simulate the conversation
            JSONObject requestBody = new JSONObject();
            JSONArray contents = new JSONArray();
            JSONObject content = new JSONObject();
            JSONArray parts = new JSONArray();
            JSONObject part = new JSONObject();

            part.put("text",
                    "Categorize this expense in ONE word (Food, Travel, Shopping, Entertainment, Bills, Electronics, Other): "
                            + description);
            parts.put(part);
            content.put("role", "user");
            content.put("parts", parts);
            contents.put(content);

            requestBody.put("contents", contents);

            // Construct the Gemini API URL with the API key
            String url = GEMINI_API_URL + geminiApiKey;

            // Build the HttpRequest with appropriate headers and body
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                    .build();

            // Send the HTTP request and receive the response
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            // Log the response for debugging (you can remove this after confirming the
            // structure)
            System.out.println("Response: " + response.body());

            if (response.statusCode() == 200) {
                // Parse the response using org.json
                JSONObject responseBody = new JSONObject(response.body());

                String category = responseBody.getJSONArray("candidates")
                        .getJSONObject(0)
                        .getJSONObject("content")
                        .getJSONArray("parts")
                        .getJSONObject(0)
                        .getString("text")
                        .trim();
                return category;
            } else {
                return "Others";
            }

        } catch (Exception e) {
            return "Other";
        }

    }
}
