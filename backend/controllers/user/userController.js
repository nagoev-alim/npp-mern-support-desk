const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Подключаем схему
const User = require('../../models/userModel');

/**
 * @desc Регистрация пользователя
 * @route /api/users
 * @access public
 * @method POST
 */
const registerUser = asyncHandler(async ({ body: { name, email, password } }, res) => {
  // Валидация полей
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please include all fields' });
  }

  // Получаем пользователя по полю
  const userExists = await User.findOne({ email });

  // Проверка существования пользователя
  if (userExists) {
    res.status(400);
    throw  new Error('User already exists');
  }

  // Генерируем пароль
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Создаем пользователя
  const user = await User.create({ name, email, password: hashPassword });

  // Если пользователь успешно создан - возвращаем объект
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // Выводим сообщение об ошибке
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @desc Авторизация пользователя
 * @route /api/users/login
 * @access public
 * @method POST
 */
const loginUser = asyncHandler(async (req, res) => {
  // Получаем поля
  const { email, password } = req.body;

  // Находим пользователя
  const user = await User.findOne({ email });

  // Проверка существования пользователя и проверка пароля
  if (user && (await bcrypt.compare(password, user.password))) {
    // Возвращаем объект
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // Выводим сообщение об ошибке
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * @desc Получение информации о пользователе
 * @route /api/users/me
 * @access private
 * @method GET
 */
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name
  }

  res.status(200).json(user)
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
