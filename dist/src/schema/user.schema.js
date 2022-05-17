"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.userProfileSchema = exports.changePasswordSchema = exports.createUserSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().label('First Name'),
    lastName: joi_1.default.string().required().label('Last Name'),
    email: joi_1.default.string().email({ tlds: { allow: false } }).label('Email'),
    password: joi_1.default.string().required().min(6).label('Password'),
    confirmPassword: joi_1.default.any().equal(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
    addresses: joi_1.default.array().items(joi_1.default.string()).allow('').label('Addresses')
});
exports.createUserSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().label('First Name'),
    lastName: joi_1.default.string().required().label('Last Name'),
    email: joi_1.default.string().email({ tlds: { allow: false } }).label('Email')
});
exports.changePasswordSchema = joi_1.default.object({
    currentPassword: joi_1.default.string().required().min(6).label('Password'),
    password: joi_1.default.string().required().min(6).label('Password'),
    confirmPassword: joi_1.default.any().equal(joi_1.default.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
});
exports.userProfileSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().label('First Name'),
    lastName: joi_1.default.string().required().label('Last Name'),
    addresses: joi_1.default.array().items(joi_1.default.string()).allow('').label('Addresses'),
    profilePic: joi_1.default.string().allow('').label('Profile pic')
});
exports.signInSchema = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }).label('Email'),
    password: joi_1.default.string().required().min(6).label('Password'),
});
