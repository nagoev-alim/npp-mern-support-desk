const express = require('express');
const colors = require('colors');
const { urlencoded, json } = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

const APP = express();

APP.use(json());
APP.use(urlencoded({ extended: false }));

APP.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to the Support Desk API' });
});

// 🚀 ROUTES ==========================
APP.use('/api/users', require('./routes/useRoutes'));
APP.use(errorHandler);

APP.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`.bgGreen.black));
