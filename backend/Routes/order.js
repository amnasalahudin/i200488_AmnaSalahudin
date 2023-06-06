

const express = require('express');
const router = express.Router();
const orderController = require('../Controller/order');
const authMiddleware = require('../Middleware/Auth');

router.get('/orders', orderController.getAll); //view all orders
router.patch('/orders/:orderId', authMiddleware, orderController.update); //update an order
router.post('/orders', authMiddleware, orderController.create); // for customer
router.get('/orders/seller', authMiddleware, orderController.getBySeller); //view all orders for a seller


module.exports = router;
