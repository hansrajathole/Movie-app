import express from 'express';
import { 
  getMovies, 
  getMovieById, 
  searchMovies, 
  getSortedMovies,
  addMovie, 
  updateMovie, 
  deleteMovie 
} from '../controllers/movie.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/admin.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getMovies);
router.get('/search', searchMovies);
router.get('/sorted', getSortedMovies);
router.get('/:id', getMovieById);

// Protected routes (admin only)
router.post('/', auth, adminOnly, addMovie);
router.put('/:id', auth, adminOnly, updateMovie);
router.delete('/:id', auth, adminOnly, deleteMovie);

export default router;