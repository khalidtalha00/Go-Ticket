import React, { useState, useMemo } from 'react';
import { Container, Paper, Typography, Avatar, Box, Divider, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useTickets } from '../../context/TicketContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { tickets } = useTickets();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  const filteredTickets = useMemo(() => {
    if (timeFilter === 'all') return tickets;

    const now = new Date();
    return tickets.filter(ticket => {
      const ticketDate = new Date(ticket.date);
      // Check if date is valid
      if (isNaN(ticketDate.getTime())) return false;

      const diffTime = Math.abs(now.getTime() - ticketDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (timeFilter === 'week') return diffDays <= 7;
      if (timeFilter === 'month') return diffDays <= 30;
      if (timeFilter === 'year') return diffDays <= 365;
      return true;
    });
  }, [tickets, timeFilter]);

  const totalRides = filteredTickets.length;
  const totalSpent = filteredTickets.reduce((sum, ticket) => sum + ticket.price, 0);
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
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Ride Statistics</Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="time-filter-label">Time Period</InputLabel>
            <Select
              labelId="time-filter-label"
              value={timeFilter}
              label="Time Period"
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="week">Last 7 Days</MenuItem>
              <MenuItem value="month">Last 30 Days</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>

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
