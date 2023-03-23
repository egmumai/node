"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const cors_1 = __importDefault(require("cors"));
const articulos_1 = __importDefault(require("./router/articulos"));
const config_1 = require("./database/config");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = new server_1.default();
//body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//FileUpload
server.app.use((0, express_fileupload_1.default)());
//Rutas de mi app
server.app.use('/articulos', articulos_1.default);
//Conetar DB
// Llamar a la función dbConnection para conectarse a la base de datos
(0, config_1.dbConnection)()
    .then(() => {
    console.log('Conexión exitosa');
})
    .catch((error) => {
    console.log('Error al conectar a la base de datos', error);
});
server.start(() => {
    console.log(`servidor corriendo en  ${server.port}`);
});
