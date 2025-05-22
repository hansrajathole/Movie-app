import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from '../../context/AuthContext';
import { deleteMovie } from '../../services/api';

const MovieDetail = ({ movie }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const isAdmin = user?.role === 'admin';

  const handleEdit = () => {
    navigate(`/admin/edit-movie/${movie._id}`);
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMovie(movie._id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            sx={{
              width: '100%',
              borderRadius: 1,
              boxShadow: 3,
            }}
            src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={movie.title}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {movie.title}
            </Typography>
            {isAdmin && (
              <Box>
                <Button 
                  startIcon={<EditIcon />} 
                  variant="outlined" 
                  onClick={handleEdit}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button 
                  startIcon={<DeleteIcon />} 
                  variant="outlined" 
                  color="error"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={movie.rating / 2} precision={0.5} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {movie.rating.toFixed(1)}/10
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {movie.genre.map((genre, index) => (
              <Chip key={index} label={genre} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                {movie.duration} minutes
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                {movie.director}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {movie.cast.map((actor, index) => (
              <Chip key={index} label={actor} variant="outlined" />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Movie"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{movie.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default MovieDetail;