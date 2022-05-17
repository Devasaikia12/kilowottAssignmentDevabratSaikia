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
exports.authChecker = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("config"));
const User_model_1 = __importDefault(require("../model/User.model"));
const JWTKey = config_1.default.get('jwtKey');
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies)
        token = req.cookies.jwt;
    return token;
};
let opts = {
    secretOrKey: JWTKey,
    jwtFromRequest: cookieExtractor
};
exports.default = (passport) => {
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        yield User_model_1.default.findById(jwt_payload.userId)
            .then(user => user ? done(null, user) : done(null, false))
            .catch(() => done(null, false));
    })));
};
exports.authChecker = passport_1.default.authenticate("jwt", { session: false });
