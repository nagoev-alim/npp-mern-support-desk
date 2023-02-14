const { Router } = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/ticket/ticketController');

/* =============================
📦 Создаем Роутер
============================= */
const router = Router();

/* =============================
📦 Описываем маршруты
============================= */
router.route('/')
  .get(protect, getTickets)
  .post(protect, createTicket);

router.route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket)

module.exports = router;
