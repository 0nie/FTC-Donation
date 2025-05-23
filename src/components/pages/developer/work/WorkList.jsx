import React from "react";

import { FaPlus } from "react-icons/fa";

import * as Yup from "yup";

import Header from "../../../partials/Header";
import Navigation from "../Navigation";
import Footer from "../../../partials/Footer";
import BreadCrumbs from "../../../partials/BreadCrumbs";

import ModalAddSettingsWork from "./ModalAddSettingsWork";
import WorkListTable from "./WorkListTable";

const WorkList = () => {
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isModalWork, setIsModalWork] = React.useState(false);

  const handleAdd = () => {
    setItemEdit(null);
    setIsModalWork(true);
  };

  const currentMenu = location.pathname.startsWith("/work") ? "/work-list" : "";

  return (
    <>
      <Header />

      <Navigation menu="work" />

      <div className="wrapper">
        {/*BREADCRUMBS OR ADD BUTTON*/}

        <div className="flex items-center justify-between py-2">
          <BreadCrumbs param={location.search} />

          <button
            type="button"
            className="flex items-center gap-x-1 text-primary hover:underline text-sm"
            onClick={handleAdd}
          >
            <FaPlus />
            <span>Add</span>
          </button>
        </div>

        {/*CONTENT*/}
        <div className="pb-8">
          <h2 className="text-base">Work</h2>
          <div className="pt-3">
            <WorkListTable
              setItemEdit={setItemEdit}
              setIsModal={setIsModalWork}
            />
          </div>
        </div>

        {/*FOOTER*/}
        <Footer />

        {isModalWork && (
          <ModalAddSettingsWork
            itemEdit={itemEdit}
            setIsModal={setIsModalWork}
          />
        )}
      </div>
    </>
  );
};

export default WorkList;
