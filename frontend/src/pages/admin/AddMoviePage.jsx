import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import { addMovie } from '../../services/api';

const AddMoviePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    poster: '',
    rating: '',
    duration: '',
    releaseDate: '',
    director: '',
    cast: [],
    genre: []
  });
  const [castInput, setCastInput] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleAddCast = () => {
    if (castInput.trim() && !formData.cast.includes(castInput.trim())) {
      setFormData({
        ...formData,
        cast: [...formData.cast, castInput.trim()]
      });
      setCastInput('');
    }
  };

  const handleDeleteCast = (castMember) => {
    setFormData({
      ...formData,
      cast: formData.cast.filter(c => c !== castMember)
    });
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !formData.genre.includes(genreInput.trim())) {
      setFormData({
        ...formData,
        genre: [...formData.genre, genreInput.trim()]
      });
      setGenreInput('');
    }
  };

  const handleDeleteGenre = (genre) => {
    setFormData({
      ...formData,
      genre: formData.genre.filter(g => g !== genre)
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.rating) errors.rating = 'Rating is required';
    else if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
      errors.rating = 'Rating must be a number between 0 and 10';
    }
    if (!formData.duration) errors.duration = 'Duration is required';
    else if (isNaN(formData.duration) || formData.duration <= 0) {
      errors.duration = 'Duration must be a positive number';
    }
    if (!formData.releaseDate) errors.releaseDate = 'Release date is required';
    if (!formData.director.trim()) errors.director = 'Director is required';
    if (formData.cast.length === 0) errors.cast = 'At least one cast member is required';
    if (formData.genre.length === 0) errors.genre = 'At least one genre is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Convert string values to numbers
      const movieData = {
        ...formData,
        rating: parseFloat(formData.rating),
        duration: parseInt(formData.duration, 10)
      };
      
      await addMovie(movieData);
      navigate('/');
    } catch (error) {
      console.error('Error adding movie:', error);
      setSubmitError(error.response?.data?.message || 'Failed to add movie. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Movie
      </Typography>
      
      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Poster URL"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                placeholder="https://example.com/poster.jpg"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Rating (0-10)"
                name="rating"
                type="number"
                inputProps={{ min: 0, max: 10, step: 0.1 }}
                value={formData.rating}
                onChange={handleChange}
                error={!!formErrors.rating}
                helperText={formErrors.rating}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                name="duration"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.duration}
                onChange={handleChange}
                error={!!formErrors.duration}
                helperText={formErrors.duration}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Release Date"
                name="releaseDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.releaseDate}
                onChange={handleChange}
                error={!!formErrors.releaseDate}
                helperText={formErrors.releaseDate}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                error={!!formErrors.director}
                helperText={formErrors.director}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                error={!!formErrors.description}
                helperText={formErrors.description}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Cast
                </Typography>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Cast Member"
                    value={castInput}
                    onChange={(e) => setCastInput(e.target.value)}
                    error={!!formErrors.cast}
                    helperText={formErrors.cast}
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleAddCast} 
                    sx={{ ml: 1 }}
                    disabled={!castInput.trim()}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.cast.map((castMember, index) => (
                    <Chip
                      key={index}
                      label={castMember}
                      onDelete={() => handleDeleteCast(castMember)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Genre
                </Typography>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Genre"
                    value={genreInput}
                    onChange={(e) => setGenreInput(e.target.value)}
                    error={!!formErrors.genre}
                    helperText={formErrors.genre}
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleAddGenre} 
                    sx={{ ml: 1 }}
                    disabled={!genreInput.trim()}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.genre.map((genre, index) => (
                    <Chip
                      key={index}
                      label={genre}
                      onDelete={() => handleDeleteGenre(genre)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Movie'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddMoviePage;