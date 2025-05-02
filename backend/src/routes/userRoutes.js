const express = require('express');
const router = express.Router();
const Usuario = require('../models/User');
const autenticar = require('../middleware/auth');

router.get('/protegido', autenticar, (req, res) => {
    res.json({ mensagem: `Bem-vindo, usuário ${req.usuario.id}` });
});

router.put('/:id', autenticar, async (req, res) => {
    try {
        const atualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(atualizado);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: err.message });
    }
});

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
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhes: error.message });
    }
});

router.get('/', autenticar, async (req, res) => {
    if (req.usuario.permissao !== 'admin') {
        return res.status(403).json({ erro: 'Acesso negado' });
    }

    const usuarios = await Usuario.find().select('-senha'); // não retorna senhas
    res.json(usuarios);
});

router.delete('/:id', autenticar, async (req, res) => {
    try {
        if (req.usuario.permissao !== 'admin') {
            return res.status(403).json({ erro: 'Apenas administradores podem excluir usuários.' });
        }

        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        res.json({ mensagem: 'Usuário apagado com sucesso.' });
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).json({ erro: 'Erro ao deletar usuário.' });
    }
});

module.exports = router;