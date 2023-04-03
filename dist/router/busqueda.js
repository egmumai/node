"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulos_model_1 = require("../models/articulos.model");
const busquedaRoutes = (0, express_1.Router)();
busquedaRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const arts = yield articulos_model_1.Articulo.find({ nombre: regex }, { nombre: 1, precio: 1, _id: 0 })
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        arts
    });
}));
busquedaRoutes.get('/:dato', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busqueda = req.params.dato;
    const regex = new RegExp(busqueda, 'i');
    const arts = yield articulos_model_1.Articulo.find({
        $or: [
            { nombre: regex },
            { descripcion: regex },
            { observaciones: regex }
        ]
    }).sort({ _id: -1 }).exec();
    res.json({
        ok: true,
        arts
    });
}));
exports.default = busquedaRoutes;
