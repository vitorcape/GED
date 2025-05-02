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
const usuariosRoute = require('./routes/userRoutes');
console.log("Rotas carregadas com sucesso");

app.use('/users', usuariosRoute);
app.get('/', (req, res) => res.send('API online!'));

const authRoute = require('./routes/auth');
app.use('/auth', authRoute);
const usuariosRoute = require('./routes/userRoutes');
app.use('/users', usuariosRoute);

const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT não definida no ambiente');

// ✅ SÓ inicia o servidor após conexão com o banco
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado com sucesso!');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

        // ✅ Mantém o container vivo
        setInterval(() => {
            console.log("Mantendo container Railway ativo...");
        }, 10000);
    })
    .catch(err => {
        console.error('Erro na conexão com MongoDB:', err);
        process.exit(1);
    });