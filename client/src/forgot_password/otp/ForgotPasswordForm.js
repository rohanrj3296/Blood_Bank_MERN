import React, { useState } from "react";
import "./forgotPasswordForm.css"; // Import the CSS file

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, such as sending a request to your backend
    console.log("Email:", email);
    console.log("Role:", role);
    // Reset form fields after submission if needed
    setEmail("");
    setRole("");
  };

  return (
    <div className="forgot-password-form-container">
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
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="donar">Donor</option>
            <option value="admin">Admin</option>
            <option value="hospital">Hospital</option>
            <option value="organisation">Organisation</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
