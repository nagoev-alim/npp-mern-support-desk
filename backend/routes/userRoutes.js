const { Router } = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/user/userController');
const { protect } = require('../middleware/authMiddleware');

const router = Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
