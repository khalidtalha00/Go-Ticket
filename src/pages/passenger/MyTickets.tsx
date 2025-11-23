import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper, Divider, IconButton, Dialog, DialogContent, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QRCode from 'react-qr-code';
import { useTickets, type Ticket } from '../../context/TicketContext';

const MyTickets: React.FC = () => {
  const { tickets, removeTicket } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      await removeTicket(id);
    }
  };

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
                <ListItem
                  sx={{ pr: 12 }} // Add padding for secondary actions
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton aria-label="view-qr" onClick={() => setSelectedTicket(ticket)} sx={{ mr: 1 }}>
                        <QrCodeIcon color="primary" />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(ticket.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={`${ticket.source} to ${ticket.destination}`}
                    secondary={`${ticket.date} - ${ticket.type}`}
                  />
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ₹{ticket.price}
                  </Typography>
                </ListItem>
                {index < tickets.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      <Dialog open={!!selectedTicket} onClose={() => setSelectedTicket(null)}>
        <DialogContent>
          {selectedTicket && (
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h5" gutterBottom>Ticket QR Code</Typography>
              <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                <QRCode value={JSON.stringify(selectedTicket)} size={200} />
              </Box>
              <Typography variant="h6">₹{selectedTicket.price}</Typography>
              <Typography variant="body1">{selectedTicket.source} to {selectedTicket.destination}</Typography>
              <Typography variant="body2" color="textSecondary">{selectedTicket.type}</Typography>
              <Typography variant="caption">{selectedTicket.date}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default MyTickets;
