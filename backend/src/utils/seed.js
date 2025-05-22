import mongoose from 'mongoose';
import Movie from '../models/movie.model.js';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

// MongoDB Connection
const MONGODB_URI = "mongodb+srv://hasnrajathole:5aBhSdhrloYi5M4B@cluster1.hmdw4.mongodb.net/movieData";

// Sample movie data from IMDb Top 250
const movies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    rating: 9.3,
    duration: 142,
    releaseDate: "1994-10-14",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    genre: ["Drama"]
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 9.2,
    duration: 175,
    releaseDate: "1972-03-24",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    genre: ["Crime", "Drama"]
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    rating: 9.0,
    duration: 152,
    releaseDate: "2008-07-18",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    genre: ["Action", "Crime", "Drama"]
  },
  {
    title: "The Godfather: Part II",
    description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    poster: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 9.0,
    duration: 202,
    releaseDate: "1974-12-20",
    director: "Francis Ford Coppola",
    cast: ["Al Pacino", "Robert De Niro", "Robert Duvall"],
    genre: ["Crime", "Drama"]
  },
  {
    title: "12 Angry Men",
    description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    poster: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
    rating: 9.0,
    duration: 96,
    releaseDate: "1957-04-10",
    director: "Sidney Lumet",
    cast: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
    genre: ["Crime", "Drama"]
  },
  {
    title: "Schindler's List",
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    poster: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    rating: 8.9,
    duration: 195,
    releaseDate: "1994-02-04",
    director: "Steven Spielberg",
    cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    genre: ["Biography", "Drama", "History"]
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 8.9,
    duration: 201,
    releaseDate: "2003-12-17",
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    genre: ["Action", "Adventure", "Drama"]
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 8.9,
    duration: 154,
    releaseDate: "1994-10-14",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    genre: ["Crime", "Drama"]
  },
  {
    title: "The Good, the Bad and the Ugly",
    description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    poster: "https://m.media-amazon.com/images/M/MV5BNjJlYmNkZGItM2NhYy00MjlmLTk5NmQtNjg1NmM2ODU4OTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
    rating: 8.8,
    duration: 178,
    releaseDate: "1966-12-23",
    director: "Sergio Leone",
    cast: ["Clint Eastwood", "Eli Wallach", "Lee Van Cleef"],
    genre: ["Western"]
  },
  {
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    poster: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 8.8,
    duration: 139,
    releaseDate: "1999-10-15",
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
    genre: ["Drama"]
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    rating: 8.8,
    duration: 142,
    releaseDate: "1994-07-06",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    genre: ["Drama", "Romance"]
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    rating: 8.8,
    duration: 148,
    releaseDate: "2010-07-16",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    genre: ["Action", "Adventure", "Sci-Fi"]
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    rating: 8.7,
    duration: 136,
    releaseDate: "1999-03-31",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    genre: ["Action", "Sci-Fi"]
  },
  {
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 8.7,
    duration: 146,
    releaseDate: "1990-09-21",
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    genre: ["Biography", "Crime", "Drama"]
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    description: "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.",
    poster: "https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    rating: 8.7,
    duration: 133,
    releaseDate: "1975-11-19",
    director: "Milos Forman",
    cast: ["Jack Nicholson", "Louise Fletcher", "Will Sampson"],
    genre: ["Drama"]
  }
];

// Sample users
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user"
  }
];

// Seed database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas for seeding');

    // Clear existing data
    await Movie.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert movies
    await Movie.insertMany(movies);
    console.log(`Inserted ${movies.length} movies`);

    // Insert users with hashed passwords
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      await User.create({
        ...user,
        password: hashedPassword
      });
    }
    console.log(`Inserted ${users.length} users`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();