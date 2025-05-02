require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

console.log("PORTA recebida via ambiente:", process.env.PORT);
console.log("Iniciando require das rotas...");

// Rotas
const usuariosRoute = require('./routes/userRoutes');
const authRoute = require('./routes/auth');

app.use('/users', usuariosRoute);
app.use('/auth', authRoute);

console.log("Rotas carregadas com sucesso");

app.get('/', (req, res) => res.send('API online!'));

const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT não definida no ambiente');

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado com sucesso!');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

        // Mantém o container ativo
        setInterval(() => {
            console.log("Mantendo container Railway ativo...");
        }, 10000);
    })
    .catch(err => {
        console.error('Erro na conexão com MongoDB:', err);
        process.exit(1);
    });