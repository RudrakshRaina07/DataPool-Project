import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-[#090040] text-white h-30 w-full flex justify-between items-center font-semibold p-5 text-xl border-b-2 border-[#FFCC00] ">
      <Link to="/">
        <div className="flex justify-between gap-10 items-center">
          <img 
            className="h-20 w-20 hover:cursor:pointer"
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          <h3 className="text-3xl hover:cursor-pointer">DataPool</h3>
        </div>
      </Link>
      <div className="flex justify-between gap-10 mr-16">
        <Link to="/create">
          <p className="hover:cursor-pointer">Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p className="hover:cursor-pointer">Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;