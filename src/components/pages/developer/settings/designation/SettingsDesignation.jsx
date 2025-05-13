import React from "react";
import Header from "../../../../partials/Header";
import Navigation from "../Navigation";
import Footer from "../../../../partials/Footer"; // Make sure capitalization matches your actual file
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import { FaPlus } from "react-icons/fa";
import ModalAddSettingsDesignation from "./ModalAddSettingsDesignation";
import SettingsDesignationList from "./SettingsDesignationList";

const SettingsDesignation = () => {
  const [isModalDesignation, setIsModalDesignation] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    setItemEdit(null); // Clear any edit state
    setIsModalDesignation(true); // Open modal for "add"
  };

  return (
    <>
      <Header />
      <Navigation menu="settings" subMenu="designation" />
      <div className="wrapper">
        {/* BREADCRUMBS OR ADD BUTTON */}
        <div className="flex items-center justify-between">
          <BreadCrumbs />
          <button
            type="button"
            className="flex items-center gap-x-1 text-primary hover:underline text-sm font-semibold"
            onClick={handleAdd}
          >
            <FaPlus />
            <span>Add</span>
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="pb-8">
          <h2 className="text-base pt-3">Designation</h2>
          <div className="pt-3">
            <SettingsDesignationList
              setItemEdit={setItemEdit}
              setIsModal={setIsModalDesignation}
            />
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>

      {/* MODAL */}
      {isModalDesignation && (
        <ModalAddSettingsDesignation
          itemEdit={itemEdit}
          setIsModal={setIsModalDesignation}
        />
      )}
    </>
  );
};

export default SettingsDesignation;
