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
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGODB_URI = 'mongodb+srv://explotacion:ZAsJIuqgFsvsJpyJ@explotaciones.aou2erk.mongodb.net/jesuscaceres';
        yield mongoose_1.default.connect(MONGODB_URI, options);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        throw new Error('Error al iniciar BD');
    }
});
exports.dbConnection = dbConnection;
