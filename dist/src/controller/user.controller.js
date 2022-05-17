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
exports.updateUserProfile = exports.changePassword = void 0;
const User_model_1 = __importDefault(require("../model/User.model"));
const jwt_uttil_1 = require("../uttils/jwt.uttil");
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //const id = req.params.id
    const { password, currentPassword } = req.body;
    try {
        //matching jwt cookie user id with pass user id
        const { decode: { userId } } = (0, jwt_uttil_1.jwtVerify)(req.cookies.jwt);
        if (!userId)
            return res.status(401).json({ message: 'You are not authorize' });
        //check user exist or not
        const user = yield User_model_1.default.findOne({ _id: userId });
        if (!user)
            return res.status(401).json({ error: "User not found" });
        // check whether current password is matching
        const isValid = yield (user === null || user === void 0 ? void 0 : user.comparePassword(currentPassword));
        if (!isValid)
            return res.status(401).json({ error: "Current passowrd is not match" });
        user.password = password;
        yield user.save();
        res.status(401).json({ message: `You password has changed` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.changePassword = changePassword;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { firstName, lastName, addresses } = req.body;
    try {
        const filename = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : '';
        const { decode: { userId } } = (0, jwt_uttil_1.jwtVerify)(req.cookies.jwt);
        if (!userId)
            return res.status(401).json({ message: `Unauthorize` });
        const user = yield User_model_1.default.findOne({ _id: userId });
        if (!user)
            return res.status(401).json({ error: "User not found" });
        user.firstName = firstName;
        user.lastName = lastName;
        user.addresses = addresses;
        user.profilePic = filename;
        yield user.save();
        res.status(201).json({ message: "User profile updated" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUserProfile = updateUserProfile;
