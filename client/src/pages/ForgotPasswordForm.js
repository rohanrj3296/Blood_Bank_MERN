import React, { useState } from "react";
import API from "../services/API";
import "./forgotPasswordForm.css"; // Import the CSS file
import success from "./successv.png";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [otp, setOTP] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here, such as sending a request to your backend
    try {
      const { data } = await API.post("/forgotPassword/sendOTP", {
        email: email,
      });
      if (data?.success) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Email:", email);
    setShowForm(false);
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/forgotPassword/verifyOTP", {
        otp: otp,
        email: "narayanashankara108@gmail.com",
      });
      console.log("data incoming", data);
      if (data.valid === true) {
        const imgc = document.getElementById("imgcontainer");
        imgc.style.display = "block";
        const replacementContent = document.getElementById("form2");
        replacementContent.style.display = "none";
        const replacementContent2 = document.getElementById("heading2");
        replacementContent2.style.display = "none";
      } else {
        alert("WRONG OTP");
      }
    } catch (error) {
      console.log(error);
    }
    setOTP("");
    setEmail("");
  };

  return (
    <div className="forgot-password-form-container">
      {showForm ? (
        <>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          <h2 id="heading2">Enter OTP sent to mail</h2>
          <form onSubmit={handleSubmitOTP} id="form2">
            <div className="form-group">
              <label htmlFor="otpemail">OTP:</label>
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      <div id="imgcontainer" style={{ display: "none" }}>
        <img src={success} className="image" alt="" />
        <p className="verify">OTP VERIFIED</p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
