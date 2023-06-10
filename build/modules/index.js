"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const auth_guard_1 = require("../middlewares/auth-guard");
const apiRouter = (0, express_1.Router)();
const route = (0, express_1.Router)();
const jwt = (0, auth_guard_1.jwtGuard)({ credentialsRequired: true }).unless({
    path: [
        '/',
        '/v1/users/signup',
        '/v1/users/signin',
    ]
});
apiRouter.use(user_1.default);
route.use('/v1', jwt, apiRouter);
exports.default = route;
