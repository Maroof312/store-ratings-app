import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar } from '@mui/material';

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await login(email, password);
    if (!success) setError(message);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      p: 3
    }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        Login
      </Typography>
      
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              maxWidth: 350,
            }}
            inputProps={{
              style: { padding: '10px 14px' }
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              maxWidth: 350,
            }}
            inputProps={{
              style: { padding: '10px 14px' }
            }}
          />
          
          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 2,
              alignItems: 'center',
              width: '30%',
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
              padding: '12px'
            }}
          >
            Login
          </Button>
        </form>
        
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError('')}
            message={error}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Login;
