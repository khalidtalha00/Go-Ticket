import React from 'react';
import { Container, Paper, Typography, Avatar, Box, Divider } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3 }}>{user?.name.charAt(0)}</Avatar>
          <Box>
            <Typography variant="h4">{user?.name}</Typography>
            <Typography variant="body1" color="textSecondary">{user?.email}</Typography>
            <Typography variant="caption" sx={{ textTransform: 'uppercase', bgcolor: '#eee', px: 1, borderRadius: 1 }}>
              {user?.role}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="h6" gutterBottom>Ride Statistics</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="primary">12</Typography>
            <Typography variant="body2">Total Rides</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="primary">154 km</Typography>
            <Typography variant="body2">Distance Traveled</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="primary">₹850</Typography>
            <Typography variant="body2">Total Spent</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
