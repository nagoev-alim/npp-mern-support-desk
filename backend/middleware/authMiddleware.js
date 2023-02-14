const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

//
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Получаем токен
      token = req.headers.authorization.split(' ')[1];
      // Верификация токена
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Получение пользователя по токену
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (e) {
      console.log(e);
      // Выводим сообщение
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  // Выводим сообщение
  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = { protect };
