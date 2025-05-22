import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import UpdateIcon from '@mui/icons-material/Update';
import CircularProgress from '@mui/material/CircularProgress';
import { getMovies, getUsers } from '../../services/api';

const AdminDashboardPage = () => {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [moviesData, usersData] = await Promise.all([
          getMovies(),
          getUsers()
        ]);
        
        setMovies(moviesData.movies || []);
        setUsers(usersData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" sx={{ textAlign: 'center', py: 4 }}>
        {error}
      </Typography>
    );
  }

  // Calculate average rating
  const averageRating = movies.length > 0
    ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)
    : 'N/A';

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
        <Button 
          component={RouterLink} 
          to="/admin/add-movie" 
          variant="contained" 
          startIcon={<AddIcon />}
        >
          Add New Movie
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                Total Movies
              </Typography>
              <MovieIcon color="primary" />
            </Box>
            <Typography component="p" variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {movies.length}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {movies.length > 0 ? `+${Math.floor(Math.random() * 10)}% from last month` : 'No movies yet'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                Registered Users
              </Typography>
              <PeopleIcon color="primary" />
            </Box>
            <Typography component="p" variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {users.length}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {users.length > 0 ? `+${Math.floor(Math.random() * 15)}% from last month` : 'No users yet'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                Average Rating
              </Typography>
              <StarIcon color="primary" />
            </Box>
            <Typography component="p" variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {averageRating}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {movies.length > 0 ? 'Based on all movies' : 'No data available'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                Latest Update
              </Typography>
              <UpdateIcon color="primary" />
            </Box>
            <Typography component="p" variant="h4" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {new Date().toLocaleDateString()}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {new Date().toLocaleTimeString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Movies Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Recent Movies
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.slice(0, 5).map((movie) => (
              <TableRow key={movie._id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.rating.toFixed(1)}</TableCell>
                <TableCell>{new Date(movie.releaseDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to={`/movies/${movie._id}`}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    component={RouterLink}
                    to={`/admin/edit-movie/${movie._id}`}
                    size="small"
                    color="secondary"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {movies.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No movies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Users Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role} 
                    color={user.role === 'admin' ? 'primary' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboardPage;