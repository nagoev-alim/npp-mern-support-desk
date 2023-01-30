const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const APP = express();

APP.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to the Support Desk API' });
});

APP.listen(PORT, () => console.log(`Server started on port ${PORT}`));
