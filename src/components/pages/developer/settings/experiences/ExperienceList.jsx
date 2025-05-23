import React from "react";

import { FaPlus } from "react-icons/fa";

import * as Yup from "yup";
import Header from "../../../../partials/Header";
import Navigation from "../../Navigation";

import Footer from "../../../../partials/Footer";
import ExperienceListTable from "./ExperiencesListTable";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import ModalAddSettingsExperience from "./ModalAddSettingsExperiences";

const ExperienceList = () => {
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isModalExperience, setIsModalExperience] = React.useState(false);

  const handleAdd = () => {
    setItemEdit(null);
    setIsModalExperience(true);
  };

  const currentMenu = location.pathname.startsWith("/experience")
    ? "/experience-list"
    : "";

  return (
    <>
      <Header />

      <Navigation menu="experience" />

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
          <h2 className="text-base">Experience</h2>
          <div className="pt-3">
            <ExperienceListTable
              setItemEdit={setItemEdit}
              setIsModal={setIsModalExperience}
            />
          </div>
        </div>

        {/*FOOTER*/}
        <Footer />

        {isModalExperience && (
          <ModalAddSettingsExperience
            itemEdit={itemEdit}
            setIsModal={setIsModalExperience}
          />
        )}
      </div>
    </>
  );
};

export default ExperienceList;
