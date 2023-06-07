// routes/smsRoutes.js

const express = require('express');
const router = express.Router();
const smsController = require('../Controller/twilio');
const authMiddleware = require('../Middleware/Auth'); //import auth middleware

router.post('/send-sms', authMiddleware, smsController.sendSms);

module.exports = router;
