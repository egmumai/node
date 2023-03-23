"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulo = void 0;
const mongoose_1 = require("mongoose");
const articuloSchema = new mongoose_1.Schema({
    created: {
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
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
    },
    volumen: {
        type: String,
    },
    observaciones: {
        type: String,
    },
    imgs: [{
            type: String
        }]
});
articuloSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Articulo = (0, mongoose_1.model)('Articulo', articuloSchema);
