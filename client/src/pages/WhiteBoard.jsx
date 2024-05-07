import React, { useState, useRef, useEffect } from 'react';
import ToolBar from '../components/whiteboard/ToolBar';
import Canvas from '../components/whiteboard/Canvas';

const INITIAL_COLOR = 'black';
const INITIAL_SIZE = 5;

function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(INITIAL_COLOR);
  const [currentSize, setCurrentSize] = useState(INITIAL_SIZE);
  const [selectedTool, setSelectedTool] = useState('brush');
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [zoom, setZoom] = useState(1);

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / zoom;
    const offsetY = (event.clientY - rect.top) / zoom;
    const context = contextRef.current;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setLastX(offsetX);
    setLastY(offsetY);
    setIsDrawing(true);
    // Add event listener for mouse move
    window.addEventListener('mousemove', handleMove);
  };

  const handleMove = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / zoom;
    const offsetY = (event.clientY - rect.top) / zoom;
    const context = contextRef.current;
    context.strokeStyle = currentColor;
    context.lineWidth = currentSize;
    context.beginPath(); // Ensure a new path is started for each move
    context.moveTo(lastX, lastY); // Use lastX and lastY for continuous drawing
    context.lineTo(offsetX, offsetY);
    context.stroke();
    setLastX(offsetX);
    setLastY(offsetY);
  };

  useEffect(() => {
    // Remove event listener on unmount
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isDrawing]);

  const stopDrawing = () => {
    setIsDrawing(false);
    window.removeEventListener('mousemove', handleMove);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  const handleSizeChange = (size) => {
    setCurrentSize(size);
  };

  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoom(Math.min(zoom + 0.1, 2));
    } else if (direction === 'out') {
      setZoom(Math.max(zoom - 0.1, 0.5));
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center flex-wrap gap-4">
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
      <div className="flex-1 relative p-4">
        <Canvas
          canvasRef={canvasRef}
          contextRef={contextRef}
          selectedTool={selectedTool}
          currentColor={currentColor}
          currentSize={currentSize}
          startDrawing={startDrawing}
          draw={handleMove} // Pass handleMove directly for efficiency
          stopDrawing={stopDrawing}
          zoom={zoom}
        />
      </div>
    </div>
  );
}

export default Whiteboard
