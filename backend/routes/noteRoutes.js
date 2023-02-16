const { Router } = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getNotes, addNote } = require('../controllers/note/noteController');

/* =============================
📦 Создаем Роутер
============================= */
const router = Router({
  mergeParams: true
});

/* =============================
📦 Описываем маршруты
============================= */
router.route('/')
  .get(protect, getNotes)
  .post(protect, addNote)

module.exports = router;
