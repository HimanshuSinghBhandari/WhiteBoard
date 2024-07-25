import React from 'react';
import { motion } from 'framer-motion';
import { FaPencilAlt, FaUsers, FaCloud } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaPencilAlt />,
      title: 'Intuitive Drawing Tools',
      description: 'Sketch, write, and diagram with ease'
    },
    {
      icon: <FaUsers />,
      title: 'Real-time Collaboration',
      description: 'Work together from anywhere'
    },
    {
      icon: <FaCloud />,
      title: 'Cloud Storage',
      description: 'Access your boards anytime, anywhere'
    }
  ];

  return (
    <div className="bg-zinc-800 text-zinc-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-zinc-700 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center hover:bg-opacity-70 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-5xl mb-4 text-purple-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;