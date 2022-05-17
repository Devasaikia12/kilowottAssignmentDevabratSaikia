import nodemailer from 'nodemailer'
import nodemailerSendgrid  from 'nodemailer-sendgrid'
import config from 'config'

export const sendEmail = async(email :string,firstName:string)=>{

    var randomstring = Math.random().toString(36).slice(-8);
    // const transport = nodemailer.createTransport(
    //     nodemailerSendgrid({
    //         apiKey: config.get('SG_API_KEY')
    //     })
    // );
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'devasaikia.code@gmail.com', // generated ethereal user
          pass: 'saikia123', // generated ethereal password
        },
    });

    try {
        let info = await transporter.sendMail({
            from: 'devasaikia.code@gmail.com', // sender address
            to: email, // list of receivers
            subject: `temporary password`, // Subject line
            text: `Hello ${firstName}, 
                Your temporary password is : ${randomstring}`, // plain text body
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

        if(!info) throw new Error('Email not sent')
        return randomstring;
    } catch (error:any) {
        throw new Error(error.message)
    }
}



