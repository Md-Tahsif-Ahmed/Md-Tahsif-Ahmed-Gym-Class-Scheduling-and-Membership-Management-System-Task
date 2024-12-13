const express = require('express');
const { register, login, updateProfile } = require('../controllers/userController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authenticate(['trainee']), updateProfile);


module.exports = router;

