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
exports.signIn = exports.signUpAdmin = void 0;
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const User_model_1 = __importDefault(require("../model/User.model"));
const jwt_uttil_1 = require("../uttils/jwt.uttil");
const signUpAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, confirmpassword, addresses, } = req.body;
    try {
        const emailExist = yield User_model_1.default.findOne({ email });
        if (emailExist)
            res.status(400).json({ error: "Email and passowrd not match" });
        const admin = {
            firstName,
            lastName,
            email,
            password,
            addresses,
            isAdmin: true
        };
        const user = yield User_model_1.default.create(admin);
        res.status(201).send((0, lodash_1.omit)(user.toJSON(), "password", "updatedAt", "createdAt"));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.signUpAdmin = signUpAdmin;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_model_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ error: "Email and passowrd not match" });
        const isValid = yield (user === null || user === void 0 ? void 0 : user.comparePassword(password));
        if (!isValid)
            return res.status(401).json({ error: "Email and passowrd not match" });
        // create jwt token
        const token = (0, jwt_uttil_1.jwtSign)({
            email: user.email,
            userId: user._id,
            name: `${user.firstName} ${user.lastName}`
        }, { expiresIn: config_1.default.get("tokenExpire"),
            algorithm: 'HS256'
        });
        res.cookie('jwt', token);
        return res.status(200).send({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            userId: user._id,
            token
        });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.signIn = signIn;
