import React from "react";
import FtcLogoHeader from "../../assets/svg/FtcLogoHeader";
import { StoreContext } from "../../../store/StoreContext";
import ModalSuccess from "./modal/ModalSuccess";
import ModalError from "./modal/ModalError";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  console.log(store.message, store.error, store.success);
  return (
    <>
      <div className="flex items-center justify-between h-16 border-solid border-b-2 border-black px-2">
        <div className="">
          <FtcLogoHeader />
        </div>

        <div>
          <div className="rounded-full bg-[#3E9BD0]  flex items-center justify-center min-h-[2rem] h-[2rem] max-w-[2rem] w-[2rem] pt-px text-white">
            <span className="block">R</span>
            <span className="block">V</span>
          </div>
        </div>
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Header;
