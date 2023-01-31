const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/user/userController');
const router = Router();

router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
