package com.purajith.mindxserviceai.service;

import com.purajith.mindxserviceai.dto.TicketDetailsResponse;
import com.purajith.mindxserviceai.dto.TicketStatsResponse;
import com.purajith.mindxserviceai.entity.Message;
import com.purajith.mindxserviceai.entity.Ticket;
import com.purajith.mindxserviceai.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final MessageService messageService;
    private final AIService aiService;

    public TicketService(
            TicketRepository ticketRepository,
            MessageService messageService,
            AIService aiService) {

        this.ticketRepository = ticketRepository;
        this.messageService = messageService;
        this.aiService = aiService;
    }

    public Ticket createTicket(Ticket ticket) {

        ticket.setCreatedAt(LocalDateTime.now());

        String originalQuery = ticket.getQuery() == null ? "" : ticket.getQuery();
        String query = originalQuery.toLowerCase();

        if (query.contains("refund")
                || query.contains("complaint")
                || query.contains("angry")) {

            ticket.setStatus("NEEDS_HUMAN");
        } else {
            ticket.setStatus("OPEN");
        }

        Ticket savedTicket = ticketRepository.save(ticket);

        messageService.saveMessage(
                savedTicket.getId(),
                "USER",
                originalQuery);

        String aiResponse =
                aiService.generateResponse(originalQuery);

        messageService.saveMessage(
                savedTicket.getId(),
                "AI",
                aiResponse);

        return savedTicket;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public TicketDetailsResponse getTicketDetails(Long id) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ticket not found"));

        List<Message> messages =
                messageService.getMessagesByTicketId(id);

        return new TicketDetailsResponse(ticket, messages);
    }

    public TicketStatsResponse getTicketStats() {

        long openTickets =
                ticketRepository.countByStatus("OPEN");

        long needsHumanTickets =
                ticketRepository.countByStatus("NEEDS_HUMAN");

        return new TicketStatsResponse(
                openTickets,
                needsHumanTickets);
    }

    public Ticket updateTicketStatus(Long id, String status) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ticket not found"));

        ticket.setStatus(status);

        return ticketRepository.save(ticket);
    }
}
