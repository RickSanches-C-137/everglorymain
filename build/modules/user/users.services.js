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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const service_exception_1 = require("../utils/service-exception");
class UserService {
    constructor() {
        this.signUp = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(payload.email);
                // payload.email = payload.email.toLocaleLowerCase();
                let user = yield user_model_1.default.findOne({
                    where: {
                        email: payload.email
                    }
                });
                if (user) {
                    throw new service_exception_1.BadRequestException("Email Already exist");
                }
                const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 10);
                const userData = {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: hashedPassword
                };
                user = yield user_model_1.default.create(userData);
                return user;
            }
            catch (err) {
                console.log(err);
            }
            ;
        });
    }
}
exports.default = UserService;
