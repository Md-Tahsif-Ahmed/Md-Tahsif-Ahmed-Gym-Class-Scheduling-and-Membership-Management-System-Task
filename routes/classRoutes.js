const express = require('express');
const { createClass, viewSchedule, getAllClasses } = require('../controllers/classController');
const authenticate = require('../middlewares/auth');

const router = express.Router();
router.post('/classes', authenticate(['admin']), createClass);
router.get('/', authenticate(['admin']), getAllClasses);
router.get('/schedule', authenticate(['trainer']), viewSchedule);