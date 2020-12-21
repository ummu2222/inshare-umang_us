// to send email we will use node mailer
// install node mailer ---> yarn add nodemailer

const nodemailer = require('nodemailer');

async function sendMail({from, to, subject ,text , html }){

    let transporter = nodemailer.createTransport({
        
        host: process.env.SMTP_HOST ,
        port : process.env.SMTP_PORT,
        secure : false, 

        auth: {
            user : process.env.MAIL_USER ,
            pass :process.env.MAIL_PASS
        }

    });
    
    // sending mail
    // sendMail is method of node mailer

    let info = await transporter.sendMail({
        from: `inshare <${from}>`, // or from: from , 
        to,
        subject,
        text,
        html 
    });

    // in js if key and values are same then you can write only key
}


module.exports = sendMail;