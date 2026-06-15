import { useEffect, useMemo, useState } from 'react';
import { getTicketDetails, getTickets, updateTicketStatus } from '../api.js';

const STATUSES = ['OPEN', 'RESOLVED', 'NEEDS_HUMAN'];

function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const selectedTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === selectedTicketId),
    [tickets, selectedTicketId],
  );

  async function loadTickets() {
    setIsLoading(true);
    setError('');

    try {
      const response = await getTickets();
      const nextTickets = response.data || [];
      setTickets(nextTickets);

      if (nextTickets.length > 0) {
        const nextId = selectedTicketId || nextTickets[0].id;
        setSelectedTicketId(nextId);
        await loadTicketDetails(nextId);
      } else {
        setSelectedTicketId(null);
        setTicketDetails(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load tickets.');
    } finally {
      setIsLoading(false);
    }
  }

  async function loadTicketDetails(id) {
    const response = await getTicketDetails(id);
    setTicketDetails(response.data);
  }

  async function handleSelectTicket(id) {
    setSelectedTicketId(id);
    setError('');

    try {
      await loadTicketDetails(id);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load ticket details.');
    }
  }

  async function handleStatusChange(event) {
    if (!selectedTicketId) {
      return;
    }

    const nextStatus = event.target.value;
    setIsUpdating(true);
    setError('');

    try {
      const response = await updateTicketStatus(selectedTicketId, nextStatus);
      const updatedTicket = response.data;

      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket,
        ),
      );
      setTicketDetails((currentDetails) =>
        currentDetails
          ? {
              ...currentDetails,
              ticket: updatedTicket,
            }
          : currentDetails,
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update status.');
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="admin-layout">
      <div className="panel ticket-list-panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Admin dashboard</p>
            <h2>Tickets</h2>
          </div>
          <button className="secondary-button" type="button" onClick={loadTickets}>
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="empty-state">Loading tickets...</div>
        ) : tickets.length === 0 ? (
          <div className="empty-state">No tickets found.</div>
        ) : (
          <div className="ticket-list">
            {tickets.map((ticket) => (
              <button
                className={`ticket-row ${selectedTicketId === ticket.id ? 'active' : ''}`}
                key={ticket.id}
                type="button"
                onClick={() => handleSelectTicket(ticket.id)}
              >
                <span>#{ticket.id}</span>
                <strong>{ticket.status}</strong>
                <p>{ticket.query}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="panel detail-panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Ticket details</p>
            <h2>{selectedTicket ? `Ticket #${selectedTicket.id}` : 'Select a ticket'}</h2>
          </div>

          {ticketDetails && (
            <select
              aria-label="Update ticket status"
              value={ticketDetails.ticket.status}
              onChange={handleStatusChange}
              disabled={isUpdating}
            >
              {STATUSES.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        {!ticketDetails ? (
          <div className="empty-state">Ticket details will appear here.</div>
        ) : (
          <>
            <div className="detail-meta">
              <span>User ID: {ticketDetails.ticket.userId}</span>
              <span>Status: {ticketDetails.ticket.status}</span>
            </div>

            <div className="query-block">
              <span>Customer query</span>
              <p>{ticketDetails.ticket.query}</p>
            </div>

            <div className="conversation-list">
              {(ticketDetails.messages || []).map((message) => (
                <article className="conversation-item" key={message.id}>
                  <strong>{message.sender === 'USER' ? 'Customer' : 'AI Assistant'}</strong>
                  <p>{message.message}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
