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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const globalRouter_1 = __importDefault(require("./routes/globalRouter"));
const requestGenerator_1 = require("./routes/requestGenerator");
const app = express_1.default();
const PORT = process.env.PORT || 2503;
let server = new http_1.default.Server(app);
const bonobotUrl = process.env.BONOBOT_URI;
const flotaUrl = process.env.FLOTA_URI;
console.log('La aplicación está corriendo en el entorno: <<< ' + process.env.NODE_ENV + ' >>>');
const initServer = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/', globalRouter_1.default);
    requestGenerator_1.createRequest(bonobotUrl);
    requestGenerator_1.createRequest(flotaUrl);
    server.listen(PORT, () => {
        console.log(`La aplicación está corriendo en: <<< port ${PORT} >>> `);
    });
});
initServer().catch((_err) => {
    if (server && server.listening)
        server.close();
    console.log(_err);
    process.exitCode = 1;
});
