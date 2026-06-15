package com.purajith.mindxserviceai.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequest {

    private Long userId;

    private String query;
}