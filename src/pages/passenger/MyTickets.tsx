import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';

const mockTickets = [
  { id: '1', source: 'Home', destination: 'Office', date: '2023-10-25', price: 50, type: 'Bus (AC)' },
  { id: '2', source: 'Mall', destination: 'Home', date: '2023-10-24', price: 150, type: 'Cab' },
  { id: '3', source: 'Office', destination: 'Gym', date: '2023-10-23', price: 30, type: 'Bus (Non-AC)' },
];

const MyTickets: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Tickets</Typography>
      <Paper>
        <List>
          {mockTickets.map((ticket, index) => (
            <React.Fragment key={ticket.id}>
              <ListItem>
                <ListItemText
                  primary={`${ticket.source} to ${ticket.destination}`}
                  secondary={`${ticket.date} - ${ticket.type}`}
                />
                <Typography variant="body1">₹{ticket.price}</Typography>
              </ListItem>
              {index < mockTickets.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default MyTickets;
