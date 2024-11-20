import { FaHome } from "react-icons/fa";
import { FaTv } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
// import { navigation } from "../constant";
import { FaSearch } from "react-icons/fa";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
  },
  {
    label: "Movies",
    href: "movie",
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <FaHome />,
  },
  {
    label: "TV Shows",
    href: "tv",
    icon: <FaTv />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <MdMovie />,
  },
  {
    label: "Search",
    href: "search",
    icon: <FaSearch />,
  },
];

