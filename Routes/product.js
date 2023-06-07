// Routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../Controller/product'); //import product controller
const authMiddleware = require('../Middleware/Auth'); //import auth middleware

router.post('/brands/:brandId/products', authMiddleware, productController.create); //create a product for a brand
router.get('/brands/:brandId/products', productController.getAllByBrand); //view all products of a brand
router.get('/', productController.getAll); //view all products
router.patch('/:productId', authMiddleware, productController.update); //edit a product
router.delete('/delete/:productId', authMiddleware, productController.delete); //delete a product

module.exports = router;
