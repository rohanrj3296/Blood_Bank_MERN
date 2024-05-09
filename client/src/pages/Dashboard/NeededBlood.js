import React, { useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import "./NeededBlood.css"; // Import CSS file for custom styling

const NeededBlood = () => {
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to store the needed blood data
      const response = await API.post("/path/to/store/needed-blood", {
        bloodType,
        quantity,
      });
      if (response.data.success) {
        // Data stored successfully, perform any additional actions if needed
        // Redirect or display success message, etc.
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error submitting form. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="needed-blood-container">
        <h1 className="title">Request Blood</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="bloodType" className="form-label">
              Blood Type
            </label>
            <select
              id="bloodType"
              className="form-control"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required
            >
              <option value="">Select Blood Type</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="form-label">
              Quantity (in ML)
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default NeededBlood;
