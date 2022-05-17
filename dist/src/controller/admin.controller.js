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
exports.listUsers = exports.disableUser = exports.deleteUser = exports.createUser = void 0;
const lodash_1 = require("lodash");
const User_model_1 = __importDefault(require("../model/User.model"));
const email_uttil_1 = require("../uttils/email.uttil");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName } = req.body;
    try {
        const emailExist = yield User_model_1.default.findOne({ email });
        if (emailExist)
            return res.status(400).json({ error: 'Email already exist' });
        const password = yield (0, email_uttil_1.sendEmail)(email, firstName);
        const user = yield User_model_1.default.create({ firstName, lastName, email, password });
        // res.status(201).send(omit(user.toJSON(),"password","updatedAt","createdAt","adresses","isAdmin"));
        res.status(201).json({ message: 'User created and email sent to user email . Please check in your spam' });
    }
    catch (error) {
        res.status(404).json(error.message);
    }
});
exports.createUser = createUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield User_model_1.default.deleteOne({ _id: userId });
        res.status(201).json({ message: `userid with ${userId} deleted successfully` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
const disableUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield User_model_1.default.findOne({ _id: userId });
        if (!user)
            return res.status(400).json({ msg: 'User not fopund' });
        const update = yield User_model_1.default.updateOne({ _id: userId }, { active: false });
        res.status(201).send((0, lodash_1.omit)(user.toJSON(), "password", "updatedAt", "createdAt"));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.disableUser = disableUser;
const listUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_model_1.default.aggregate([
            {
                $match: { isAdmin: false },
            },
            {
                $project: {
                    _id: 0,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    defaultAddres: { $first: "$addresses" },
                    isAdmin: 1,
                    active: 1,
                    numberOfAddress: {
                        $cond: {
                            if: { $isArray: "$addresses" },
                            then: { $size: "$addresses" },
                            else: "NA"
                        }
                    }
                }
            },
        ]);
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.listUsers = listUsers;
