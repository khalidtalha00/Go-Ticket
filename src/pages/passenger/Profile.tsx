import React, { useState } from 'react';
import { Container, Paper, Typography, Avatar, Box, Divider, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useTickets } from '../../context/TicketContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { tickets } = useTickets();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const totalRides = tickets.length;
  const totalSpent = tickets.reduce((sum, ticket) => sum + ticket.price, 0);
  // Mock distance calculation based on price (assuming avg 10rs/km for simplicity in this view)
  const totalDistance = Math.floor(totalSpent / 10); 

  const handleSave = () => {
    if (imageUrl) {
      updateUser({ profilePicture: imageUrl });
    }
    setOpen(false);
    setImageUrl('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            sx={{ width: 80, height: 80, mr: 3, cursor: 'pointer' }} 
            src={user?.profilePicture}
            onClick={() => setOpen(true)}
          >
            {user?.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4">{user?.name}</Typography>
            <Typography variant="body1" color="textSecondary">{user?.email}</Typography>
            <Typography variant="caption" sx={{ textTransform: 'uppercase', bgcolor: '#eee', px: 1, borderRadius: 1 }}>
              {user?.role}
            </Typography>
            <Button size="small" sx={{ display: 'block', mt: 1 }} onClick={() => setOpen(true)}>
              Edit Picture
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="h6" gutterBottom>Ride Statistics</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="primary">{totalRides}</Typography>
            <Typography variant="body2">Total Rides</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="primary">{totalDistance} km</Typography>
            <Typography variant="body2">Est. Distance Traveled</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="primary">₹{totalSpent}</Typography>
            <Typography variant="body2">Total Spent</Typography>
          </Box>
        </Box>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            helperText="Enter a direct link to an image (e.g., https://example.com/avatar.jpg)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
