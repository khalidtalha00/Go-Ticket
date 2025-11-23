import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { useTickets } from '../../context/TicketContext';

const MyTickets: React.FC = () => {
  const { tickets } = useTickets();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Tickets</Typography>
      <Paper>
        {tickets.length === 0 ? (
          <Typography sx={{ p: 3 }} color="textSecondary">No tickets found.</Typography>
        ) : (
          <List>
            {tickets.map((ticket, index) => (
              <React.Fragment key={ticket.id}>
                <ListItem>
                  <ListItemText
                    primary={`${ticket.source} to ${ticket.destination}`}
                    secondary={`${ticket.date} - ${ticket.type}`}
                  />
                  <Typography variant="body1">₹{ticket.price}</Typography>
                </ListItem>
                {index < tickets.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default MyTickets;
