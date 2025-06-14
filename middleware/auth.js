// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, "ashi");
    req.user = decoded; // contains userId
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
