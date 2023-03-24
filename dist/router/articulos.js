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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const articulos_model_1 = require("../models/articulos.model");
const file_system_1 = __importDefault(require("../class/file-system"));
const articulosRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//.....................................................................................................................//
articulosRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const arts = yield articulos_model_1.Articulo.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .exec();
    res.json({
        ok: true,
        pagina,
        arts
    });
}));
//.....................................................................................................................//
articulosRoutes.post('/', (req, res) => {
    const art = {
        nombre: req.body.nombre,
        gr: req.body.gr,
        volumen: req.body.volumen,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        observaciones: req.body.observaciones,
    };
    const body = req.body;
    const img = fileSystem.imgDeTempAArticulos('jesus');
    body.imgs = img;
    articulos_model_1.Articulo.create(body).then((articuloDB) => __awaiter(void 0, void 0, void 0, function* () {
        res.json({
            ok: true,
            articulo: articuloDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//.....................................................................................................................//
articulosRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return res.status(400).json({ error: 'ID no válido' });
    }
    const arts = yield articulos_model_1.Articulo.findById(id);
    res.json({
        ok: true,
        arts
    });
}));
//.....................................................................................................................//
articulosRoutes.post('/update', (req, res) => {
    const art = {
        nombre: req.body.nombre,
        gr: req.body.gr,
        volumen: req.body.volumen,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        observaciones: req.body.observaciones,
    };
    const body = req.body;
    const img = fileSystem.imgDeTempAArticulos('jesus');
    body.imgs = img;
    articulos_model_1.Articulo.findByIdAndUpdate(body._id, { new: true })
        .then((articuloDB) => {
        if (!articuloDB) {
            res.json({
                ok: false,
                mensaje: "No existe este articulo en la DB"
            });
        }
        else {
            res.json({
                ok: true,
                articuloDB
            });
        }
    })
        .catch((err) => {
        console.error(err);
        // manejar el error de alguna manera
    });
});
//.....................................................................................................................//
articulosRoutes.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return res.status(400).json({ error: 'ID no válido' });
    }
    const arts = yield articulos_model_1.Articulo.findById(id);
    if (!arts) {
        return res.status(400).json({
            ok: false,
            mensaje: 'no existe artículo'
        });
    }
    yield articulos_model_1.Articulo.findByIdAndDelete(id);
    res.json({
        ok: true,
    });
}));
//.....................................................................................................................//
articulosRoutes.post('/uploadimagen', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'no se has subido ningún archivo'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }
    const file1 = Array.isArray(file) ? file[0] : file;
    if (!file1.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }
    yield fileSystem.guardarImagenTemporal(file1, 'jesus');
    res.json({
        ok: true,
        file: file1.mimetype
    });
}));
//.....................................................................................................................//
articulosRoutes.get('/imagen/:userid/:img', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = 'jesus';
    const img = req.params.img;
    const pathFoto = fileSystem.getFotoUrl(userId, img);
    res.sendFile(pathFoto);
}));
exports.default = articulosRoutes;
