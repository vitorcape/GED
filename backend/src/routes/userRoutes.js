const express = require('express');
const router = express.Router();
const Usuario = require('../models/User');

router.post('/cadastrar', async (req, res) => {
    try {
        const { nome, nickname, email, cargo, avatar, permissao, senha } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ erro: 'E-mail já cadastrado' });
        }

        const novoUsuario = new Usuario({ nome, nickname, email, cargo, avatar, permissao, senha });
        await novoUsuario.save();

        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('🔥 Erro ao cadastrar usuário:', error);
        res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhes: error.message });
    }
});

module.exports = router;