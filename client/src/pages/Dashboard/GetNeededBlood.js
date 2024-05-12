import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";

const GetNeededBlood = () => {
  const [organisations, setOrganisations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const bloodGroup = sessionStorage.getItem("bloodGroup");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem("responseObject");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setOrganisations(parsedData);
      if (parsedData.length === 0) {
        setErrorMessage("No organisations found.");
        setTimeout(() => {
          navigate("/request-blood");
        }, 3000);
      } else {
        setErrorMessage("");
      }
    }
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
                <th scope="col">Quantity</th>
                <th scope="col">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {organisations.map((organisation) => (
                <tr key={organisation._id}>
                  <td>{organisation.organisationName}</td>
                  <td>{organisation.bloodAvailability[bloodGroup]}</td>
                  <td>
                    {moment(organisation.updatedAt).format(
                      "DD/MM/YYYY hh:mm A"
                    )}
                  </td>
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
