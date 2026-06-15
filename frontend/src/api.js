import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

export function createTicket(payload) {
  return api.post('/tickets', payload);
}

export function getTickets() {
  return api.get('/tickets');
}

export function getTicketDetails(id) {
  return api.get(`/tickets/details/${id}`);
}

export function updateTicketStatus(id, status) {
  return api.put(`/tickets/${id}/status`, { status });
}

export default api;
