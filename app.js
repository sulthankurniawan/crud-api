const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/crudapi')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use('/api/items', itemRoutes);

// Default route for /
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
