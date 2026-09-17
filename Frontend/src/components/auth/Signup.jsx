import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import { PageHeader } from "@primer/react/experimental";
import {Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/image.png";
import { Link } from "react-router-dom";
import API_URL from "../../api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/signup`, {
        email: email,
        password: password,
        username: username,
      });
      console.log("response data:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      console.log("AFTER SET:", localStorage.getItem("token"), localStorage.getItem("userId"));
      setCurrentUser(res.data.token);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-[#090040] items-center text-white px-4 py-8">
      <div className="bg-[#471396] p-6 sm:p-8 w-full max-w-md rounded-2xl flex items-center flex-col shadow-xl">
        <div className="p-4">
          <img className="h-16 w-16 sm:h-20 sm:w-20" src={logo} alt="Logo" />
        </div>
        <div className="text-center mb-8">
          <h2 className="font-semibold text-4xl font text-black">Signup</h2>
        </div>

        <div className="flex flex-col justify-between gap-7">
          <div className="w-full" >
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="border-b w-full py-3 bg-transparent border-gray-400 focus:border-green-400 font-medium text-lg outline-none "
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="w-full">
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="border-b w-full py-3 bg-transparent border-gray-400 focus:border-green-400 font-medium text-lg outline-none "
              placeholder="Enter Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="border-b w-full py-3 bg-transparent border-gray-400 focus:border-green-400 font-medium text-lg outline-none"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="px-5 py-2 w-full sm:w-auto sm:self-center font-medium rounded-full active:scale-95 cursor-pointer bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-black mg-4"
            disabled={loading}
            onClick={handleSignup}
          >
            {loading ? "Loading..." : "Signup"}
          </button>
        </div>

        <div className="mt-6 text-cent text-sm sm:text-base">
          <p>
            Already have an account? <Link to="/auth" className="text-green-400 hover:text-green-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;