import { Header } from './components/Header.js';
import { Main } from './components/Main.js';
import { Footer } from './components/Footer.js';

document.body.innerHTML = `
  ${Header()}
  ${Main()}
  ${Footer()}
`;

// Armazenar dados fictícios das últimas três verificações
const fakeHealthData = [
  { cpu: '45%', ram: '60%', disk: '70%' },
  { cpu: '50%', ram: '55%', disk: '65%' },
  { cpu: '40%', ram: '65%', disk: '60%' }
];

const heart = document.querySelector('.heart');
const progressBar = document.getElementById('progressBar');
const statusText = document.getElementById('status');
const historyButton = document.getElementById('access-history');

// Adiciona funcionalidade ao botão "Acessar Histórico"
historyButton.addEventListener('click', function() {
  const existingHistoryContent = document.getElementById('history-content');
  const mainContent = document.querySelector('.main-content');

  if (existingHistoryContent) {
    // Limpar conteúdo antigo
    existingHistoryContent.remove();
  }

  // Dados fictícios
  const fakeHistoryData = [
    { id: 1, action: 'Login realizado', date: '2024-08-24' },
    { id: 2, action: 'Perfil atualizado', date: '2024-08-23' },
    { id: 3, action: 'Logout realizado', date: '2024-08-22' }
  ];

  // Exibe os dados fictícios
  let historyContent = '<div id="history-content"><h2>Histórico do Meu PC</h2><ul>';
  fakeHistoryData.forEach(item => {
    historyContent += `<li>ID: ${item.id} - Ação: ${item.action} - Data: ${item.date}</li>`;
  });
  historyContent += '</ul></div>';
  
  // Adiciona a exibição dos dados ao documento
  mainContent.innerHTML += historyContent;
});

heart.addEventListener('click', function() {
  statusText.textContent = "Verificando a saúde do PC...";
  progressBar.style.width = "0%";
  
  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 100);
  
  setTimeout(() => {
    // Atualiza as informações fictícias
    const lastCheckData = fakeHealthData.pop();
    statusText.textContent = `Saúde do PC verificada com sucesso!\nCPU: ${lastCheckData.cpu} Utilização\nRAM: ${lastCheckData.ram} Utilização\nDisco: ${lastCheckData.disk} Utilização`;

    // Adiciona os dados de volta para manter três verificações no array
    fakeHealthData.unshift(lastCheckData);
  }, 2100);
});
