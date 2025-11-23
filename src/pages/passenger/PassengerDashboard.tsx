import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PassengerDashboard: React.FC = () => {
  const navigate = useNavigate();

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
          <Typography variant="h6">Recent Activity</Typography>
          <Typography variant="body2" color="textSecondary">No recent rides.</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default PassengerDashboard;
