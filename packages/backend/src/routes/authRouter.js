const express = require('express');
const { login, nonce, logout } = require('../services/authService');
const { validation } = require('../middleware/validationMiddleware');
const { authSchema } = require('../validation/authValidation');
const { verifyToken } = require('../middleware/authMiddleware');

const authRouter = express.Router();

authRouter.post('/login', validation(authSchema), login);
authRouter.post('/logout', verifyToken, logout);
authRouter.get('/nonce', nonce);

module.exports = authRouter;
