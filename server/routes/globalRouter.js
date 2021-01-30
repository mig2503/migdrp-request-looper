"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
console.log('From global router: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    router.get(['/'], (req, res, next) => {
        res.send('Bienvenido :3');
    });
}
else if (process.env.NODE_ENV === 'development') {
    router.get(['/'], (req, res, next) => {
        res.send('Bienvenido :3');
    });
}
router.post("/api/data/tester", (_req, res) => {
    res.header("Content-Type", 'application/json');
    res.json({
        "message": "ok"
    });
    console.log("check body: ", _req.body);
    console.log("check params: ", _req.params);
    console.log("check query: ", _req.query);
});
router.get("/api/envtest", (_req, res) => {
    res.send("Running the application on <<< " + process.env.NODE_ENV + " environment >>>");
});
router.get("/start_requests", (_req, res) => {
    res.send('Hola hermoso bot, hacemos un buen trabajo, yo soy la app request-looper');
});
exports.default = router;
