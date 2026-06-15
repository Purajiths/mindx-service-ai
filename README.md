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
- <img width="1905" height="962" alt="image" src="https://github.com/user-attachments/assets/885d1b45-346d-4e50-b3a3-3880dfc94f00" />

- Admin Dashboard
- <img width="1918" height="900" alt="image" src="https://github.com/user-attachments/assets/f1bd719d-b530-4fdf-b970-beb9c4bf42f3" />

- Ticket Details View
- <img width="1918" height="897" alt="image" src="https://github.com/user-attachments/assets/70692276-a3b7-4017-87e3-8e0cfb08f3f0" />


## Author

Purajith Suresh
