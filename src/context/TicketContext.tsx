import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Ticket {
  id: string;
  source: string;
  destination: string;
  type: string;
  price: number;
  date: string;
  userId?: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id'>) => Promise<Ticket | undefined>;
  removeTicket: (id: string) => Promise<void>;
  loading: boolean;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load tickets from backend when user changes
  useEffect(() => {
    const fetchTickets = async () => {
      if (user?._id) {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/api/tickets/${user._id}`);
          if (response.ok) {
            const data = await response.json();
            // Map _id to id for frontend compatibility
            const mappedTickets = data.map((t: any) => ({
              ...t,
              id: t._id
            }));
            setTickets(mappedTickets);
          }
        } catch (error) {
          console.error('Failed to fetch tickets', error);
        } finally {
          setLoading(false);
        }
      } else {
        setTickets([]);
      }
    };

    fetchTickets();
  }, [user]);

  const addTicket = async (ticketData: Omit<Ticket, 'id'>): Promise<Ticket | undefined> => {
    if (!user?._id) return;

    try {
      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...ticketData,
          userId: user._id
        }),
      });

      if (response.ok) {
        const newTicket = await response.json();
        const ticketWithId = { ...newTicket, id: newTicket._id };
        setTickets((prev) => [ticketWithId, ...prev]);
        return ticketWithId;
      }
    } catch (error) {
      console.error('Failed to add ticket', error);
      throw error;
    }
  };

  const removeTicket = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tickets/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      }
    } catch (error) {
      console.error('Failed to remove ticket', error);
      throw error;
    }
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, removeTicket, loading }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
