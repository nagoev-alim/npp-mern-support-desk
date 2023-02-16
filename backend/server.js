const path = require('path')
const express = require('express');
const { urlencoded, json } = require('express');
require('colors');
require('dotenv').config();
const cors = require('cors');
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
app.use(cors());
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


// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
  });
}
/* =============================
📦 Вывод сообщения об ошибке
============================= */
app.use(errorHandler);

/* =============================
📦 Вывод сообщении об подключении
============================= */
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`.bgGreen.black));
