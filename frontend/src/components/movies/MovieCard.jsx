import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AuthContext } from '../../context/AuthContext';

const MovieCard = ({ movie }) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  console.log('MovieCard', movie);
  // Format release date
  const releaseDate = new Date(movie.releaseDate).toLocaleDateString();

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={movie.rating / 2} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {movie.rating.toFixed(1)}/10
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {movie.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
          {movie.genre.slice(0, 2).map((genre, index) => (
            <Chip key={index} label={genre} size="small" />
          ))}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {new Date(movie.releaseDate).getFullYear()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {movie.duration} min
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" component={RouterLink} to={`/movies/${movie._id}`}>
          View Details
        </Button>
        {isAdmin && (
          <Button size="small" component={RouterLink} to={`/admin/edit-movie/${movie._id}`} color="secondary">
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;