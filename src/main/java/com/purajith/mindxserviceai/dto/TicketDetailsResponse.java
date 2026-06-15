package com.purajith.mindxserviceai.dto;

import com.purajith.mindxserviceai.entity.Message;
import com.purajith.mindxserviceai.entity.Ticket;

import java.util.List;

public class TicketDetailsResponse {

    private Ticket ticket;
    private List<Message> messages;

    public TicketDetailsResponse(Ticket ticket, List<Message> messages) {
        this.ticket = ticket;
        this.messages = messages;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public List<Message> getMessages() {
        return messages;
    }
}