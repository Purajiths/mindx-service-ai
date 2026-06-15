package com.purajith.mindxserviceai.repository;

import com.purajith.mindxserviceai.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    long countByStatus(String status);

}