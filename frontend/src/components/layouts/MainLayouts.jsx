import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;