import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper, useTheme } from '@mui/material';
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
import image6 from '../assets/image6.webp';
import image7 from '../assets/image7.jpg';

const galleryImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7
];

const features = [
  { icon: <QrCodeScannerIcon />, title: "Instant QR Ticketing", desc: "Book and travel instantly with secure QR codes." },
  { icon: <MapIcon />, title: "Real-time Tracking", desc: "Know exactly where you are and when you'll arrive." },
  { icon: <DirectionsBusIcon />, title: "Multiple Transport Modes", desc: "Bus, Cab, or Bike - choose your preferred ride." },
  { icon: <SecurityIcon />, title: "Secure Payments", desc: "Fast and safe transactions for every journey." },
  { icon: <EmojiNatureIcon />, title: "Eco-Friendly", desc: "Reduce your carbon footprint with shared transport." },
  { icon: <SupportAgentIcon />, title: "24/7 Support", desc: "We are here to help you anytime, anywhere." },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();

  const handleDashboardClick = () => {
    if (user?.role === 'passenger') {
      navigate('/passenger/dashboard');
    } else if (user?.role === 'driver') {
      navigate('/driver/dashboard');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        background: theme.palette.mode === 'light' 
          ? 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)'
          : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        pt: 12,
        pb: 12,
        borderRadius: { xs: 0, md: '0 0 50px 50px' },
        mb: 8
      }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom sx={{ 
            fontWeight: 800, 
            background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3
          }}>
            Welcome to GoTicket
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 5, lineHeight: 1.8 }}>
            The smartest way to travel. Experience seamless public transport with our advanced QR code-based ticketing system.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {!user ? (
              <>
                <Button variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }} onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="outlined" color="primary" size="large" sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderWidth: 2, '&:hover': { borderWidth: 2 } }} onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }} onClick={handleDashboardClick}>
                Go to Dashboard
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {/* Features Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>Why Choose GoTicket?</Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper elevation={0} sx={{ 
                  p: 4, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease', 
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[4],
                    borderColor: 'primary.main'
                  } 
                }}>
                  <Box sx={{ 
                    mb: 3, 
                    p: 2, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.light', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80
                  }}>
                    {React.cloneElement(feature.icon as React.ReactElement, { sx: { fontSize: 40, color: 'white' } } as any)}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{feature.title}</Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.7 }}>{feature.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Gallery Section */}
        <Box sx={{ 
          overflow: 'hidden', 
          width: '100%', 
          py: 8, 
          bgcolor: 'background.paper', 
          borderRadius: 8, 
          boxShadow: theme.shadows[2] 
        }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>Glimpse of the Journey</Typography>
          <Box sx={{ 
              display: 'flex', 
              width: 'max-content',
              animation: 'scroll 40s linear infinite',
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
                    width: 320, 
                    height: 220, 
                    objectFit: 'cover', 
                    borderRadius: 4, 
                    mx: 2,
                    boxShadow: theme.shadows[3],
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }} 
                />
              ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
