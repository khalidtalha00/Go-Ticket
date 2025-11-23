import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MapIcon from '@mui/icons-material/Map';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.jpg';

const galleryImages = [
  image1,
  image2,
  image3,
  image4,
  image5
];

const features = [
  { icon: <QrCodeScannerIcon fontSize="large" color="primary" />, title: "Instant QR Ticketing", desc: "Book and travel instantly with secure QR codes." },
  { icon: <MapIcon fontSize="large" color="primary" />, title: "Real-time Tracking", desc: "Know exactly where you are and when you'll arrive." },
  { icon: <DirectionsBusIcon fontSize="large" color="primary" />, title: "Multiple Transport Modes", desc: "Bus, Cab, or Bike - choose your preferred ride." },
  { icon: <SecurityIcon fontSize="large" color="primary" />, title: "Secure Payments", desc: "Fast and safe transactions for every journey." },
  { icon: <EmojiNatureIcon fontSize="large" color="primary" />, title: "Eco-Friendly", desc: "Reduce your carbon footprint with shared transport." },
  { icon: <SupportAgentIcon fontSize="large" color="primary" />, title: "24/7 Support", desc: "We are here to help you anytime, anywhere." },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDashboardClick = () => {
    if (user?.role === 'passenger') {
      navigate('/passenger/dashboard');
    } else if (user?.role === 'driver') {
      navigate('/driver/dashboard');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center', pb: 8 }}>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to GoTicket
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          The smartest way to travel. Experience seamless public transport with our advanced QR code-based ticketing system.
        </Typography>
        <Box sx={{ mt: 4 }}>
          {!user ? (
            <>
              <Button variant="contained" color="primary" size="large" sx={{ mr: 2, px: 4, py: 1.5 }} onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="outlined" color="primary" size="large" sx={{ px: 4, py: 1.5 }} onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" size="large" sx={{ px: 4, py: 1.5 }} onClick={handleDashboardClick}>
              Go to Dashboard
            </Button>
          )}
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>Why Choose GoTicket?</Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                <Typography variant="body2" color="textSecondary">{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Gallery Section */}
      <Box sx={{ overflow: 'hidden', width: '100%', py: 6, bgcolor: '#f8f9fa', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>Glimpse of the Journey</Typography>
        <Box sx={{ 
            display: 'flex', 
            width: 'max-content',
            animation: 'scroll 30s linear infinite',
            '@keyframes scroll': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' }
            },
            '&:hover': { animationPlayState: 'paused' }
        }}>
            {/* Duplicate images to create seamless loop */}
            {[...galleryImages, ...galleryImages].map((src, index) => (
              <Box 
                key={index} 
                component="img" 
                src={src} 
                alt={`Gallery ${index}`}
                sx={{ 
                  width: 300, 
                  height: 200, 
                  objectFit: 'cover', 
                  borderRadius: 3, 
                  mx: 2,
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }} 
              />
            ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
