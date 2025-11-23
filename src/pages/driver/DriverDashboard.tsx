import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DriverDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Driver Dashboard</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Today's Earnings</Typography>
            <Typography variant="h3">₹1,250</Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Monthly Earnings</Typography>
            <Typography variant="h3">₹28,400</Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Total Rides</Typography>
            <Typography variant="h3">45</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 200, justifyContent: 'center' }}>
            <Typography variant="h6" gutterBottom>Verify Ticket</Typography>
            <Button variant="contained" size="large" onClick={() => navigate('/driver/scan')}>Scan QR Code</Button>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Payments</Typography>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
                    <Typography>Ride #1234</Typography>
                    <Typography color="green">+ ₹150</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
                    <Typography>Ride #1235</Typography>
                    <Typography color="green">+ ₹50</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>Ride #1236</Typography>
                    <Typography color="green">+ ₹200</Typography>
                </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default DriverDashboard;
