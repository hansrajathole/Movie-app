import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  releaseDate: {
    type: Date,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  cast: [{
    type: String,
    required: true
  }],
  genre: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

// Add text index for search functionality
movieSchema.index({ title: 'text', description: 'text' });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;