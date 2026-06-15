package com.purajith.mindxserviceai.service;

import org.springframework.stereotype.Service;

@Service
public class AIService {

    public String generateResponse(String query) {

        query = query.toLowerCase();

        if (query.contains("order")) {
            return "Please share your order ID.";
        }

        if (query.contains("refund")) {
            return "Your refund request has been forwarded to our support team.";
        }

        if (query.contains("payment")) {
            return "Please provide the payment reference number.";
        }

        return "Thank you for contacting support. We will assist you shortly.";
    }
}
