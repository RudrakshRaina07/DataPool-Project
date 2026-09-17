import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png"
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-[#090040] text-white w-full flex flex-col sm:flex-row justify-between items-center font-semibold p-4 sm:p-5 text-xl border-b-2 border-[#FFCC00] gap-4 sm:gap-0">
      <Link to="/">
        <div className="flex gap-3 sm:gap-6 items-center">
          <img 
            className="h-14 w-14 sm:h-20 sm:w-20 cursor-pointer"
            src={logo}
            alt="Datapool"
          />
          <h3 className="text-2xl sm:text-3xl cursor-pointer">DataPool</h3>
        </div>
      </Link>
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-5 lg:gap-10 sm:mr-0 lg:mr-10">
        <Link to="/create">
          <div className=" px-6 py-3 sm:px-6 sm:py-3 sm:text-base rounded-full bg-indigo-600 cursor-pointer active:scale-95 hover:bg-indigo-700 whitespace-nowrap">
            <p className="font-medium">Create a Repository</p>
          </div>
        </Link>
        <Link to="/allUsers">
          <div className=" px-6 py-3 sm:px-6 sm:py-3 sm:text-base rounded-full bg-indigo-600 cursor-pointer active:scale-95 hover:bg-indigo-700 whitespace-nowrap">
            <p className="cursor-pointer">Users</p>
          </div>
        </Link>
        <Link to="/profile">
          <div className=" px-6 py-3 sm:px-6 sm:py-3 sm:text-base rounded-full bg-indigo-600 cursor-pointer active:scale-95 hover:bg-indigo-700 whitespace-nowrap">
            <p className="cursor-pointer">Profile</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;