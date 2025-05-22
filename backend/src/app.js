import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import config from './config/config.js';
// import seed from './utils/seed.js'
// import queue from './utils/queue.js';
// Load environment variables
dotenv.config();

const app = express();


const allowedOrigin = config.BASE_URL

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;