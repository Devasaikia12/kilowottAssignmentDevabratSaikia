"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const jwtKey = config_1.default.get('jwtKey');
const jwtSign = (payload, options) => {
    const token = jsonwebtoken_1.default.sign(payload, jwtKey, options);
    return token;
};
exports.jwtSign = jwtSign;
const jwtVerify = (token) => {
    try {
        const decode = jsonwebtoken_1.default.verify(token, jwtKey);
        return {
            valid: true,
            expired: false,
            decode
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message == 'jwt error',
            decode: null
        };
    }
};
exports.jwtVerify = jwtVerify;
