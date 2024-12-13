const express = require('express');
const { createClass, viewSchedule, getAllClasses, bookClass } = require('../controllers/classController');
const authenticate = require('../middlewares/auth');

const router = express.Router();
router.post('/classes', authenticate(['admin']), createClass);
router.get('/', authenticate(['admin']), getAllClasses);
router.get('/schedule', authenticate(['trainer']), viewSchedule);
router.post('/book', authenticate(['trainee']), bookClass);