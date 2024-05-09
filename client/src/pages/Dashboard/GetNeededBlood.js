import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const GetNeededBlood = () => {
  const [organisations, setOrganisations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch organisations with available blood
  const fetchOrganisationsWithBlood = async () => {
    try {
      // Make API call to get organisations with available blood
      const response = await API.get("/path/to/organisations/with/blood");
      if (response.data.success) {
        setOrganisations(response.data.organisations);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    // Fetch organisations with available blood when component mounts
    fetchOrganisationsWithBlood();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h1>List of Organisations with Available Blood</h1>
        {errorMessage && <p>{errorMessage}</p>}
        {organisations.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Organisation Name</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Quantity</th>
                <th scope="col">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {organisations.map((organisation) => (
                <tr key={organisation._id}>
                  <td>{organisation.name}</td>
                  <td>{organisation.bloodGroup}</td>
                  <td>{organisation.quantity}</td>
                  <td>{moment(organisation.updatedAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>SORRY!! NO ORGANISATION HAS THE BLOOD YOU NEED...</p>
        )}
      </div>
    </Layout>
  );
};

export default GetNeededBlood;
