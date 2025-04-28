import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar } from "@mui/material";

const Register = ({ register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await register(name, email, password, address);
    if (!success) setError(message);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            sx={{
              mb: 2,
              maxWidth: 300,
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            sx={{
              mb: 2,
              maxWidth: 300,
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            sx={{
              mb: 2,
              maxWidth: 300,
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            sx={{
              mb: 2,
              maxWidth: 300,
            }}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2,
              alignItems: 'center',
              width: '30%',
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
              padding: '12px' }}>
            Register
          </Button>
        </form>
      </Box>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError("")}
          message={error}
        />
      )}
    </Box>
  );
};

export default Register;
