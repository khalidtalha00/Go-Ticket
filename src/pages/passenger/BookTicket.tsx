import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, MenuItem, Box } from '@mui/material';
import QRCode from 'react-qr-code';

const transportTypes = [
  { value: 'bus_ac', label: 'Bus (AC)', pricePerKm: 5 },
  { value: 'bus_non_ac', label: 'Bus (Non-AC)', pricePerKm: 3 },
  { value: 'cab', label: 'Cab', pricePerKm: 15 },
  { value: 'bike', label: 'Bike Taxi', pricePerKm: 8 },
];

const BookTicket: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [transportType, setTransportType] = useState('bus_non_ac');
  const [ticket, setTicket] = useState<any>(null);

  const handleBook = () => {
    // Mock distance calculation
    const distance = Math.floor(Math.random() * 20) + 1; // 1-20 km
    const type = transportTypes.find(t => t.value === transportType);
    const price = distance * (type?.pricePerKm || 0);

    const newTicket = {
      id: Math.random().toString(36).substr(2, 9),
      source,
      destination,
      type: type?.label,
      price,
      date: new Date().toLocaleString(),
    };
    setTicket(newTicket);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Book Ticket</Typography>
            <TextField
              label="Source"
              fullWidth
              margin="normal"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <TextField
              label="Destination"
              fullWidth
              margin="normal"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <TextField
              select
              label="Transport Type"
              fullWidth
              margin="normal"
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
            >
              {transportTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                    Checking seat availability... <span style={{color: 'green'}}>Available</span>
                </Typography>
            </Box>

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleBook} disabled={!source || !destination}>
              Pay & Book
            </Button>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          {ticket ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Ticket Generated</Typography>
              <Box sx={{ my: 2 }}>
                <QRCode value={JSON.stringify(ticket)} size={150} />
              </Box>
              <Typography variant="h6">₹{ticket.price}</Typography>
              <Typography variant="body1">{ticket.source} to {ticket.destination}</Typography>
              <Typography variant="body2" color="textSecondary">{ticket.type}</Typography>
              <Typography variant="caption">{ticket.date}</Typography>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f0f0' }}>
               <Typography variant="body1" color="textSecondary">Map View (Real-time location)</Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BookTicket;
