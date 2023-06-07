const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    editUser,
    getAllSellers,
  } = require('../Controller/user');

const authMiddleware = require('../Middleware/Auth');

  // Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

//Edit a user
router.patch('/edit/:userId', authMiddleware, editUser);

// Get all users
router.get('/', getAllSellers);

module.exports = router;
  