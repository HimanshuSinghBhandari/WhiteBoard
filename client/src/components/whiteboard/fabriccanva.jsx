import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { motion, AnimatePresence } from 'framer-motion';
import ToolbarComponent from './tool-bar-component';
import StickyNote from './stickynote';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const[stickyNotes , setStickyNotes] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: container.clientWidth,
      height: container.clientHeight,
    });
    setCanvas(newCanvas);

    const handleResize = () => {
      newCanvas.setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
      newCanvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      newCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:wheel', (opt) => {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      canvas.on('mouse:down', (opt) => {
        const evt = opt.e;
        if (evt.altKey === true) {
          canvas.isDragging = true;
          canvas.selection = false;
          canvas.lastPosX = evt.clientX;
          canvas.lastPosY = evt.clientY;
        }
      });

      canvas.on('mouse:move', (opt) => {
        if (canvas.isDragging) {
          const e = opt.e;
          const vpt = canvas.viewportTransform;
          vpt[4] += e.clientX - canvas.lastPosX;
          vpt[5] += e.clientY - canvas.lastPosY;
          canvas.requestRenderAll();
          canvas.lastPosX = e.clientX;
          canvas.lastPosY = e.clientY;
        }
      });

      canvas.on('mouse:up', () => {
        canvas.setViewportTransform(canvas.viewportTransform);
        canvas.isDragging = false;
        canvas.selection = true;
      });
    }
  }, [canvas]);

  const addStickyNote = () => {
    const newNote = {
      id: Date.now(),
      x: 20,
      y: window.innerHeight - 930,
    };
    setStickyNotes([...stickyNotes, newNote]);
  };

  const removeStickyNote = (id) => {
    setStickyNotes(stickyNotes.filter(note => note.id !== id));
  };

  return (
    <div className="h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4"
      >
        <ToolbarComponent canvas={canvas} />
      </motion.div>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow relative"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        <AnimatePresence>
          {stickyNotes.map((note) => (
            <StickyNote
              key={note.id}
              initialPos={{ x: note.x, y: note.y }}
              onClose={() => removeStickyNote(note.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-4 left-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full shadow-lg"
        onClick={addStickyNote}
      >
        Add Sticky Note
      </motion.button>
    </div>
  );
};

export default CanvasComponent;