const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const si = require('systeminformation'); 
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middleware para interpretar requisições com JSON
app.use(express.json());
app.use(cors());

// Armazenar as três últimas verificações realizadas
let systemHealthHistory = [];

// Rotas de Usuário
app.use('/api/users', userRoutes);

// Rota para coletar as informações do sistema
app.get('/api/system-stats', async (req, res) => {
    try {
        const cpuLoad = await si.currentLoad(); // Coleta a utilização da CPU
        const memory = await si.mem(); // Coleta as informações de memória
        const disk = await si.fsSize(); // Coleta as informações de disco

        console.log(memory); // Para verificar o que está sendo retornado na memória

        // Cálculo da utilização de RAM
        const ramUsagePercentage = ((memory.active / memory.total) * 100).toFixed(2) + '%'; // Utilização da RAM
        const diskUsagePercentage = ((disk[0].used / disk[0].size) * 100).toFixed(2) + '%'; // Utilização do Disco

        // Criação do objeto com estatísticas do sistema
        const systemStats = {
            cpu: cpuLoad.currentLoad.toFixed(2) + '%', 
            memory: ramUsagePercentage,
            disk: diskUsagePercentage,
            timestamp: new Date().toISOString() // Data e hora da verificação
        };

        // Adiciona a verificação ao histórico (limitado a 3 entradas)
        if (systemHealthHistory.length >= 3) {
            systemHealthHistory.shift(); // Remove o item mais antigo se já houver 3
        }
        systemHealthHistory.push(systemStats); // Adiciona o novo histórico

        res.json(systemStats); // Retorna as estatísticas coletadas
    } catch (error) {
        console.error('Erro ao coletar informações do sistema:', error);
        res.status(500).json({ error: 'Erro ao coletar informações do sistema' });
    }
});

// Rota para fornecer o histórico das últimas 3 verificações
app.get('/api/system-history', (req, res) => {
    res.json(systemHealthHistory); // Retorna o histórico armazenado
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
