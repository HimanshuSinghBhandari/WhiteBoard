import React, { useState, useRef, useCallback } from 'react';
import ToolBar from '../components/whiteboard/ToolBar';
import Canvas from '../components/whiteboard/Canvas';

const INITIAL_COLOR = 'black';
const INITIAL_SIZE = 5;

function Whiteboard() {
  const [currentColor, setCurrentColor] = useState(INITIAL_COLOR);
  const [currentSize, setCurrentSize] = useState(INITIAL_SIZE);
  const [selectedTool, setSelectedTool] = useState('brush');
  const [zoom, setZoom] = useState(1);
  
  const canvasRef = useRef(null);

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  const handleSizeChange = (size) => {
    setCurrentSize(parseInt(size));
  };

  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
    } else if (direction === 'out') {
      setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
    }
  };

  const clearCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen relative">
      <div className="flex-1 relative">
        <Canvas
          ref={canvasRef}
          selectedTool={selectedTool}
          currentColor={currentColor}
          currentSize={currentSize}
          zoom={zoom}
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <ToolBar
          selectedTool={selectedTool}
          handleToolChange={handleToolChange}
          handleColorChange={handleColorChange}
          currentColor={currentColor}
          handleSizeChange={handleSizeChange}
          currentSize={currentSize}
          handleZoom={handleZoom}
          clearCanvas={clearCanvas}
        />
      </div>
    </div>
  );
}

export default Whiteboard;
