import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

axios.defaults.withCredentials = true;

const navItems = ["Updates", "How it works", "FAQs", "Contact"];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("http://localhost:4000/user/my-details");
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <motion.header
      className="absolute z-30 w-full bg-transparent"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl px-4 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className="text-white text-2xl font-bold sm:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaBars />
            </button>
            <Link
              to="/"
              className="text-2xl font-bold text-white hidden sm:block"
            >
              white board
            </Link>
          </motion.div>

          <nav className="hidden sm:flex-grow sm:flex sm:justify-center">
            <motion.div 
              className="bg-black bg-opacity-30 rounded-3xl px-7 py-3 backdrop-blur-sm inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <ul className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '-').replace(' ','-')}`}
                      className="text-lg font-medium text-white hover:text-gray-400 transition duration-300"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </nav>

          <motion.div
            className="flex items-center sm:hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/login"
              className="px-4 py-2 text-lg font-medium text-white bg-black bg-opacity-30 rounded-3xl backdrop-blur-sm hover:bg-opacity-75 transition duration-300"
            >
              Login
            </Link>
          </motion.div>

          <motion.div
            className="hidden sm:flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/login"
              className="px-4 py-2 text-lg font-medium text-white bg-black bg-opacity-30 rounded-3xl backdrop-blur-sm hover:bg-opacity-75 transition duration-300"
            >
              Login
            </Link>
          </motion.div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-5 right-5 text-white text-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes />
            </button>
            <ul className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-').replace(' ','-')}`}
                    className="text-2xl font-medium text-white hover:text-gray-400 transition duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
