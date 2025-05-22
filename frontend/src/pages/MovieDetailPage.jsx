import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import MovieDetail from '../components/movies/MovieDetail';
import { getMovieById } from '../services/api';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Movie not found or an error occurred');
        // Navigate to 404 after a delay
        setTimeout(() => navigate('/404'), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!movie) {
    return null;
  }

  return <MovieDetail movie={movie} />;
};

export default MovieDetailPage;