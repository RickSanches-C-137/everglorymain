"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = exports.ServiceException = void 0;
class ServiceException extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
exports.ServiceException = ServiceException;
class BadRequestException extends ServiceException {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestException = BadRequestException;
