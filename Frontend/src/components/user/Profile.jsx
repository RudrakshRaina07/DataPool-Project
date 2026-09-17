import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
import BackButton from "../backButton";
import API_URL from "../../api";

const Profile = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const [isFollowing, setIsFollowing] = useState(false)
  const { setCurrentUser } = useAuth();
  const userId = localStorage.getItem("userId")

  const profileUserId = id || userId

  useEffect(() => {
    const fetchUserDetails = async () => {

      if (profileUserId) {
        try {
          const response = await axios.get(
            `${API_URL}/userProfile/${profileUserId}`
          );
          setUserDetails(response.data);

          const alreadyFollowing = response.data.followers?.some(
            (user) => user._id === userId
          )

          setIsFollowing(alreadyFollowing || false)

        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, [profileUserId, userId]);

  const handleFollow = async () => {
    const token = localStorage.getItem("token")

    try {
      await axios.post(`${API_URL}/follow/${profileUserId}`,
        {},
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      setIsFollowing(true)

      setUserDetails((prev) => ({
        ...prev,
        followers: [
          ...(prev.followers || []),
          {_id: userId}
        ]
      }))

    } catch (error) {
      if(error.response?.status === 401){
        localStorage.removeItem("userId")
        localStorage.removeItem("token")

        navigate("/auth")
        return;
      }

      console.error("Error following user: ", error.response?.data || error.message)
    }
  }

  const handleUnfollow = async () => {
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`${API_URL}/unfollow/${profileUserId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setIsFollowing(false)

      setUserDetails((prev) =>  ({
        ...prev,
        followers: (prev.followers || []).filter(
          (user) => user._id !== userId
        )
      }))

    } catch (error) {
      if(error.response?.status === 401){
        localStorage.removeItem("userId")
        localStorage.removeItem("token")

        navigate("/auth")
        return;
      }

      console.error("Error unfollowing user: ", error.response?.data || error.message)
    }
  }

  return (
        <div className='bg-[#090040] min-h-screen text-white flex flex-col items-center'>
            <Navbar />
            <div className='bg-[#471396] min-h-screen w-[95%] rounded-xl m-4 p-6'>
              <BackButton/>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">
                  <div className="w-full">
                    <div className="capitalize py-4 flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center">
                      <h3 className="text-2xl font-bold wrap-break-word">{userDetails.username}</h3>
                      {userId !== profileUserId && (
                        <button 
                          onClick={isFollowing ? handleUnfollow : handleFollow}
                          className= "cursor-pointer bg-green-600 active:scale-95 hover:bg-green-700 text-black px-6 py-3 rounded-full font-semibold w-full sm:w-auto transition">
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      )}

                    </div>

                    <div className="flex gap-6 sm:gap-10 text-sm sm:text-base">
                      <p>{userDetails.followers?.length || 0} Follower</p>
                      <p>{userDetails.followedUsers?.length || 0} Following</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-auto">
                    <button 
                      className="px-8 py-4 w-full lg:w-auto bg-indigo-500 rounded-full font-semibold text-lg active:scale-95 hover:bg-indigo-600 cursor-pointer transition"
                      onClick={()=>{
                        navigate(`/profile/${profileUserId}/starred`)
                      }}
                      >
                        Star Repositories
                      </button>
                  </div>
                </div>

                <div className="mt-10 sm:mt-16 lg:mt-20 w-full overflow-hidden">
                  <HeatMapProfile userId={profileUserId} />
                </div>

                {profileUserId === userId && (
                  <div className="flex justify-end mt-10">
                    <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("userId");
                          setCurrentUser(null);

                          window.location.href = "/auth";
                        }}
                        className=" bg-red-800 active:scale-95 hover:bg-red-900 px-6 py-3 cursor-pointer rounded-full font-medium transition"
                      >
                        Logout
                    </button>
                  </div>
                )}
            </div>
        </div>
  );
};

export default Profile;