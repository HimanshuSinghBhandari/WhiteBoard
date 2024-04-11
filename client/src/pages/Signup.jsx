import React, { useState } from "react";
import axios from "axios";
import { handleError } from "../utils/handleError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Particles from "./particles"; // Import the Particles component
axios.defaults.withCredentials = true;

const defaultValues = {
  email: "",
  username: "",
  password: "",
};

export default function Signup() {
  const [signupInput, setSignupInput] = useState(defaultValues);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/user/signup", {
        email: signupInput.email,
        password: signupInput.password,
        username: signupInput.username,
      });
      navigate("/login");
      toast.success("User Created Successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  //handle on change event function
  const handleOnChange = (e) => {
    setSignupInput((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Background with Particles */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#1a1a1a] to-[#333333] ">
        <Particles />
      </div>

      {/* Signup Form */}
      <div className="relative z-10 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg max-w-md w-80">
        <h3 className="text-2xl font-bold text-center mb-4">Signup Page</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md"
              type="text"
              placeholder="Username"
              required
              name="username"
              value={signupInput.username}
              onChange={handleOnChange}
            />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md"
              placeholder="Email"
              required
              name="email"
              value={signupInput.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md"
              type="password"
              placeholder="Password"
              required
              name="password"
              value={signupInput.password}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex items-baseline justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="my-custom-toast-container"
      />
    </div>
  );
}
