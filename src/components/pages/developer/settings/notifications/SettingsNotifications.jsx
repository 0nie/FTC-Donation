import React from "react";
import Header from "../../../../partials/Header";
import Navigation from "../Navigation";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import { FaPlus } from "react-icons/fa";
import SettingsNotificationsList from "./SettingsNotificationsList";
import ModalAddSettingsNotifications from "./ModalAddSettingsNotifications";

const SettingsNotifications = () => {
  const [isModalNotifications, setIsModalNotifications] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    setItemEdit(null);
    setIsModalNotifications(true);
  };

  return (
    <>
      <Header />
      <Navigation menu="settings" subMenu="notifications" />
      <div className="wrapper">
        {/* BREADCRUMBS OR ADD BUTTON */}
        <div className="flex items-center justify-between">
          <BreadCrumbs />
          <button
            type="button"
            className="flex items-center gap-x-3 text-primary hover:underline text-sm"
            onClick={handleAdd}
          >
            <FaPlus />
            <span>Add</span>
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="pb-8">
          <h2>Notifications</h2>
          <div className="pt-3">
            <SettingsNotificationsList
              setItemEdit={setItemEdit}
              setIsModal={setIsModalNotifications}
            />
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>

      {isModalNotifications && (
        <ModalAddSettingsNotifications
          itemEdit={itemEdit}
          setIsModal={setIsModalNotifications}
        />
      )}
    </>
  );
};

export default SettingsNotifications;
