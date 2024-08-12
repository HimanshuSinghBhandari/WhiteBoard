// StickyNote.js
import React, { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const StickyNote = ({ onClose, initialPos }) => {
  const [content, setContent] = useState('');
  const x = useMotionValue(initialPos.x);
  const y = useMotionValue(initialPos.y);

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute w-48 h-48 bg-yellow-200 rounded-md shadow-md p-2 flex flex-col"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow bg-transparent resize-none focus:outline-none"
        placeholder="Type your note here..."
      />
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-gray-600 hover:text-gray-800"
      >
        ×
      </button>
    </motion.div>
  );
};

export default StickyNote;