import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              MovieDB
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your ultimate movie database with all the information you need about your favorite films.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block">
              Home
            </Link>
            <Link component={RouterLink} to="/search" color="inherit" display="block">
              Search
            </Link>
            <Link component={RouterLink} to="/login" color="inherit" display="block">
              Login
            </Link>
            <Link component={RouterLink} to="/register" color="inherit" display="block">
              Register
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link component={RouterLink} to="/privacy" color="inherit" display="block">
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" display="block">
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@moviedb.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" component={RouterLink} to="/">
              MovieDB
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;