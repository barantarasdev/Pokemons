const { verify } = require('jsonwebtoken');

const { TOKEN_SECRET_KEY } = process.env;

function verifyToken(req, res, next) {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ error: 'Token does not exist!' });
  }

  try {
    const decoded = verify(token, TOKEN_SECRET_KEY);
    req.user = req?.user || {};
    req.user.address = decoded.address;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token!' });
  }
}

module.exports = { verifyToken };
