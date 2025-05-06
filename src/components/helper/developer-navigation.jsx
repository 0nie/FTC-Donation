import { FaCogs, FaHandHoldingHeart, FaList } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";

export const developerNavigation = [
    {
        name : "Donor",
        code : "donor",
        link : "/donor",
        icon : <FaHandHoldingHeart/>
    },
    {
        name : "Children List",
        code : "/children-list",
        link : "/children-list",
        icon : <FaChildren/>
    },
    {
        name : "Reports",
        code : "reports",
        link : "/reports",
        icon : <FaList/>,
        isDropdown : true,
        subMenu : [
            {
                name : "donation",
                code : "donation",
                link : "/donation",
            },
        ]
    },
    {
        name : "Settings",
        code : "settings",
        icon : <FaCogs/>,
        isDropdown : true,
        subMenu : [
            {
                name : "users",
                code : "users",
                link : "/users",
            },
            {
                name : "general",
                code : "general",
                link : "/general",
            },
            {
                name : "category",
                code : "category",
                link : "/category",
            },
            {
                name : "designation",
                code : "designation",
                link : "/designation",
            },
            {
                name : "notifications",
                code : "notifications",
                link : "/notifications",
            },
            {
                name : "maintenance",
                code : "maintenance",
                link : "/maintenance",
            },


        ]
    },
] 