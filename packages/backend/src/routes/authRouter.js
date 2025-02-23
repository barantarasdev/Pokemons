const express = require('express');
const { validation } = require('../middleware/validationMiddleware');
const { authSchema } = require('../validation/authValidation');
const { verifyToken } = require('../middleware/authMiddleware');
const authService = require('../services/authService');

const authRouter = express.Router();

authRouter.post('/login', validation(authSchema), authService.login);
authRouter.post('/logout', verifyToken, authService.logout);
authRouter.get('/nonce', authService.nonce);

module.exports = authRouter;
