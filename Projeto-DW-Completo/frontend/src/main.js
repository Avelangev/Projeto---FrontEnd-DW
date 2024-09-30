import { Header } from './components/Header.js';
import { Main } from './components/Main.js';
import { Footer } from './components/Footer.js';

document.body.innerHTML = `
  ${Header()}
  ${Main()}
  ${Footer()}
`;

// Referências aos elementos da página
const heart = document.querySelector('.heart');
const progressBar = document.getElementById('progressBar');
const statusText = document.getElementById('status');
const historyButton = document.getElementById('access-history');

// Função para buscar os dados reais de utilização do sistema
async function fetchSystemStats() {
  try {
    const response = await fetch('http://localhost:5000/api/system-stats');
    const data = await response.json();
    return {
      cpu: data.cpu,
      ram: data.memory,
      disk: data.disk,
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error('Erro ao coletar informações do sistema:', error);
    return { cpu: 'N/A', ram: 'N/A', disk: 'N/A', timestamp: 'N/A' };
  }
}

// Função para buscar o histórico real de verificações do sistema
async function fetchSystemHistory() {
  try {
    const response = await fetch('http://localhost:5000/api/system-history');
    return await response.json();
  } catch (error) {
    console.error('Erro ao coletar histórico do sistema:', error);
    return [];
  }
}

// Função para formatar data de timestamp
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Função para limpar o conteúdo antigo do histórico
function clearHistoryContent() {
  const existingHistoryContent = document.getElementById('history-content');
  if (existingHistoryContent) {
    existingHistoryContent.remove(); // Remove o histórico anterior para evitar duplicação
  }

  // Remove o título do histórico se existir
  const existingTitle = document.getElementById('history-title');
  if (existingTitle) {
    existingTitle.remove(); // Remove o título do histórico se já existir
  }
}

// Adiciona funcionalidade ao botão "Acessar Histórico"
historyButton.addEventListener('click', async function () {
  clearHistoryContent(); // Limpa o conteúdo anterior

  const mainContent = document.querySelector('.main-content');

  // Busca o histórico real
  const systemHistory = await fetchSystemHistory();

  // Cria o título do histórico
  const historyTitle = document.createElement('h2');
  historyTitle.id = 'history-title';
  historyTitle.textContent = 'Histórico do Meu PC';
  mainContent.appendChild(historyTitle);

  // Cria o conteúdo do histórico
  let historyContent = '<div id="history-content"><ul>';
  if (systemHistory.length > 0) {
    systemHistory.forEach((item, index) => {
      historyContent += `<li>Verificação ${index + 1} - CPU: ${item.cpu}, RAM: ${item.ram}, Disco: ${item.disk} (Realizada em: ${formatTimestamp(item.timestamp)})</li>`;
    });
  } else {
    historyContent += '<li>Nenhuma verificação realizada ainda.</li>';
  }
  historyContent += '</ul></div>';

  // Adiciona a exibição dos dados ao documento
  mainContent.innerHTML += historyContent;
});

// Adiciona a funcionalidade de verificação de saúde do PC
heart.addEventListener('click', async function () {
  statusText.textContent = "Verificando a saúde do PC...";
  progressBar.style.width = "0%";

  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 100);

  // Coleta os dados reais do sistema
  const systemStats = await fetchSystemStats();

  setTimeout(() => {
    statusText.textContent = `Saúde do PC verificada com sucesso!\nCPU: ${systemStats.cpu} Utilização\nRAM: ${systemStats.ram} Utilização\nDisco: ${systemStats.disk} Utilização`;
  }, 2100);
});
