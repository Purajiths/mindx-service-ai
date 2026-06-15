package com.purajith.mindxserviceai.service;

import com.purajith.mindxserviceai.entity.Message;
import com.purajith.mindxserviceai.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message createMessage(Message message) {
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public List<Message> getMessagesByTicketId(Long ticketId) {
        return messageRepository.findByTicketId(ticketId);
    }

    public void saveMessage(Long ticketId, String sender, String text) {

        Message message = new Message();

        message.setTicketId(ticketId);
        message.setSender(sender);
        message.setMessage(text);
        message.setTimestamp(LocalDateTime.now());

        messageRepository.save(message);
    }
}