import React, { useState, useEffect } from "react";
import { handleError } from "../utils/handleError";
import axios from "axios";
import Particles from "./particles";
import {Link} from "react-router-dom";
axios.defaults.withCredentials = true;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/my-details");
      setIsLoggedIn(true);
      setUserData(response.data.user);
      setShowPopup(true); // Show the pop-up after successful login
    } catch (error) {
      if (error.response.status === 401) {
        setIsLoggedIn(false);
      }
      handleError(error);
    }
  };

  const handleProfileClick = () => {
    setShowPopup(false); // Close the pop-up on "Continue" click
  };

  useEffect(() => {
    // Fetch user details only after the component mounts (avoid premature fetching)
    getUserDetails();
  }, []);

  const Popup = ({ username }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Welcome, {username}!</h2>
          <p className="text-gray-600">You can now access features specific to logged-in users.</p>
          <button
            className="mt-4 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={handleProfileClick}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  return (
  <div className="h-screen bg-gradient-to-r from-[#1a1a1a] to-[#333333] relative">
  {isLoggedIn && showPopup && <Popup username={userData.username} />}
  {isLoggedIn && !showPopup && (
    <h1 className="text-4xl text-white">Welcome, {userData.username}!</h1>
  )}
  {!isLoggedIn && (
    <div className="relative max-w-6xl min-h-screen px-4 mx-auto sm:px-6 flex flex-col items-center justify-center">
    <Particles />
    <div className="pt-32 pb-16 md:pt-52 md:pb-32 text-center">
    <div className="mb-6">
  <div className="relative inline-flex before:absolute before:inset-0">
    <Link
      className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200 rounded-full py-2 px-4 transition duration-150 ease-in-out"
      to="https://github.com/HimanshuSinghBhandari/WhiteBoard"
      target="_blank"
    >
      <span className="relative inline-flex items-center">Whiteboard is Open Source</span>
    </Link>
  </div>
</div>
      <h1 className="pb-4 font-extrabold text-3xl sm:text-5xl md:text-3xl lg:text-7xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60">
        Digital whiteboard
        <span className="text-lg sm:text-2xl md:text-xl lg:text-2xl block">Visualize your thoughts and ideas</span>
      </h1>
      <p className="mb-8 text-lg text-zinc-300 animate-fade">
        <span className="inline-block px-2 py-1  rounded-md">
          Draw your ideas
        </span>
      </p>
    </div>
  </div>
  
  )}
</div>
  );
}
