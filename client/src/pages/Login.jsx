import React, { useState } from "react";
import axios from "axios";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "./particles"; // Import the Particles component
axios.defaults.withCredentials = true;

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [loginInput, setLoginInput] = useState(defaultValues);
  const navigate = useNavigate();

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/user/login", {
        email: loginInput.email,
        password: loginInput.password,
      });
      navigate("/");
      toast.success("Logged in Successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  //handle on change event function
  const handleOnChange = (e) => {
    setLoginInput((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center align-center min-h-screen">
      {/* Background with Particles */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#1a1a1a] to-[#333333]">
        <Particles />
      </div>

      {/* Login Form */}
      <div className="relative z-10 px-8 py-6 mt-24 text-left bg-white shadow-lg rounded-lg max-w-md w-80">
        <h3 className="text-2xl font-bold text-center mb-4">Login Page</h3>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md"
              type="email"
              placeholder="Email"
              required
              name="email"
              value={loginInput.email}
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
              value={loginInput.password}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Login
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
