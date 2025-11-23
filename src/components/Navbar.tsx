import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeMode } from '../context/ThemeContext';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useThemeMode();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ backdropFilter: 'blur(8px)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <DirectionsBusIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'Poppins',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'primary.main',
              textDecoration: 'none',
              flexGrow: 1,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            GoTicket
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {!user ? (
              <>
                <Button color="primary" onClick={() => navigate('/login')}>Login</Button>
                <Button variant="contained" color="primary" onClick={() => navigate('/register')}>Register</Button>
              </>
            ) : (
              <>
                {user.role === 'passenger' && (
                  <>
                    <Button color="primary" onClick={() => navigate('/passenger/dashboard')}>Dashboard</Button>
                    <Button color="primary" onClick={() => navigate('/passenger/book')}>Book</Button>
                    <Button color="primary" onClick={() => navigate('/passenger/tickets')}>My Tickets</Button>
                    <Button color="primary" onClick={() => navigate('/passenger/profile')}>Profile</Button>
                  </>
                )}
                {user.role === 'driver' && (
                  <>
                    <Button color="primary" onClick={() => navigate('/driver/dashboard')}>Dashboard</Button>
                    <Button color="primary" onClick={() => navigate('/driver/scan')}>Scan Ticket</Button>
                  </>
                )}
                <Button color="error" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
