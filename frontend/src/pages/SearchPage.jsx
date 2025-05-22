import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from '../components/movies/MovieCard';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { searchMovies } from '../services/api';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setSearchParams({ query: searchQuery });
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Failed to search movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Movies
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="Search by title or description"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<SearchIcon />}
              sx={{ height: '100%' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : searched ? (
        <>
          {initialQuery && (
            <Typography variant="h6" gutterBottom>
              Search results for: "{initialQuery}"
            </Typography>
          )}
          
          {movies.length === 0 ? (
            <Alert severity="info">
              No movies found matching your search criteria.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <Alert severity="info">
          Enter a search term to find movies.
        </Alert>
      )}
    </Box>
  );
};

export default SearchPage;