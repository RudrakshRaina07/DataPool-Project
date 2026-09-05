import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

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
            `http://localhost:3000/userProfile/${profileUserId}`
          );
          setUserDetails(response.data);

          const alreadyFollowing = response.data.followedUsers?.some(
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
      await axios.post(`http://localhost:3000/follow/${profileUserId}`,
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
      console.error("Error following user: ", error.response?.data || error.message)
    }
  }

  const handleUnfollow = async () => {
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:3000/unfollow/${profileUserId}`, 
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
      console.error("Error unfollowing user: ", error.response?.data || error.message)
    }
  }

  return (
        <div className='bg-[#090040] min-h-screen text-white flex flex-col items-center overflow'>
            <Navbar />
            <div className='bg-[#471396] min-h-screen w-[95%] rounded-xl m-4 p-6 overflow'>
                <div className="flex justify-between items-center mb-10">
                  <div className="">

                    <div className="capitalize py-4 flex gap-10 items-center">
                      <h3 className="text-2xl font-bold ">{userDetails.username}</h3>
                      {userId !== profileUserId && (
                        <button 
                          onClick={isFollowing ? handleUnfollow : handleFollow}
                          className=" cursor-pointer bg-green-600 active:scale-95 hover:bg-green-800 text-black px-6 py-3 rounded-full font-semibold">
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      )}

                    </div>

                    <div className="flex gap-10">
                      <p>{userDetails.followers?.length || 0} Follower</p>
                      <p>{userDetails.followedUsers?.length || 0} Following</p>
                    </div>
                  </div>
                  <div className="h-10 px-10">
                    <button 
                      className="px-8 py-4 bg-indigo-500 rounded-full font-semibold text-lg active:scale-95 hover:bg-indigo-600 cursor-pointer"
                      onClick={()=>{
                        navigate('/profile/starred')
                      }}
                      >
                        Star Repositories
                      </button>
                  </div>
                </div>

                <div className="mt-66">
                  <HeatMapProfile />
                </div>

                {profileUserId === userId && (
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
                )}
            </div>
        </div>
  );
};

export default Profile;