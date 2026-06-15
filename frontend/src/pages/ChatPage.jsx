import { useState } from 'react';
import { createTicket, getTicketDetails } from '../api.js';

const DEFAULT_USER_ID = 1;

function ChatPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError('Please enter a customer query.');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      const created = await createTicket({
        userId: DEFAULT_USER_ID,
        query: trimmedQuery,
      });
      const details = await getTicketDetails(created.data.id);

      setTicket(details.data.ticket);
      setMessages(details.data.messages || []);
      setQuery('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send the query.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="page-grid chat-grid">
      <div className="panel intro-panel">
        <p className="eyebrow">Customer chat</p>
        <h2>Ask for support</h2>
        <p className="muted">
          Submit a customer query and the service will create a ticket, save the conversation, and return the AI reply.
        </p>
      </div>

      <div className="panel chat-panel">
        <div className="messages" aria-live="polite">
          {messages.length === 0 ? (
            <div className="empty-state">No messages yet.</div>
          ) : (
            messages.map((message) => (
              <article
                className={`message-bubble ${message.sender === 'USER' ? 'user-message' : 'ai-message'}`}
                key={message.id}
              >
                <span>{message.sender === 'USER' ? 'Customer' : 'AI Assistant'}</span>
                <p>{message.message}</p>
              </article>
            ))
          )}
        </div>

        {ticket && (
          <div className="ticket-summary">
            <span>Ticket #{ticket.id}</span>
            <strong>{ticket.status}</strong>
          </div>
        )}

        <form className="composer" onSubmit={handleSubmit}>
          <input
            aria-label="Customer query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type the customer query"
          />
          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </div>
    </section>
  );
}

export default ChatPage;
