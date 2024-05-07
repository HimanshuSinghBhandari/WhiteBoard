import React, { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Canvas = ({
  canvasRef,
  contextRef,
  selectedTool,
  currentColor,
  currentSize,
  startDrawing,
  draw,
  stopDrawing,
  startX,
  startY,
  zoom,
  textInputRef,
  setTextInputRef,
}) => {
  const zoomStyle = useSpring({
    scale: zoom,
    config: { mass: 1, tension: 250, friction: 40 },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.lineCap = 'round';
  }, [canvasRef, contextRef]);

  const handleMouseDown = (event) => {
    startDrawing(event.clientX, event.clientY);
  };

  const handleMouseMove = (event) => {
    draw(event.clientX, event.clientY);
  };

  const handleMouseUp = (event) => {
    stopDrawing();
  };

  const handleMouseLeave = (event) => {
    stopDrawing();
  };

  return (
    <div className="flex-1 relative">
      <animated.canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full border border-gray-300"
        style={{
          transform: zoomStyle.scale.interpolate(scale => `scale(${scale})`),
        }}
      />
    </div>
  );
};

export default Canvas;