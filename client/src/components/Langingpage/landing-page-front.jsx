import React from "react";
import Particles from "../../pages/particles";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowUp, FaPlay } from "react-icons/fa";

export default function LandingPageFront() {
  return (
    <div className="relative max-w-6xl min-h-screen px-4 mx-auto sm:px-6 flex flex-col items-center justify-center">
      <Particles />
      <div className="pt-32 pb-16 md:pt-52 md:pb-32 text-center">
        <div className="mb-6">
          <motion.div
            className="relative inline-flex before:absolute before:inset-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200 rounded-xl py-2 px-4 transition duration-150 ease-in-out group"
              to="https://github.com/HimanshuSinghBhandari/WhiteBoard"
              target="_blank"
            >
              <span className="relative inline-flex items-center">
                Whiteboard is Open Source
                <FaArrowRight className="ml-2 group-hover:hidden" />
                <FaArrowUp className="ml-2 hidden group-hover:inline" />
              </span>
            </Link>
          </motion.div>
        </div>
        <motion.h1
          className="pb-4 font-extrabold text-3xl sm:text-5xl md:text-3xl lg:text-7xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Digital Whiteboard
          <span className="text-lg sm:text-2xl md:text-xl lg:text-2xl block mt-2">
            Unleash your creativity with our intuitive digital whiteboard.
          </span>
        </motion.h1>
        <motion.p
          className="mb-8 text-lg text-zinc-300 animate-fade max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Bring your ideas to life with powerful drawing tools and real-time sharing.
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <motion.button
            className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200 rounded-lg py-3 px-6 transition duration-150 ease-in-out flex items-center w-full sm:w-auto justify-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">Start Now</span>
            <FaArrowRight className="group-hover:hidden" />
            <FaArrowUp className="hidden group-hover:inline" />
          </motion.button>
          <motion.button
            className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200 rounded-lg py-3 px-6 transition duration-150 ease-in-out flex items-center w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlay className="mr-2" />
            Watch Demo
          </motion.button>
        </div>
      </div>
    </div>
  );
}