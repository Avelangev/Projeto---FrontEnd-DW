export function Header() {
  return `
    <header>
      <nav>
        <ul class="menu">
          <li><a href="/public/index.html"><img src="/src/assets/home-icon.png" alt="Início"> Início</a></li>
          <li><a href="#" id="access-history"><img src="/src/assets/history-icon.png" alt="Histórico"> Acessar Histórico do Meu PC</a></li>
          <li><a href="#" id="logout"><img src="/src/assets/logout-icon.png" alt="Deslogar"> Deslogar</a></li>
        </ul>
      </nav>
    </header>
  `;
}

// Script para adicionar funcionalidades de redirecionamento
document.addEventListener("DOMContentLoaded", function() {
  const logoutButton = document.getElementById("logout");
  const historyButton = document.getElementById("access-history");

  // Redirecionar para a página de login ao clicar em "Deslogar"
  logoutButton.addEventListener("click", function() {
      window.location.href = '/public/login.html';
  });

  // Adicionar funcionalidade ao botão "Acessar Histórico"
  historyButton.addEventListener("click", function() {
      const existingHistoryContent = document.getElementById('history-content');

      if (!existingHistoryContent) {
          const mainContent = document.querySelector('.main-content');
          

          // Exibe os dados fictícios
          let historyContent = '<div id="history-content"><h2>Histórico do Meu PC</h2><ul>';
          fakeHistoryData.forEach(item => {
              historyContent += `<li>ID: ${item.id} - Ação: ${item.action} - Data: ${item.date}</li>`;
          });
          historyContent += '</ul></div>';

          // Adiciona a exibição dos dados ao documento
          mainContent.innerHTML += historyContent;
      }
  });
});
