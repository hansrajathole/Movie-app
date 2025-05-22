import app from './src/app.js';
import config from './src/config/config.js';
import connectDB from './src/db/db.js'
// Start server

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});

console.log('Server file executed');