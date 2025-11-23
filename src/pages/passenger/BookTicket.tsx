import React, { useState, useCallback } from 'react';
import { Container, Paper, Typography, TextField, Button, MenuItem, Box, Autocomplete, InputAdornment, IconButton } from '@mui/material';
import QRCode from 'react-qr-code';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useTickets } from '../../context/TicketContext';
import { useAuth } from '../../context/AuthContext';
import Map from '../../components/Map';

const transportTypes = [
  { value: 'bus_ac', label: 'Bus (AC)', pricePerKm: 5 },
  { value: 'bus_non_ac', label: 'Bus (Non-AC)', pricePerKm: 3 },
  { value: 'cab', label: 'Cab', pricePerKm: 15 },
  { value: 'bike', label: 'Bike Taxi', pricePerKm: 8 },
];

const BookTicket: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [transportType, setTransportType] = useState('bus_non_ac');
  const [ticket, setTicket] = useState<any>(null);
  const { addTicket } = useTickets();
  const { user } = useAuth();
  
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sourceOptions, setSourceOptions] = useState<any[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<any[]>([]);

  const fetchSuggestions = async (query: string, setOptions: (options: any[]) => void) => {
    if (!query || query.length < 3) return;
    
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;
    
    if (userLocation) {
      // Bias search to user location (approx ~50km box)
      const viewbox = `${userLocation.lng - 0.5},${userLocation.lat + 0.5},${userLocation.lng + 0.5},${userLocation.lat - 0.5}`;
      url += `&viewbox=${viewbox}&bounded=0`; // bounded=0 means prefer but don't restrict
    }
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleBook = async () => {
    // Mock distance calculation
    const distance = Math.floor(Math.random() * 20) + 1; // 1-20 km
    const type = transportTypes.find(t => t.value === transportType);
    const price = distance * (type?.pricePerKm || 0);

    const newTicketData = {
      source,
      destination,
      type: type?.label || 'Unknown',
      price,
      date: new Date().toLocaleString(),
    };

    try {
      const createdTicket = await addTicket(newTicketData);
      if (createdTicket) {
        setTicket(createdTicket);
      }
    } catch (error) {
      console.error("Failed to book ticket", error);
      alert("Failed to book ticket. Please try again.");
    }
  };

  const handleLocationFound = useCallback((lat: number, lng: number) => {
    setUserLocation({ lat, lng });
  }, []);

  const handleUseCurrentLocation = async () => {
    if (!userLocation) {
      alert("Waiting for location... Please ensure location services are enabled.");
      return;
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.lat}&lon=${userLocation.lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        setSource(data.display_name);
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Book Ticket</Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 3, color: 'primary.main', fontWeight: 500 }}>
              Hello {user?.name}, where would you like to go today?
            </Typography>
            
            <Autocomplete
              freeSolo
              options={sourceOptions}
              inputValue={source}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.display_name}
              onInputChange={(_, newInputValue) => {
                setSource(newInputValue);
                fetchSuggestions(newInputValue, setSourceOptions);
              }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Source" 
                  fullWidth 
                  margin="normal"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {params.InputProps.endAdornment}
                        <InputAdornment position="end">
                          <IconButton onClick={handleUseCurrentLocation} title="Use Current Location" edge="end">
                            <MyLocationIcon color={userLocation ? "primary" : "disabled"} />
                          </IconButton>
                        </InputAdornment>
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />

            <Autocomplete
              freeSolo
              options={destinationOptions}
              inputValue={destination}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.display_name}
              onInputChange={(_, newInputValue) => {
                setDestination(newInputValue);
                fetchSuggestions(newInputValue, setDestinationOptions);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Destination" fullWidth margin="normal" />
              )}
            />

            <TextField
              select
              label="Transport Type"
              fullWidth
              margin="normal"
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
            >
              {transportTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                    Checking seat availability... <span style={{color: 'green'}}>Available</span>
                </Typography>
            </Box>

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleBook} disabled={!source || !destination}>
              Pay & Book
            </Button>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          {ticket ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Ticket Generated</Typography>
              <Box sx={{ my: 2 }}>
                <QRCode value={JSON.stringify(ticket)} size={150} />
              </Box>
              <Typography variant="h6">₹{ticket.price}</Typography>
              <Typography variant="body1">{ticket.source} to {ticket.destination}</Typography>
              <Typography variant="body2" color="textSecondary">{ticket.type}</Typography>
              <Typography variant="caption">{ticket.date}</Typography>
            </Paper>
          ) : (
            <Paper sx={{ height: '100%', minHeight: 400, overflow: 'hidden' }}>
               <Map onLocationFound={handleLocationFound} />
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BookTicket;
