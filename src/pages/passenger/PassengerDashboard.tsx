import React from 'react';
import { Container, Paper, Typography, Button, Box, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../../context/TicketContext';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

const PassengerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { tickets } = useTickets();

  // Get the last 3 tickets
  const recentTickets = tickets.slice(0, 3);

  const getTransportIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('bus')) return <DirectionsBusIcon color="primary" />;
    if (lowerType.includes('cab')) return <DirectionsCarIcon color="primary" />;
    if (lowerType.includes('bike')) return <TwoWheelerIcon color="primary" />;
    return <DirectionsCarIcon color="action" />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Passenger Dashboard</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Book a Ride</Typography>
            <Button variant="contained" onClick={() => navigate('/passenger/book')}>Book Now</Button>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>My Tickets</Typography>
            <Button variant="outlined" onClick={() => navigate('/passenger/tickets')}>View Tickets</Button>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Recent Activity</Typography>
          {recentTickets.length === 0 ? (
            <Typography variant="body2" color="textSecondary">No recent rides.</Typography>
          ) : (
            <List>
              {recentTickets.map((ticket, index) => (
                <React.Fragment key={ticket.id}>
                  <ListItem>
                    <ListItemIcon>
                      {getTransportIcon(ticket.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${ticket.source} to ${ticket.destination}`}
                      secondary={`${ticket.date} - ${ticket.type}`}
                    />
                    <Typography variant="body1">₹{ticket.price}</Typography>
                  </ListItem>
                  {index < recentTickets.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default PassengerDashboard;
