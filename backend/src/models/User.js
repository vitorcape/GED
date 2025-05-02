const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    cargo: {
        type: String,
        required: true
    },
    avatar: {
        type: String // URL da imagem
    },
    permissao: {
        type: String,
        enum: ['usuario', 'admin'], // pode expandir depois
        default: 'usuario'
    }
}, {
    timestamps: true
});

usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

module.exports = mongoose.model('User', usuarioSchema);