const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/me', authMiddleware, profile);

module.exports = router;
