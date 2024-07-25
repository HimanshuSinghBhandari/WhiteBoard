import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-zinc-900 text-gray-300 py-4 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <motion.div
          className="text-center sm:text-left mb-2 sm:mb-0"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-lg font-semibold">white board</p>
          <p className="text-sm">© 2024 Whiteboard. All rights reserved.</p>
        </motion.div>
        <motion.div className="flex space-x-4">
          <motion.a
            href="https://github.com/HimanshuSinghBhandari/WhiteBoard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-500 transition duration-150"
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-500 transition duration-150"
            whileHover={{ scale: 1.1 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-500 transition duration-150"
            whileHover={{ scale: 1.1 }}
          >
            <FaTwitter />
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
