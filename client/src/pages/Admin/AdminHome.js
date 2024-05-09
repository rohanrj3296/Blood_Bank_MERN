import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1 className="mb-4">
            Welcome Admin{" "}
            <span className="text-danger">{user?.name}</span>
          </h1>
          <h3 className="mb-3">Manage Blood Bank App</h3>
          <hr />
          <p>
            Welcome to the Admin dashboard of the Blood Bank App. Here you can
            manage blood donations, view donor information, and oversee the
            operations of the blood bank.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
