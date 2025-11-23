import React, { useState } from 'react';
import { Container, Paper, Typography, Button, ToggleButton, ToggleButtonGroup, Box, TextField } from '@mui/material';
import { useAuth, type UserRole } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('passenger');

  const handleLogin = () => {
    if (role) {
      login(role);
      navigate(role === 'passenger' ? '/passenger/dashboard' : '/driver/dashboard');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login to GoTicket
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(_, newRole) => newRole && setRole(newRole)}
            aria-label="user role"
          >
            <ToggleButton value="passenger">Passenger</ToggleButton>
            <ToggleButton value="driver">Driver</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
