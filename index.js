const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Database URL (for local MongoDB)
const mongoURI = 'mongodb://localhost:27017/vidly';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Use genres route
app.use('/api/genres', genres);
app.use('/api/customers', customers);

// PORT configuration
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

