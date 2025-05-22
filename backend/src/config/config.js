
import dotenv from 'dotenv';
dotenv.config();

const _config ={
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/movieData",
    JWT_SECRET: process.env.JWT_SECRET,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
}

const config = Object.freeze(_config);
export default config