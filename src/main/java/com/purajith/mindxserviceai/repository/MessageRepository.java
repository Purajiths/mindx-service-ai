package com.purajith.mindxserviceai.repository;

import com.purajith.mindxserviceai.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByTicketId(Long ticketId);

}