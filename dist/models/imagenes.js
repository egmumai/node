"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulo = void 0;
var mongoose_1 = require("mongoose");
var articuloSchema = new mongoose_1.Schema({
    create: {
        type: Date
    },
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    qr: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    volumen: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
});
articuloSchema.pre('save', function (next) {
    this.create = new Date();
    next();
});
exports.Articulo = mongoose_1.model('Articulo', articuloSchema);
