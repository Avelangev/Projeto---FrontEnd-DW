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
          <label for="email">Email:</label>
          <input type="email" id="email" required>
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
      <button id="backToLogin">Voltar para Login</button>
    </div>
    ${Footer()}
  `;

  const registerForm = document.getElementById('registerForm');
  const backToLoginButton = document.getElementById('backToLogin');
  const registerStatus = document.getElementById('registerStatus');

  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verifica se todos os campos estão preenchidos
    if (!username || !email || !password || !confirmPassword) {
      registerStatus.textContent = 'Por favor, preencha todos os campos!';
      return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      registerStatus.textContent = 'As senhas não coincidem!';
      return;
    }

    // Ajuste a URL conforme a configuração do seu back-end
    fetch('http://localhost:5000/api/users/register', { // Verifique se o "/api" está correto
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, email, password }),
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
        window.location.href = '/frontend/public/login.html';
      }, 2000); // Tempo de redirecionamento, ajuste conforme necessário
    })
    .catch(error => {
      registerStatus.textContent = error.message; // Exibe mensagem de erro específica
    });
  });

  // Adiciona funcionalidade ao botão "Voltar para Login"
  backToLoginButton.addEventListener('click', function() {
    window.location.href = '/frontend/public/login.html';
  });
});
