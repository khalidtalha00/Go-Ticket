import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Box, TextField } from '@mui/material';

const ScanTicket: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');

  const handleScan = () => {
    // Mock scan
    setScannedData(JSON.stringify({
      id: '123456789',
      source: 'Home',
      destination: 'Office',
      type: 'Bus (AC)',
      price: 50,
      date: new Date().toLocaleString(),
      status: 'Valid'
    }, null, 2));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Scan Passenger Ticket</Typography>
        
        <Box sx={{ height: 250, bgcolor: '#eee', my: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="textSecondary">Camera View Placeholder</Typography>
        </Box>

        <Button variant="contained" color="primary" size="large" onClick={handleScan} sx={{ mb: 3 }}>
          Simulate Scan
        </Button>

        <Typography variant="body1" gutterBottom>OR Enter Ticket ID</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
                label="Ticket ID" 
                fullWidth 
                value={manualCode} 
                onChange={(e) => setManualCode(e.target.value)} 
            />
            <Button variant="outlined" onClick={handleScan}>Verify</Button>
        </Box>

        {scannedData && (
          <Box sx={{ mt: 4, textAlign: 'left', bgcolor: '#f9f9f9', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" color="success.main" gutterBottom>Ticket Verified!</Typography>
            <pre style={{ overflowX: 'auto' }}>{scannedData}</pre>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ScanTicket;
