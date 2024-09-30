export function Header() {
  return `
    <header>
      <nav>
        <ul class="menu">
          <li><a href="#" id="homeButton"><img src="/frontend/src/assets/home-icon.png" alt="Início"> Início</a></li>
          <li><a href="#" id="access-history"><img src="/frontend/src/assets/history-icon.png" alt="Histórico"> Acessar Histórico do Meu PC</a></li>
          <li><a href="#" id="logout"><img src="/frontend/src/assets/logout-icon.png" alt="Deslogar"> Deslogar</a></li>
        </ul>
      </nav>
    </header>
  `;
}

// Script para adicionar funcionalidades de redirecionamento
document.addEventListener("DOMContentLoaded", function() {
  // Verifica se os elementos existem no DOM
  const homeButton = document.getElementById("homeButton");
  const logoutButton = document.getElementById("logout");
  const historyButton = document.getElementById("access-history");

  if (homeButton) {
    // Recarregar a página ao clicar no botão "Início"
    homeButton.addEventListener("click", function(event) {
      event.preventDefault(); // Previne o comportamento padrão do link
      window.location.reload(); // Recarrega a página atual
    });
  }

  if (logoutButton) {
    // Redirecionar para a página de login ao clicar em "Deslogar"
    logoutButton.addEventListener("click", function() {
      window.location.href = '/frontend/public/login.html';
    });
  }

  if (historyButton) {
    // Adicionar funcionalidade ao botão "Acessar Histórico"
    historyButton.addEventListener("click", async function() {
      const existingHistoryContent = document.getElementById('history-content');
      const mainContent = document.querySelector('.main-content');

      if (existingHistoryContent) {
        // Remover o conteúdo existente para evitar duplicações
        existingHistoryContent.remove();
      }

      // Função para buscar o histórico real das verificações
      async function fetchSystemHistory() {
        try {
          const response = await fetch('http://localhost:5000/api/system-history');
          return await response.json();
        } catch (error) {
          console.error('Erro ao coletar histórico do sistema:', error);
          return [];
        }
      }

      // Busca o histórico real
      const systemHistory = await fetchSystemHistory();

      // Exibe os dados do histórico real
      let historyContent = '<div id="history-content"><h2>Histórico do Meu PC</h2><ul>';
      if (systemHistory.length > 0) {
        systemHistory.forEach((item, index) => {
          historyContent += `<li>Verificação ${index + 1} - CPU: ${item.cpu}, RAM: ${item.ram}, Disco: ${item.disk} (Realizada em: ${item.timestamp})</li>`;
        });
      } else {
        historyContent += '<li>Nenhum histórico de verificação encontrado.</li>';
      }
      historyContent += '</ul></div>';

      // Adiciona a exibição dos dados ao documento
      if (mainContent) {
        mainContent.innerHTML += historyContent;
      }
    });
  }
});
