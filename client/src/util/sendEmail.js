const nodemailer = require("nodemailer");

const { AUTH_EMAIL, AUTH_PASS } = process.env;

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
    },
});

// Test transporter
transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to Gmail:", error);
    } else {
        console.log("Connected to Gmail successfully! ready for messages");
        console.log(success);
         
    }
});

const sendEmail = async (mailOptions) =>{
    try{
        await transporter.sendMail(mailOptions);
        return;
    }catch(error){
        throw error;

    }
};
module.exports = sendEmail;