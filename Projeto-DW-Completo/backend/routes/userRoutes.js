const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

// Rota para registrar usuário
router.post('/register', async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento de erros
  }
});

// Rota para login de usuário
router.post('/login', async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento de erros
  }
});

module.exports = router;
