"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modules_1 = __importDefault(require("./modules"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(modules_1.default);
app.get('/', (req, res) => {
    res.send('Pong');
});
app.use((_req, res, _next) => {
    res.status(404).json({
        message: 'Resource does not exist',
    });
});
exports.default = app;
