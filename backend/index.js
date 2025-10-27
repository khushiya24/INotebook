const connectToMongo = require('./db'); // Import DB connection
const express = require('express');
const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();
app.use(express.json())

// Basic route
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
