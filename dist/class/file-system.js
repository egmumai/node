"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() {
    }
    // Función que guarda la imagen el la carpeta temp despues de crear la carpeta de usuario si no existe  y generar un nombre único a la imagen   
    guardarImagenTemporal(file, userId) {
        return new Promise((resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    // funcion que genera un nombre único a la imagen subida
    generarNombreUnico(nombre) {
        const nombreArr = nombre.split('.');
        const ext = nombreArr[nombreArr.length - 1];
        const idUnico = (0, uniqid_1.default)();
        return `${idUnico}.${ext}`;
    }
    //función que cre las carpetas con el nombre de usuario y la carpeta temp
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads', userId);
        const pathUserTemp = pathUser + '/temp';
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imgDeTempAArticulos(userId) {
        userId = 'jesus';
        const pathTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        const pathArt = path_1.default.resolve(__dirname, '../uploads', userId, 'articulos');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathArt)) {
            fs_1.default.mkdirSync(pathArt);
        }
        const imgTemp = this.obtenerImgEnTemp(userId);
        imgTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathArt}/${imagen}`);
        });
        return imgTemp;
    }
    obtenerImgEnTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(userId, img) {
        const pathFoto = path_1.default.resolve(__dirname, '../uploads', userId, 'articulos', img);
        if (!fs_1.default.existsSync(pathFoto)) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg', userId, 'articulos', img);
        }
        return pathFoto;
    }
}
exports.default = FileSystem;
