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
          <label for="username">Usuário:</label>
          <input type="text" id="username" required>
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
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginStatus = document.getElementById('loginStatus');

    // Simulação de verificação de login
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
          loginStatus.textContent = 'Login realizado com sucesso!';
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000); // 2 segundos de atraso
        } else {
          loginStatus.textContent = 'Usuário ou senha incorretos!';
        }
      })
      .catch(error => {
        loginStatus.textContent = 'Erro ao tentar fazer login!';
      });
  });
});
