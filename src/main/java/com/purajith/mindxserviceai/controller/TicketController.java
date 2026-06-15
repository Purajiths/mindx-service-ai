package com.purajith.mindxserviceai.controller;

import com.purajith.mindxserviceai.dto.TicketDetailsResponse;
import com.purajith.mindxserviceai.dto.TicketStatsResponse;
import com.purajith.mindxserviceai.dto.StatusUpdateRequest;
import com.purajith.mindxserviceai.entity.Ticket;
import com.purajith.mindxserviceai.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public Ticket createTicket(@Valid @RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/stats")
    public TicketStatsResponse getTicketStats() {
        return ticketService.getTicketStats();
    }

    @GetMapping("/details/{id}")
    public TicketDetailsResponse getTicketById(@PathVariable Long id) {
        return ticketService.getTicketDetails(id);
    }

    @PutMapping("/{id}/status")
    public Ticket updateTicketStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {

        return ticketService.updateTicketStatus(id, request.getStatus());
    }
}
