const OTP = require("./model")
const sendEmail = require("./../../util/sendEmail")
const generateOTP = require("./../../util/generateOTP");
const {AUTH_EMAIL}= process.env;
const sendOTP = async({email,subject,message,duration=0.15})=>{
    try{
        if (!(email && subject && message)){
            throw Error("Provide valus for email, subject,message");
        }

        //clear any old record of otp
        await OTP.deleteOne({email});

        //generate otp
        const generateOTP = await generateOTP();

        //send email
        const mailOptions = {
            from : AUTH_EMAIL,
            to:email,
            subject,
            html:`<P> ${message}</P <p>${generateOTP}</p> <p>expires in ${duration} hours</p>`,

        };
        await sendEmail(mailOptions)

        //save otp record in database
        const newOTP = await new OTP({
            email,
            otp:generateOTP,
            createdAt:Date.now(),
            expiredAt:Date.now()+3600000+duration,


        });
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;

    }catch(error){
        throw error;

    }
};
module.exports = {sendOTP}