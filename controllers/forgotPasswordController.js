const bcrypt = require("bcryptjs");
const OTP = require("../models/OTP");
const sendEmail = require("./sendEmail");

const generateOTP = async () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const emailGenerationController = async (req, res) => {
  const email = req.body.email;
  console.log(email, "recieved email. now generating");
  let generatedOTP = await generateOTP();
  generatedOTP = String(generatedOTP);
  const subject = "Email Verification";
  const message = "Your OTP code is:";
  const duration = 1;
  const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    await OTP.deleteOne({ email });
    const mailOptions = {
      from: "youremailid@hotmail.com",
      to: email,
      subject: subject,
      html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"
    <b>${generatedOTP}</b></p>
    <p> This code<b> expires in ${duration} hour(s)</b></p>`,
    };
    await sendEmail(mailOptions);
    const hashedOTP = await bcrypt.hash(generatedOTP, 10);
    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });
    await newOTP.save();
  };
  const createdOTP = await sendOTP({
    email,
    subject,
    message,
    duration,
  });
  res.status(200).json(createdOTP);
};

const otpVerificationController = async (req, res) => {
  const email = req.body.email;
  console.log(email, req.body.otp);
  const matchedOTPRecord = await OTP.findOne({ email });
  if (!matchedOTPRecord) {
    console.log("NO OTP FOUND");
    return res.status(200).json({ valid: "NO EMAIL FOUND FOR OTP" });
  }
  const { expiresAt } = matchedOTPRecord;
  if (expiresAt < Date.now()) {
    await OTP.deleteOne({ email });
    console.log("OTP Expired");
  }
  const hashedOTP = matchedOTPRecord.otp;
  const validOTP = await bcrypt.compare(String(req.body.otp), hashedOTP);
  if (validOTP) {
    return res.status(200).json({ valid: true });
  } else {
    return res.status(200).json({ valid: false });
  }
};

module.exports = { emailGenerationController, otpVerificationController };
