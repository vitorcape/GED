require('dotenv').config();
console.log("PORTA recebida via ambiente:", process.env.PORT);
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: '*', // ou 'http://localhost:3000' para limitar
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

console.log("Iniciando require das rotas...");
const usuariosRoute = require('./routes/userRoutes');
console.log("Rotas carregadas com sucesso");

app.use('/users', usuariosRoute);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API online!');
});

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => {
        console.error('Erro na conexão com MongoDB:', err);
        process.exit(1); // encerra se der erro
    });


// Porta padrão (usada pelo Railway)
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error('PORT não definida no ambiente');
}

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
