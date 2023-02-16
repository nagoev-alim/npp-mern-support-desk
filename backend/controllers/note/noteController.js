const asyncHandler = require('express-async-handler');

/* =============================
📦 Подключаем схемы
============================= */
const Ticket = require('../../models/ticketModel');
const Note = require('../../models/noteModel');

/* =============================
📦 Описываем методы
============================= */
/**
 * @desc Поиск заметок у билета
 * @route /api/tickets/:ticketId/notes
 * @access private
 * @method GET
 */
const getNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

/**
 * @desc Создание заметки
 * @route /api/tickets/:ticketId/notes
 * @access private
 * @method POST
 */
const addNote = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const note = await Note.create({
    ticket: req.params.ticketId,
    isStaff: false,
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(note);
});


module.exports = {
  getNotes,
  addNote,
};
