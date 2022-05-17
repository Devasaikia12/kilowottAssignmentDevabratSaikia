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
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = __importDefault(require("config"));
mail_1.default.setApiKey(config_1.default.get('SG_API_KEY'));
const sendEmail = (email, firstName) => __awaiter(void 0, void 0, void 0, function* () {
    let randomstring = Math.random().toString(36).slice(-8);
    const msg = {
        to: email,
        from: 'devasaikia.mca@gmail.com',
        subject: 'Password',
        text: `Hello ${firstName}`,
        html: `<b>Your password is ${randomstring}</b>`,
    };
    try {
        yield mail_1.default.send(msg);
        return randomstring;
    }
    catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
});
exports.sendEmail = sendEmail;
