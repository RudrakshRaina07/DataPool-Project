import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png"
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-[#090040] text-white h-30 w-full flex justify-between items-center font-semibold p-5 text-xl border-b-2 border-[#FFCC00] ">
      <Link to="/">
        <div className="flex justify-between gap-10 items-center">
          <img 
            className="h-20 w-20 hover:cursor:pointer"
            src={logo}
            alt="Datapool"
          />
          <h3 className="text-3xl hover:cursor-pointer">DataPool</h3>
        </div>
      </Link>
      <div className="flex justify-between gap-10 mr-10">
        <Link to="/create">
          <div className=" px-6 py-3 rounded-full bg-indigo-600 cursor-pointer active:scale-95 hover:bg-indigo-700">
            <p className="font-medium">Create a Repository</p>
          </div>
        </Link>
        <Link to="/allUsers">
          <div className=" px-6 py-3 rounded-full bg-indigo-600 cursor-pointer active:scale-95 hover:bg-indigo-700">
            <p className="hover:cursor-pointer">Users</p>
          </div>
        </Link>
        <Link to="/profile">
          <div className=" px-6 py-3 rounded-full bg-indigo-600 cursor-pointer active:scale-95 hover:bg-indigo-700">
            <p className="hover:cursor-pointer">Profile</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;