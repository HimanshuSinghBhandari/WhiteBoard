import React, { useState, useEffect } from "react";
import { handleError } from "../utils/handleError";
import axios from "axios";
import Particles from "./particles";
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
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Welcome, {username}!</h2>
          <p>You can now access features specific to logged-in users.</p>
          <button
            className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
    <div className="absolute inset-0 flex items-center justify-center">
      <Particles />
    </div>
  )}
</div>
  );
}
