import React, { useEffect, useState } from "react";
import movie from "../assets/movie-logo.png";
import { FaUser } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { navigation } from "../constant";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join("");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  console.log({ location });

  useEffect(() => {
    if (searchInput.trim()) {
      // Check if there is any search input
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <div className="ml-10">
          <img src={movie} alt="logo" width={66} className="bg-black" />
        </div>
        <nav className=" hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav) => {
            return (
              <NavLink
                key={nav.label}
                to={nav.href}
                className={({ isActive }) =>
                  `px-3 hover:text-orange-100 ${
                    isActive ? "text-orange-400" : ""
                  }`
                }
              >
                {nav.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-4 mr-10">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button>
              <FaSearch className="w-10 h-7" />
            </button>
          </form>
          <div className=" cursor-pointer active:scale-50 transition-all">
            <FaUser className="w-10 h-7" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
