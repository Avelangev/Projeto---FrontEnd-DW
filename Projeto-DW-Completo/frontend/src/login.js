// src/login.js

import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    ${Header()}
    <div class="login-container">
      <h1>Login</h1>
      <form id="loginForm">
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" id="email" required>
        </div>
        <div class="input-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" required>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p id="loginStatus"></p>
      <p><a href="register.html">Não tem uma conta? Cadastre-se aqui</a></p>
    </div>
    ${Footer()}
  `;

  const loginForm = document.getElementById('loginForm');
  const loginStatus = document.getElementById('loginStatus');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enviar dados para o servidor para verificar login
    fetch('http://localhost:5000/api/users/login', { // Corrigido para enviar ao back-end correto
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Enviar email e senha para verificação
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao realizar login. Verifique suas credenciais.');
      }
      return response.json();
    })
    .then(data => {
      loginStatus.textContent = 'Login realizado com sucesso!';
      setTimeout(() => {
        window.location.href = '/frontend/public/index.html'; // Redirecionar após sucesso
      }, 2000);
    })
    .catch(error => {
      loginStatus.textContent = error.message || 'Erro ao tentar fazer login!';
    });
  });
});
