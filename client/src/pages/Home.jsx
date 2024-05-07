import React, { useState, useEffect } from "react";
import { handleError } from "../utils/handleError";
import axios from "axios";
import GuestView from "./GestView";
import Whiteboard from "./WhiteBoard";
axios.defaults.withCredentials = true;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/my-details");
        setIsLoggedIn(true);
        setUserData(response.data.user);
        setShowPopup(true);
      } catch (error) {
        setIsLoggedIn(false);
        setUserData(null);
        handleError(error);
      }
    };
    checkLoginStatus();
  }, []);


  const Popup = ({ username }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Welcome, {username}!</h2>
          <p className="text-gray-600">You can now access features specific to logged-in users.</p>
          <button
            className="mt-4 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setShowPopup(false)}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
    className={`h-screen ${
      isLoggedIn ? 'bg-white' : 'bg-gradient-to-r from-[#1a1a1a] to-[#333333]'
    } relative`}
  >
      {isLoggedIn && showPopup && <Popup username={userData?.username} />}
      {isLoggedIn && !showPopup &&  <Whiteboard /> }
      {!isLoggedIn && <GuestView />}
    </div>
  );
}

 