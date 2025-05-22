import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MovieList from '../components/movies/MovieList';
import { getMovies, getSortedMovies } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('rating');
  const { user } = useContext(AuthContext);
  
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        if (sortBy) {
          const data = await getSortedMovies(sortBy);
          setMovies(data);
          setTotalPages(Math.ceil(data.length / 12)); // Assuming 12 movies per page
        } else {
          const data = await getMovies(currentPage, 12);
          setMovies(data.movies);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Top Movies
        </Typography>
        {isAdmin && (
          <Button 
            component={RouterLink} 
            to="/admin/add-movie" 
            variant="contained" 
            startIcon={<AddIcon />}
          >
            Add Movie
          </Button>
        )}
      </Box>

      <MovieList 
        movies={movies}
        loading={loading}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        sortBy={sortBy}
      />
    </Box>
  );
};

export default HomePage;