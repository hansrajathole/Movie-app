import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

// Layouts
import MainLayout from './components/layouts/MainLayouts';

// Public Pages
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFountPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AddMoviePage from './pages/admin/AddMoviePage';
import EditMoviePage from './pages/admin/EditMoviePage';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route path="movies/:id" element={<MovieDetailPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              
              {/* Admin Routes */}
              <Route path="admin" element={<AdminRoute />}>
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="add-movie" element={<AddMoviePage />} />
                <Route path="edit-movie/:id" element={<EditMoviePage />} />
              </Route>
              
              {/* 404 and Redirects */}
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;