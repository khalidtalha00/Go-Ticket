import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Box, TextField } from '@mui/material';
import { Scanner } from '@yudiel/react-qr-scanner';

const ScanTicket: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = (detectedCodes: any[]) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const code = detectedCodes[0].rawValue;
      setScannedData(code);
      setIsScanning(false);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setScannedData(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Scan Passenger Ticket</Typography>
        
        <Box sx={{ height: 300, bgcolor: '#eee', my: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          {isScanning ? (
            <Scanner 
              onScan={handleScan} 
              onError={(error) => console.log(error)}
              styles={{ container: { width: '100%', height: '100%' } }}
            />
          ) : (
            <Typography color="textSecondary">Start Scanning</Typography>
          )}
        </Box>

        {!isScanning && (
          <Button variant="contained" color="primary" size="large" onClick={startScanning} sx={{ mb: 3 }}>
            Scan Ticket
          </Button>
        )}

        {isScanning && (
          <Button variant="outlined" color="secondary" size="large" onClick={() => setIsScanning(false)} sx={{ mb: 3 }}>
            Cancel Scan
          </Button>
        )}

        <Typography variant="body1" gutterBottom>OR Enter Ticket ID</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
                label="Ticket ID" 
                fullWidth 
                value={manualCode} 
                onChange={(e) => setManualCode(e.target.value)} 
            />
            <Button variant="outlined" onClick={() => setScannedData(manualCode)}>Verify</Button>
        </Box>

        {scannedData && (
          <Box sx={{ mt: 4, textAlign: 'left', bgcolor: '#f9f9f9', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" color="success.main" gutterBottom>Ticket Verified!</Typography>
            <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>{scannedData}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ScanTicket;
