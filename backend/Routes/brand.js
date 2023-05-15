const express = require('express');
const router = express.Router();
const brandController = require('../Controller/brand');
const authMiddleware = require('../Middleware/Auth');

//create a brand for a seller
router.post('/createbrand', authMiddleware, brandController.create);
router.patch('/editBrand/:id', authMiddleware, brandController.update); //edit a brand
router.get('/viewbrand', authMiddleware, brandController.getAllBySeller); //view all brands of a seller
router.delete('/deleteBrand/:id', authMiddleware, brandController.delete); //delete a brand
router.get('/', brandController.getAll); //view all brands
router.get('/:id', brandController.getById); //view a brand by id

module.exports = router;
