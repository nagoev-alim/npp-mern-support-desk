const asyncHandler = require('express-async-handler');

/* =============================
📦 Подключаем схемы
============================= */
const Ticket = require('../../models/ticketModel');

/* =============================
📦 Описываем методы
============================= */
/**
 * @desc Поиск билетов
 * @route /api/tickets
 * @access private
 * @method GET
 */
const getTickets = asyncHandler(async (req, res) => {
  // Получение массива билетов пользователя
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

/**
 * @desc Поиск билета по ID
 * @route /api/tickets/:id
 * @access private
 * @method GET
 */
const getTicket = asyncHandler(async (req, res) => {
  // Получение массива билетов пользователя
  const ticket = await Ticket.findById(req.params.id);
  // Проверка существования билета
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  // Проверка пользователя
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  res.status(200).json(ticket);
});

/**
 * @desc Обновление билета
 * @route /api/tickets/:id
 * @access private
 * @method PUT
 */
const updateTicket = asyncHandler(async (req, res) => {
  // Получение массива билетов пользователя
  const ticket = await Ticket.findById(req.params.id);
  // Проверка существования билета
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  // Проверка пользователя
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  // Обновление билета
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTicket);
});

/**
 * @desc Удаление билета
 * @route /api/tickets/:id
 * @access private
 * @method DELETE
 */
const deleteTicket = asyncHandler(async (req, res) => {
  // Получение массива билетов пользователя
  const ticket = await Ticket.findById(req.params.id);
  // Проверка существования билета
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  // Проверка пользователя
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  // Удаление билета
  await ticket.remove();
  res.status(200).json({ success: true });
});

/**
 * @desc Создание билета
 * @route /api/tickets
 * @access private
 * @method POST
 */
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  // Проверка полей
  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }
  // Создание билета
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });
  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
