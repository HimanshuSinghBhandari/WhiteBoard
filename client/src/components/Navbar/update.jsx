import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiZap } from 'react-icons/fi';
import { FaBug } from "react-icons/fa";

const UpdateItem = ({ version, date, title, description, type }) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'feature':
        return <FiStar className="text-yellow-400" />;
      case 'bugfix':
        return <FaBug className="text-red-400" />;
      case 'improvement':
        return <FiZap className="text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="bg-zinc-700 rounded-lg p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-zinc-400">Version {version}</span>
        <span className="text-sm text-zinc-500">{date}</span>
      </div>
      <h3 className="text-xl font-bold text-zinc-200 mb-2 flex items-center">
        {getTypeIcon()}
        <span className="ml-2">{title}</span>
      </h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  );
};

const UpdatesPage = () => {
  const updates = [
    {
      version: "1.2.0",
      date: "July 20, 2024",
      title: "New Data Visualization Tools",
      description: "Introduced advanced chart types and customizable dashboards for better data insights.",
      type: "feature"
    },
    {
      version: "1.1.2",
      date: "June 15, 2024",
      title: "Performance Optimization",
      description: "Improved loading times and overall application responsiveness.",
      type: "improvement"
    },
    {
      version: "1.1.1",
      date: "May 30, 2024",
      title: "Bug Fixes in Reporting Module",
      description: "Resolved issues with exporting reports and fixed data discrepancies in weekly summaries.",
      type: "bugfix"
    },
    {
      version: "1.1.0",
      date: "April 10, 2024",
      title: "Collaborative Editing Feature",
      description: "Users can now simultaneously edit dashboards in real-time with team members.",
      type: "feature"
    },
    {
      version: "1.0.1",
      date: "March 5, 2024",
      title: "UI Enhancements",
      description: "Refreshed color scheme and improved accessibility features across the application.",
      type: "improvement"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center text-zinc-200 mb-6 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Recent Updates
        </motion.h1>
        
        <motion.p 
          className="text-center text-zinc-400 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Stay informed about the latest features, improvements, and bug fixes in our Digital Dashboard.
        </motion.p>

        {updates.map((update, index) => (
          <UpdateItem key={index} {...update} />
        ))}

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a 
            href="#" 
            className="inline-flex items-center text-zinc-400 hover:text-indigo-300 transition duration-300"
          >
            View Full Changelog
            <FiArrowRight className="ml-2" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdatesPage;