import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Autocomplete,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../../context/TicketContext';
import { useAuth } from '../../context/AuthContext';
import { getPlaceSuggestions, type PlaceSuggestion } from '../../utils/places';

type LocationOption = PlaceSuggestion;

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addDriverRoute, driverRoutes } = useTickets();

  const [routeForm, setRouteForm] = useState({
    source: '',
    destination: '',
    transportType: 'Bus (Non-AC)',
  });

  const [sourceOptions, setSourceOptions] = useState<LocationOption[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<LocationOption[]>([]);
  const [sourcePicked, setSourcePicked] = useState(false);
  const [destinationPicked, setDestinationPicked] = useState(false);

  const fetchSuggestions = async (
    query: string,
    setter: React.Dispatch<React.SetStateAction<LocationOption[]>>
  ) => {
    if (!query || query.length < 3) {
      setter([]);
      return;
    }

    try {
      const items = await getPlaceSuggestions(query);
      setter(items);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setter([]);
    }
  };

  const driverId = String(user?._id || user?.email || 'unknown-driver');
  const myRoutes = driverRoutes.filter((r) => r.driverId === driverId);

  const onAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeForm.source.trim() || !routeForm.destination.trim()) return;

    addDriverRoute({
      driverId,
      source: routeForm.source.trim(),
      destination: routeForm.destination.trim(),
      transportType: routeForm.transportType,
    });

    setRouteForm((s) => ({ ...s, source: '', destination: '' }));
    setSourcePicked(false);
    setDestinationPicked(false);
    setSourceOptions([]);
    setDestinationOptions([]);
  };

  const canSaveRoute =
    sourcePicked &&
    destinationPicked &&
    routeForm.source.trim().length > 0 &&
    routeForm.destination.trim().length > 0;

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 }, px: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" gutterBottom>
        Driver Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: { xs: 2.5, md: 3 }, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Today&apos;s Earnings
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>₹1,250</Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: { xs: 2.5, md: 3 }, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Monthly Earnings
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>₹28,400</Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: { xs: 2.5, md: 3 }, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Total Rides
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>45</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper
            sx={{
              p: { xs: 2.5, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: { xs: 160, md: 200 },
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Verify Ticket
            </Typography>
            <Button variant="contained" size="large" onClick={() => navigate('/driver/scan')} fullWidth sx={{ maxWidth: 220 }}>
              Scan QR Code
            </Button>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: { xs: 2.5, md: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Recent Payments
            </Typography>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee', gap: 1 }}>
                <Typography>Ride #1234</Typography>
                <Typography color="green">+ ₹150</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
                <Typography>Ride #1235</Typography>
                <Typography color="green">+ ₹50</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography>Ride #1236</Typography>
                <Typography color="green">+ ₹200</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Paper sx={{ mt: 3, p: { xs: 2.5, md: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Add Running Route
        </Typography>

        <Box component="form" onSubmit={onAddRoute} sx={{ display: 'grid', gap: 2 }}>
          <Autocomplete
            freeSolo
            options={sourceOptions}
            inputValue={routeForm.source}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            onInputChange={(_, newInputValue, reason) => {
              setRouteForm((s) => ({ ...s, source: newInputValue }));
              fetchSuggestions(newInputValue, setSourceOptions);
              if (reason === 'input' || reason === 'clear') setSourcePicked(false);
            }}
            onChange={(_, newValue) => {
              if (newValue && typeof newValue !== 'string') {
                setRouteForm((s) => ({ ...s, source: newValue.description }));
                setSourcePicked(true);
              } else {
                setSourcePicked(false);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Source" fullWidth />}
          />

          <Autocomplete
            freeSolo
            options={destinationOptions}
            inputValue={routeForm.destination}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            onInputChange={(_, newInputValue, reason) => {
              setRouteForm((s) => ({ ...s, destination: newInputValue }));
              fetchSuggestions(newInputValue, setDestinationOptions);
              if (reason === 'input' || reason === 'clear') setDestinationPicked(false);
            }}
            onChange={(_, newValue) => {
              if (newValue && typeof newValue !== 'string') {
                setRouteForm((s) => ({ ...s, destination: newValue.description }));
                setDestinationPicked(true);
              } else {
                setDestinationPicked(false);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Destination" fullWidth />}
          />

          <TextField
            select
            label="Transport Type"
            value={routeForm.transportType}
            onChange={(e) => setRouteForm((s) => ({ ...s, transportType: e.target.value }))
            }
          >
            <MenuItem value="Bus (Non-AC)">Bus (Non-AC)</MenuItem>
            <MenuItem value="Bus (AC)">Bus (AC)</MenuItem>
            <MenuItem value="Cab">Cab</MenuItem>
            <MenuItem value="Bike Taxi">Bike Taxi</MenuItem>
          </TextField>

          {!canSaveRoute && (
            <Alert severity="info">
              Select both source and destination from map suggestions to save route.
            </Alert>
          )}

          <Button type="submit" variant="contained" disabled={!canSaveRoute}>
            Save Route
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            My Active Routes
          </Typography>
          {myRoutes.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No routes added yet.
            </Typography>
          ) : (
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              {myRoutes.map((r) => (
                <li key={r.id}>
                  <Typography variant="body2">
                    {r.source} → {r.destination} ({r.transportType})
                  </Typography>
                </li>
              ))}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
