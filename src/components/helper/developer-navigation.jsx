import { BsPersonWorkspace } from "react-icons/bs";
import {
  FaCogs,
  FaCommentDots,
  FaHandHoldingHeart,
  FaList,
  FaUserCircle,
} from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { GiBrain } from "react-icons/gi";
import { MdDesignServices, MdSpaceDashboard } from "react-icons/md";
import { SiAboutdotme, SiCountingworkspro } from "react-icons/si";

export const developerNavigation = [
  {
    name: "dash board",
    code: "dash-board",
    link: "/dash-board",
    icon: <MdSpaceDashboard />,
  },
  {
    name: "about",
    code: "/about",
    link: "/about",
    icon: <FaUserCircle />,
  },
  {
    name: "recent works",
    code: "/recent-works",
    link: "/recent-works",
    icon: <SiCountingworkspro />,
  },
  {
    name: "testimonials",
    code: "/testimonials",
    link: "/testimonials",
    icon: <FaCommentDots />,
  },
  {
    name: "experience",
    code: "/experience",
    link: "/experience",
    icon: <GiBrain />,
  },
  {
    name: "services",
    code: "/services",
    link: "/services",
    icon: <MdDesignServices />,
  },
  {
    name: "Settings",
    code: "settings",
    icon: <FaCogs />,
    isDropdown: true,
    subMenu: [
      {
        name: "My Experience",
        code: "my-experience",
        link: "/settings/my-experience",
      },
      {
        name: "My Service",
        code: "my-service",
        link: "/settings/my-service",
      },
    ],
  },
];
