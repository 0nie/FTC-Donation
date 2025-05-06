import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BreadCrumbs = ({ param = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((item) => item !== "")
    .map((item, key) => {
      currentLink +=`/${item}`;
      return (
        <li
          className={`text-primary after:mr-2 after:content-['>'] last:after:hidden last:text-black last:pointer-events-none ${
            (item === "settings" || item === "reports") && "pointers-event-none"
          }`}
          key={key}>
            <Link to={`${item === 'settings' || item === 'reports' ? "" : `${currentLink}${param}`}`} className="mr-2 hover:text-primary">
                {item.replace("-", "")}
            </Link>
          </li>
      );
    });

  return (
    <div className="flex items-center gap-x-3 pt-2">
      <button type='button'>
        <FaArrowLeft className='h-4 w-4' />
      </button>

      <ul className="flex items-center cursor-pointer text-[10px]">
        {crumbs.length === 1 ? "" : crumbs}
      </ul>
       
    </div>
  );
};

export default BreadCrumbs;