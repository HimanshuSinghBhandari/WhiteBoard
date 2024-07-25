import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiPieChart, FiRefreshCw, FiUsers, FiLock } from 'react-icons/fi';

const FeatureItem = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center mb-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-zinc-700 p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-zinc-200">{title}</h3>
    <p className="text-zinc-400 max-w-sm">{description}</p>
  </motion.div>
);

const HowItWorksPage = () => {
  const features = [
    {
      icon: <FiMonitor className="w-8 h-8 text-indigo-400" />,
      title: "Centralized Dashboard",
      description: "Access all your key metrics and data in one place with our intuitive, customizable dashboard interface."
    },
    {
      icon: <FiPieChart className="w-8 h-8 text-green-400" />,
      title: "Data Visualization",
      description: "Transform complex data into easy-to-understand charts and graphs for quick insights and decision-making."
    },
    {
      icon: <FiRefreshCw className="w-8 h-8 text-blue-400" />,
      title: "Real-Time Updates",
      description: "Stay up-to-date with live data feeds and automatic refreshes, ensuring you always have the latest information."
    },
    {
      icon: <FiUsers className="w-8 h-8 text-yellow-400" />,
      title: "Collaborative Tools",
      description: "Share dashboards, set permissions, and collaborate with team members for improved productivity and teamwork."
    },
    {
      icon: <FiLock className="w-8 h-8 text-red-400" />,
      title: "Secure Data Handling",
      description: "Rest easy knowing your data is protected with enterprise-grade security measures and regular backups."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center text-zinc-200 mb-6 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How Our Digital Dashboard Works
        </motion.h1>
        
        <motion.p 
          className="text-center text-zinc-400 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our powerful Digital Dashboard streamlines your data management and visualization process. 
          Here's how it empowers you to make data-driven decisions with ease:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;