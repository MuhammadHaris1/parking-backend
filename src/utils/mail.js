
const createError = require('http-errors')
const nodemailer = require("nodemailer");

module.exports = {
    async sendMail(to, subject, text, html) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "mh4055718@gmail.com", 
                pass: "iamharisansari",
            },
        });


        let info = await transporter.sendMail({
            from: '"Parking App" <foo@example.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });

    }
}