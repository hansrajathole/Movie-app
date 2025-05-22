import Movie from '../models/movie.model.js';
import { addToQueue } from '../utils/queue.js';

// Get all movies with optional pagination
export const getMovies = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments();

    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    next(error);
  }
};

// Get movie by ID
export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

// Search movies by title or description
export const searchMovies = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const movies = await Movie.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    res.json(movies);
  } catch (error) {
    next(error);
  }
};

// Get sorted movies
export const getSortedMovies = async (req, res, next) => {
  try {
    const { sortBy } = req.query;
    let sortOption = {};

    switch (sortBy) {
      case 'title':
        sortOption = { title: 1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'releaseDate':
        sortOption = { releaseDate: -1 };
        break;
      case 'duration':
        sortOption = { duration: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const movies = await Movie.find().sort(sortOption);
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

// Add a new movie (admin only)
export const addMovie = async (req, res, next) => {
  try {
    // Add to queue for lazy insertion
    addToQueue('addMovie', req.body);
    
    res.status(202).json({ 
      message: 'Movie added to processing queue',
      movie: req.body
    });
  } catch (error) {
    next(error);
  }
};

// Process movie addition (called by queue worker)
export const processAddMovie = async (movieData) => {
  try {
    const movie = new Movie(movieData);
    await movie.save();
    console.log('Movie added successfully:', movie.title);
    return movie;
  } catch (error) {
    console.error('Error processing movie addition:', error);
    throw error;
  }
};

// Update movie (admin only)
export const updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

// Delete movie (admin only)
export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    next(error);
  }
};