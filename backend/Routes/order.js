

const express = require('express');
const router = express.Router();
const orderController = require('../Controller/order');
const authMiddleware = require('../Middleware/Auth');

router.get('/orders', orderController.getAll);
router.patch('/orders/:orderId', authMiddleware, orderController.update);
router.post('/orders', authMiddleware, orderController.create); // for customer

module.exports = router;
