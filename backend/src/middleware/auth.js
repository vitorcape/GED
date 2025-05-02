const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Ignora preflight
    if (req.method === 'OPTIONS') return next();

    const token = req.header('Authorization')?.split(" ")[1];

    if (!token) return res.status(401).json({ erro: 'Acesso negado' });

    try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        res.status(400).json({ erro: 'Token inválido' });
    }
};  