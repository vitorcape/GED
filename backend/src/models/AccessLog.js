const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    email: { type: String },
    data: { type: Date, default: Date.now },
    ip: { type: String },
    userAgent: { type: String }
});

module.exports = mongoose.model('AccessLog', accessLogSchema);