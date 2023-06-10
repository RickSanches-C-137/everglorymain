"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
