const express = require('express');
const colors = require('colors');
const { urlencoded, json } = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

/* =============================
📦 Подключение к БД
============================= */
connectDB();

/* =============================
📦 Создаем новый экземпляр приложения
============================= */
const app = express();

/* =============================
📦 Конфигурация приложения
============================= */
app.use(cors())
app.use(json());
app.use(urlencoded({ extended: false }));

/* =============================
📦 Настройка маршрутов
============================= */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

/* =============================
📦 Вывод сообщения об ошибке
============================= */
app.use(errorHandler);

/* =============================
📦 Вывод сообщении об подключении
============================= */
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`.bgGreen.black));
