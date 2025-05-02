const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AccessLog = require('../models/AccessLog');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ erro: 'Usuário não encontrado' });

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) return res.status(400).json({ erro: 'Senha inválida' });

        const token = jwt.sign(
            { id: usuario._id, permissao: usuario.permissao },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        await AccessLog.create({
            usuario: usuario._id,
            email: usuario.email,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        });

        res.json({ token, usuario });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao fazer login' });
    }
};