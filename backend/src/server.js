require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const usuariosRoute = require('./routes/usuarios');
app.use('/usuarios', usuariosRoute);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API online!');
});

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => console.error('Erro na conexão com MongoDB:', err));

// Porta padrão (usada pelo Railway)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});