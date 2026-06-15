package com.purajith.mindxserviceai.dto;

public class TicketStatsResponse {

    private long openTickets;
    private long needsHumanTickets;

    public TicketStatsResponse(long openTickets, long needsHumanTickets) {
        this.openTickets = openTickets;
        this.needsHumanTickets = needsHumanTickets;
    }

    public long getOpenTickets() {
        return openTickets;
    }

    public long getNeedsHumanTickets() {
        return needsHumanTickets;
    }
}