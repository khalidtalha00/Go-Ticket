import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          GoTicket
        </Typography>
        <Box>
          {!user ? (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          ) : (
            <>
              {user.role === 'passenger' && (
                <>
                  <Button color="inherit" onClick={() => navigate('/passenger/dashboard')}>Dashboard</Button>
                  <Button color="inherit" onClick={() => navigate('/passenger/book')}>Book</Button>
                  <Button color="inherit" onClick={() => navigate('/passenger/tickets')}>My Tickets</Button>
                  <Button color="inherit" onClick={() => navigate('/passenger/profile')}>Profile</Button>
                </>
              )}
              {user.role === 'driver' && (
                <>
                  <Button color="inherit" onClick={() => navigate('/driver/dashboard')}>Dashboard</Button>
                  <Button color="inherit" onClick={() => navigate('/driver/scan')}>Scan Ticket</Button>
                </>
              )}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
