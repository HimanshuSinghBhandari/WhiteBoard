import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Canvas = ({
  selectedTool,
  currentColor,
  currentSize,
  zoom
}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [imageData, setImageData] = useState(null);

  const zoomStyle = useSpring({
    scale: zoom,
    config: { mass: 1, tension: 250, friction: 40 },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = currentColor;
    context.lineWidth = currentSize;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = currentColor;
      contextRef.current.lineWidth = currentSize;
    }
  }, [currentColor, currentSize]);

  const saveImageData = () => {
    const canvas = canvasRef.current;
    const data = canvas.toDataURL();
    setImageData(data);
  };

  const restoreImageData = () => {
    if (imageData) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
    }
  };

  const startDrawing = (x, y) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
    setStartX(x);
    setStartY(y);
    if (selectedTool === 'circle' || selectedTool === 'rectangle') {
      saveImageData();
    }
  };

  const draw = (x, y) => {
    if (!isDrawing) return;

    switch (selectedTool) {
      case 'brush':
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
        break;
      case 'circle':
      case 'rectangle':
        restoreImageData();
        contextRef.current.beginPath();
        if (selectedTool === 'circle') {
          const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
          contextRef.current.arc(startX, startY, radius, 0, 2 * Math.PI);
        } else if (selectedTool === 'rectangle') {
          contextRef.current.rect(startX, startY, x - startX, y - startY);
        }
        contextRef.current.stroke();
        break;
      case 'eraser':
        contextRef.current.globalCompositeOperation = 'destination-out';
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
        contextRef.current.globalCompositeOperation = 'source-over';
        break;
      default:
        break;
    }
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    startDrawing(offsetX, offsetY);
  };

  const handleMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    draw(offsetX, offsetY);
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  const handleMouseLeave = () => {
    stopDrawing();
  };

  return (
    <div className="flex-1 relative overflow-hidden">
      <animated.canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full border border-gray-300"
        style={{
          transform: zoomStyle.scale.to(scale => `scale(${scale})`),
        }}
      />
    </div>
  );
};

export default Canvas;
