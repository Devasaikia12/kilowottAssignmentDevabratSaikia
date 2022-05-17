import sgMail from '@sendgrid/mail';
import config from 'config'

sgMail.setApiKey(config.get('SG_API_KEY'));

export const sendEmail = async(email :string,firstName:string)=>{

    let randomstring = Math.random().toString(36).slice(-8);

    const msg = {
        to: email,
        from: 'devasaikia.mca@gmail.com', // Use the email address or domain you verified above
        subject: 'Password',
        text: `Hello ${firstName}`,
        html: `<b>Your password is ${randomstring}</b>`,
    };

    try {
        await sgMail.send(msg);
        return randomstring;
    } catch (error :any) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    }
}    