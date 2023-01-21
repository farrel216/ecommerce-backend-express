const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token == null) return res.status(401).send({ message: 'Unauthorized' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: 'Forbidden' });
    req.id = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
