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
exports.authorize = void 0;
const jwt_uttil_1 = require("../uttils/jwt.uttil");
const User_model_1 = __importDefault(require("../model/User.model"));
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decode: { userId } } = (0, jwt_uttil_1.jwtVerify)(req.cookies.jwt);
        const isAdmin = yield User_model_1.default.findOne({ _id: userId, isAdmin: true });
        if (!isAdmin)
            return res.status(401).json({ message: `You are not authorize user` });
        next();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.authorize = authorize;
