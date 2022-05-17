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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (email, firstName) => __awaiter(void 0, void 0, void 0, function* () {
    var randomstring = Math.random().toString(36).slice(-8);
    // const transport = nodemailer.createTransport(
    //     nodemailerSendgrid({
    //         apiKey: config.get('SG_API_KEY')
    //     })
    // );
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: 'devasaikia.code@gmail.com',
            pass: 'saikia123', // generated ethereal password
        },
    });
    try {
        let info = yield transporter.sendMail({
            from: 'devasaikia.code@gmail.com',
            to: email,
            subject: `temporary password`,
            text: `Hello ${firstName}, 
                Your temporary password is : ${randomstring}`,
            html: `Hello ${firstName}, 
                    Your temporary password is : ${randomstring}`
        });
        // send mail with defined transport object
        // const mail = await transport.sendMail({
        //     from: 'saikiadeva12@outlook.com', // sender address
        //     to: email, // list of receivers
        //     subject: `Hello ${firstName}`, // Subject line
        //     html: `<b>Your password is ${randomstring}</b>`, // html body
        // });
        if (!info)
            throw new Error('Email not sent');
        return randomstring;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.sendEmail = sendEmail;
