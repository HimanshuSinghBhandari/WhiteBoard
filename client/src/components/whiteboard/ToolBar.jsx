import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPencilAlt, FaFont, FaCircle, FaSquare, FaEraser, FaSearch, FaSearchMinus, FaTrash } from 'react-icons/fa';
import { ChromePicker } from 'react-color';

const ToolButton = ({ icon, isSelected, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`p-3 rounded-full shadow-md ${
      isSelected ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
    }`}
    onClick={onClick}
  >
    {icon}
  </motion.button>
);

const ToolBar = ({
  selectedTool,
  handleToolChange,
  handleColorChange,
  currentColor,
  handleSizeChange,
  currentSize,
  handleZoom,
  clearCanvas,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-lg rounded-t-3xl"
    >
      <div className="flex justify-center items-start space-x-4 flex-wrap mb-2">
        <ToolButton
          icon={<FaPencilAlt />}
          isSelected={selectedTool === 'brush'}
          onClick={() => handleToolChange('brush')}
        />
        <ToolButton
          icon={<FaFont />}
          isSelected={selectedTool === 'text'}
          onClick={() => handleToolChange('text')}
        />
        <ToolButton
          icon={<FaCircle />}
          isSelected={selectedTool === 'circle'}
          onClick={() => handleToolChange('circle')}
        />
        <ToolButton
          icon={<FaSquare />}
          isSelected={selectedTool === 'rectangle'}
          onClick={() => handleToolChange('rectangle')}
        />
        <ToolButton
          icon={<FaEraser />}
          isSelected={selectedTool === 'eraser'}
          onClick={() => handleToolChange('eraser')}
        />
        <ToolButton
          icon={<FaSearch />}
          onClick={() => handleZoom('in')}
        />
        <ToolButton
          icon={<FaSearchMinus />}
          onClick={() => handleZoom('out')}
        />
        <ToolButton
          icon={<FaTrash />}
          onClick={clearCanvas}
        />
      </div>
      
      <div className="flex justify-center items-center space-x-6 mt-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <div
            className="w-10 h-10 rounded-full border-4 border-white shadow-md cursor-pointer"
            style={{ backgroundColor: currentColor }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
          {showColorPicker && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
              <ChromePicker
                color={currentColor}
                onChange={(color) => handleColorChange(color.hex)}
                disableAlpha={true}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md"
        >
          <input
            type="range"
            min="1"
            max="50"
            value={currentSize}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="w-32 accent-blue-500"
          />
          <span className="text-sm text-gray-600 font-semibold">{currentSize}px</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ToolBar;