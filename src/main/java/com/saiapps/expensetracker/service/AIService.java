package com.saiapps.expensetracker.service;

import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.chat.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.List;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    public String predictCategory(String expenseDescription) {
        try {
            // Initialize service with timeout
            OpenAiService service = new OpenAiService(apiKey, Duration.ofSeconds(30));

            // Create the prompt
            String prompt = "Categorize this expense in ONE word (Food, Travel, Shopping, Entertainment, Bills, Other): \""
                    + expenseDescription + "\"";

            // Create chat message
            ChatMessage userMessage = new ChatMessage(ChatMessageRole.USER.value(), prompt);

            // Make the request
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model("gpt-3.5-turbo")
                    .messages(List.of(userMessage))
                    .maxTokens(10)
                    .build();

            ChatCompletionResult result = service.createChatCompletion(request);
            return result.getChoices().get(0).getMessage().getContent().trim();
        } catch (Exception e) {
            return e.toString();
        }
    }
}