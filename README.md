# MindX Service AI

A full-stack Support Ticket Management System built with Spring Boot and React.

## Features

### Customer Side
- Create support tickets
- AI-generated responses
- Conversation history
- Automatic ticket creation

### Admin Side
- View all tickets
- View ticket details
- Update ticket status
- Track escalated tickets

### AI Features
- Rule-based AI response generation
- Automatic escalation for refund/complaint requests

## Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- H2 Database
- Maven

### Frontend
- React
- Vite
- Axios

## API Endpoints

### Create Ticket
POST /tickets

### Get All Tickets
GET /tickets

### Get Ticket Details
GET /tickets/details/{id}

### Update Ticket Status
PUT /tickets/{id}/status

### Ticket Statistics
GET /tickets/stats

## Run Backend

```bash
mvn spring-boot:run
```

Backend:
```
http://localhost:8081
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:
```
http://localhost:5173
```

## Screenshots

- Customer Chat Interface
- Admin Dashboard
- Ticket Details View

## Author

Purajith Suresh