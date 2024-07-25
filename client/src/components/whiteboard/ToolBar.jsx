import React from 'react';
import {PencilIcon, ChatBubbleBottomCenterIcon, StopIcon,  } from '@heroicons/react/24/solid';
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
  return (
    <div className="flex justify-center flex-wrap gap-4 mt-16">
      <button
        className={`px-4 py-2 rounded-md ${
          selectedTool === 'brush' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
        onClick={() => handleToolChange('brush')}
      >
        <PencilIcon className="h-6 w-6" />
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedTool === 'text' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
        onClick={() => handleToolChange('text')}
      >
         <ChatBubbleBottomCenterIcon className="h-6 w-6"/>
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedTool === 'circle' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
        onClick={() => handleToolChange('circle')}
      >
        Circle
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedTool === 'rectangle' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
        onClick={() => handleToolChange('rectangle')}
      >
        Rectangle
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          selectedTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
        onClick={() => handleToolChange('eraser')}
      >
        Eraser
      </button>
      <input
        type="color"
        value={currentColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="mr-4"
      />
      <input
        type="range"
        min="1"
        max="50"
        value={currentSize}
        onChange={(e) => handleSizeChange(e.target.value)}
        className="mr-4"
      />
      <button
        className="px-4 py-2 rounded-md bg-white text-gray-700"
        onClick={() => handleZoom('in')}
      >
        Zoom In
      </button>
      <button
        className="px-4 py-2 rounded-md bg-white text-gray-700"
        onClick={() => handleZoom('out')}
      >
        Zoom Out
      </button>
      <button
        className="px-4 py-2 rounded-md bg-white text-gray-700"
        onClick={clearCanvas}
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default ToolBar;