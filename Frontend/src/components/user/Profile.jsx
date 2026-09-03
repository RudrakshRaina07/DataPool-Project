import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
        <div className='bg-[#090040] min-h-screen text-white flex flex-col items-center overflow'>
            <Navbar />
            <div className='bg-[#471396] min-h-screen w-[95%] rounded-xl m-4 p-6 overflow'>
                <div className="flex justify-between items-center mb-10">
                  <div className=""> 
                    <div className=""></div>

                    <div className="capitalize py-4 flex gap-10 items-center">
                      <h3 className="text-2xl font-bold ">{userDetails.username}</h3>
                      <button className=" cursor-pointer bg-green-600 active:scale-95 hover:bg-green-800 text-black px-6 py-3 rounded-full font-semibold">Follow</button>
                    </div>

                    <div className="flex gap-10">
                      <p>10 Follower</p>
                      <p>3 Following</p>
                    </div>
                  </div>
                  <div className="h-10 px-10">
                    <button className="px-8 py-4 bg-indigo-500 rounded-full font-semibold text-lg active:scale-95 hover:bg-indigo-600 cursor-pointer">Star Repositories</button>
                  </div>
                </div>

                <div className="mt-66">
                  <HeatMapProfile />
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    setCurrentUser(null);

                    window.location.href = "/auth";
                  }}
                  className="absolute bottom-0 right-28 bg-red-800 active:scale-95 hover:bg-red-900 px-6 py-3 cursor-pointer rounded-full"
                >
                  Logout
              </button>
            </div>
        </div>
  );
};

export default Profile;