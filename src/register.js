import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    ${Header()}
    <div class="login-container">
      <h1>Cadastro</h1>
      <form id="registerForm">
        <div class="input-group">
          <label for="username">Usuário:</label>
          <input type="text" id="username" required>
        </div>
        <div class="input-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" required>
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirmar Senha:</label>
          <input type="password" id="confirmPassword" required>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p id="registerStatus"></p>
      <button id="backToLogin">Voltar para Login</button> <!-- Botão para retornar ao login -->
    </div>
    ${Footer()}
  `;

  const registerForm = document.getElementById('registerForm');
  const backToLoginButton = document.getElementById('backToLogin');

  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registerStatus = document.getElementById('registerStatus');

    // Verifica se todos os campos estão preenchidos
    if (!username || !password || !confirmPassword) {
      registerStatus.textContent = 'Por favor, preencha todos os campos!';
      return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      registerStatus.textContent = 'As senhas não coincidem!';
      return;
    }

    // Envia os dados para o servidor
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        // Verifica se o usuário já existe
        const userExists = users.some(user => user.username === username);
        if (userExists) {
          throw new Error('Usuário já existe!');
        }

        // Se o usuário não existe, faz o cadastro
        return fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao realizar cadastro. Tente novamente.');
        }
        return response.json();
      })
      .then(data => {
        registerStatus.textContent = 'Cadastro realizado com sucesso!';
        // Redireciona após a mensagem de sucesso ser exibida
        setTimeout(() => {
          window.location.href = '/public/login.html';
        }, 2000); // Tempo de redirecionamento, ajuste conforme necessário
      })
      .catch(error => {
        registerStatus.textContent = error.message; // Exibe mensagem de erro específica
      });
  });

  // Adiciona funcionalidade ao botão "Voltar para Login"
  backToLoginButton.addEventListener('click', function() {
    window.location.href = '/public/login.html';
  });
});
