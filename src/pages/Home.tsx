import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to GoTicket
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        The smartest way to travel. QR code-based ticketing for public transport.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }} onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="outlined" color="primary" size="large" onClick={() => navigate('/register')}>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
