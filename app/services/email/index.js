const nodemailer = require('nodemailer');
const { gmail, password } = require('../../config');
const Mustache = require('mustache');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: gmail,
        pass: password,
    },
});

const otpMail = async(email, data) => {
    try {
        let template = fs.readFileSync('app/views/email/otp.html', 'utf8');

        let message = {
            from: gmail,
            to: email,
            subject: 'Otp for registration is: ',
            html: Mustache.render(template, data),
            //Mustache is used for html rendered
        };

        return await transporter.sendMail(message);
    } catch (ex) {
        console.log(ex);
    }
};
const invoiceMail = async(email, data) => {
    try {
        let template = fs.readFileSync('app/views/email/invoice.html', 'utf8');

        let message = {
            from: gmail,
            to: email,
            subject: 'Invoice for registration is: ',
            html: Mustache.render(template, data),
            //Mustache is used for html rendered
        };

        return await transporter.sendMail(message);
    } catch (ex) {
        console.log(ex);
    }
};

module.exports = { otpMail, invoiceMail };