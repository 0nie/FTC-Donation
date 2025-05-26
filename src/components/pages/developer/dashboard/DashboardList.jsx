import React from "react";

import { FaPlus } from "react-icons/fa";

import * as Yup from "yup";

import Navigation from "../Navigation";
import Footer from "../../../partials/Footer";
import BreadCrumbs from "../../../partials/BreadCrumbs";

import DashboardListTable from "./DashboardListTable";
import Header from "../../../partials/Header";

const DashboardList = () => {
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isModalDashboard, setIsModalDashboard] = React.useState(false);

  const handleAdd = () => {
    setItemEdit(null);
    setIsModalDashboard(true);
  };

  const currentMenu = location.pathname.startsWith("/dashboard")
    ? "/dashboard-list"
    : "";

  return (
    <>
      <Header />

      <Navigation menu="dashboard" />

      <div className="wrapper">
        {/*BREADCRUMBS OR ADD BUTTON*/}

        {/*CONTENT*/}
        <div className="pb-8">
          <div className="pt-3">
            <DashboardListTable
              setItemEdit={setItemEdit}
              setIsModal={setIsModalDashboard}
            />
          </div>
        </div>

        {/*FOOTER*/}
        <Footer />
      </div>
    </>
  );
};

export default DashboardList;
