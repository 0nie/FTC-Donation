import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PiCaretDown } from "react-icons/pi";
import { developerNavigation } from "../../helper/developer-navigation";

const Navigation = ({ menu = "", subMenu = "" }) => {
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed overflow-y-auto w-[12rem] uppercase pt-3 bg-[#494947] h-dvh">
      <div className="text-sm text-white flex flex-col justify-between h-full">
        <ul className="text-xs">
          {developerNavigation.map((item, index) => {
            const isDropdownOpen = openDropdown === item.code;
            const isExactMatch = currentPath === item.link;

            // Check if current path matches any of the submenus
            const isSubPathActive =
              item.isDropdown &&
              item.subMenu?.some((subItem) => currentPath === subItem.link);

            const isActive = isExactMatch || isSubPathActive;

            return (
              <li
                key={index}
                className={`${isActive ? "bg-white/10" : "hover:bg-white/10"}`}
                onClick={() => {
                  if (item.isDropdown) {
                    setOpenDropdown(isDropdownOpen ? null : item.code);
                  }
                }}
              >
                <Link
                  to={item.isDropdown ? "#" : item.link}
                  className={`w-full flex items-center px-2 py-1 justify-between gap-x-5 ${
                    isActive ? "text-accent" : "text-white"
                  }`}
                >
                  <span className="flex items-center gap-x-5">
                    {item.icon}
                    {item.name}
                  </span>
                  {item.isDropdown && (
                    <PiCaretDown
                      className={`transition-all duration-300 ${
                        isDropdownOpen || isSubPathActive ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.isDropdown && (isDropdownOpen || isSubPathActive) && (
                  <ul className="bg-[#494947] text-[10px]">
                    {item.subMenu.map((subItem, subIndex) => {
                      const isSubActive = currentPath === subItem.link;

                      return (
                        <li
                          key={subIndex}
                          className="cursor-pointer pl-10 my-0.5"
                        >
                          <Link
                            to={subItem.link}
                            className={`border-l-2 pl-3 hover:border-accent ${
                              isSubActive
                                ? "border-accent text-accent"
                                : "border-transparent text-white"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
