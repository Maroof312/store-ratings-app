import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';

function Dashboard({ user }) {
  const [userData, setUserData] = useState(null);
  const [storeStats, setStoreStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Get basic user data
        const userResponse = await axios.get('/api/users/me');
        setUserData(userResponse.data);

        // Get additional data based on role
        if (user.role === 'store_owner') {
          const statsResponse = await axios.get(`/api/stores/owner/${user.id}/stats`);
          setStoreStats(statsResponse.data);
        } else if (user.role === 'admin') {
          const statsResponse = await axios.get('/api/admin/stats');
          setStoreStats(statsResponse.data);
        }

      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome, {userData?.name}
      </Typography>
      
      {user.role === 'admin' && storeStats && (
        <Box display="flex" flexWrap="wrap" gap={3} mt={4}>
          <Card sx={{ minWidth: 275, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h3" component="p">
                {storeStats.totalUsers}
              </Typography>
            </CardContent>
          </Card>
          {/* Add other admin stats cards */}
        </Box>
      )}

      {user.role === 'store_owner' && storeStats && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom>
              Your Store Statistics
            </Typography>
            <Typography variant="body1" paragraph>
              Average Rating: {storeStats.averageRating?.toFixed(1) || 'N/A'}
            </Typography>
            <Typography variant="body1">
              Total Ratings: {storeStats.totalRatings || 0}
            </Typography>
          </CardContent>
        </Card>
      )}

      {user.role === 'user' && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom>
              Your Account
            </Typography>
            <Typography variant="body1" paragraph>
              Email: {userData?.email}
            </Typography>
            <Typography variant="body1">
              Address: {userData?.address}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default Dashboard;