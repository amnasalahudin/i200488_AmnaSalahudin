const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Middleware for authentication
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); //get token from header
    const decoded = jwt.verify(token, "secret"); //verify token

    const user = await User.findOne({ _id: decoded._id }); //find user by id

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
