import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Set auth token for all requests
api.setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};

// Movie API calls
export const getMovies = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/movies?page=${page}&limit=${limit}`);
    console.log('Movies:', res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const res = await api.get(`/movies/search?query=${query}`);
    return res.data;
    console.log('Search Results:', res.data);
  } catch (error) {
    throw error;
  }
};

export const getSortedMovies = async (sortBy) => {
  try {
    const res = await api.get(`/movies/sorted?sortBy=${sortBy}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addMovie = async (movieData) => {
  try {
    const res = await api.post('/movies', movieData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const res = await api.put(`/movies/${id}`, movieData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const res = await api.delete(`/movies/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// User API calls
export const getUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default api;