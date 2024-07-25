import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:your-email@example.com?subject=Contact Form Submission&body=First Name: ${firstName}%0D%0ALast Name: ${lastName}%0D%0AEmail: ${email}%0D%0AQuery: ${query}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="mt-8 text-center text-3xl font-extrabold text-zinc-300">
            Contact Us
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-white placeholder-gray-500 text-zinc-300 focus:outline-none focus:ring-gray-300 focus:border-gray-300 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-white placeholder-gray-500 text-zinc-300 focus:outline-none focus:ring-gray-300 focus:border-gray-300 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-zinc-300">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-white placeholder-gray-500 text-zinc-300 focus:outline-none focus:ring-gray-300 focus:border-gray-300 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-zinc-300">Your query</label>
              <textarea
                id="query"
                name="query"
                rows="4"
                required
                className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-white placeholder-gray-500 text-zinc-300 focus:outline-none focus:ring-gray-300 focus:border-gray-300 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Your query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-zinc-300 bg-zinc-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;