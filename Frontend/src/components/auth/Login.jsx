import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import { PageHeader } from "@primer/react/experimental";
import {Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/image.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.token);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-[#090040] items-center text-white ">
      <div className="bg-[#471396] mt-20 p-6 w-[30%]  rounded-2xl flex items-center flex-col">
        <div className="p-4">
          <img className="h-20 w-20" src={logo} alt="Logo" />
        </div>
      <div className="font-medium text-2xl">
          <h2 className="font-semibold mb-10 text-4xl font text-black">Login</h2>
      </div>
        <div className="flex flex-col justify-between gap-7">
          <div>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="border-b w-full font-medium text-lg outline-none"
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
              className="border-b w-full font-medium text-lg outline-none"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="px-5 py-2 rounded-full active:scale-95 cursor-pointer bg-green-600 text-black mg-4"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        <div className="mt-4">
          <p>
            New to DataPool? <Link to="/signup" className="text-green-400">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;