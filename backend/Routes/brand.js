const express = require('express');
const router = express.Router();
const brandController = require('../Controller/brand');
const authMiddleware = require('../Middleware/Auth');

router.post('/createbrand', authMiddleware, brandController.create);
router.patch('/editBrand/:id', authMiddleware, brandController.update);
router.get('/viewbrand', authMiddleware, brandController.getAllBySeller);
router.delete('/deleteBrand/:id', authMiddleware, brandController.delete);

module.exports = router;
