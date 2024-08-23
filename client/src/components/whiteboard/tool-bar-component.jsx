import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';
import { FaPencilAlt, FaEraser, FaSearchPlus, FaSearchMinus, FaTrash, FaFont, FaShapes, FaImage } from 'react-icons/fa';
import { FaSearch, FaUndo } from 'react-icons/fa';
import { ChromePicker } from 'react-color';

const ToolbarComponent = ({ canvas, setCanvas }) => {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedShape, setSelectedShape] = useState('rectangle');
  const [brushWidth, setBrushWidth] = useState(5);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showZoomBar, setShowZoomBar] = useState(false);
  const [showUndoRedoBar, setShowUndoRedoBar] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);


  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = selectedTool === 'pencil' || selectedTool === 'eraser';
      canvas.freeDrawingBrush.color = selectedTool === 'eraser' ? '#FFFFFF' : selectedColor;
      canvas.freeDrawingBrush.width = selectedTool === 'eraser' ? brushWidth * 4 : brushWidth;
    }
  }, [canvas, selectedTool, selectedColor, brushWidth]);

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    if (canvas && selectedTool !== 'eraser') {
      canvas.freeDrawingBrush.color = color.hex;
    }
  };

  const handleShapeChange = (shape) => {
    setSelectedShape(shape);
    setSelectedTool('shape');
  };

 const handleZoom = (newZoomLevel) => {
    if (canvas) {
      const zoom = newZoomLevel / 100;
      canvas.setZoom(zoom);
      canvas.renderAll();
      setZoomLevel(newZoomLevel);
    }
  };

  const handleUndo = () => {
    if (canvas && undoStack.length > 0) {
      const currentState = JSON.stringify(canvas.toJSON());
      setRedoStack(prevStack => [...prevStack, currentState]);
      
      const prevState = undoStack[undoStack.length - 1];
      setUndoStack(prevStack => prevStack.slice(0, -1));
      
      canvas.loadFromJSON(prevState, () => {
        canvas.renderAll();
      });
    }
  };
  
  const handleRedo = () => {
    if (canvas && redoStack.length > 0) {
      const currentState = JSON.stringify(canvas.toJSON());
      setUndoStack(prevStack => [...prevStack, currentState]);
      
      const nextState = redoStack[redoStack.length - 1];
      setRedoStack(prevStack => prevStack.slice(0, -1));
      
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
      });
    }
  };

  const handleDelete = () => {
    if (canvas) {
      canvas.clear();
      canvas.renderAll();
    }
  };

  const handleAddText = () => {
    if (canvas) {
      const text = new fabric.IText('Enter text here', {
        left: 100,
        top: 100,
        fontSize: 24,
        fontFamily: 'Arial',
        fill: selectedColor,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      text.enterEditing();
      text.selectAll();
      canvas.renderAll();
    }
    setSelectedTool('text');
  };

  const handleAddShape = () => {
    if (canvas) {
      let shape;
      switch (selectedShape) {
        case 'rectangle':
          shape = new fabric.Rect({
            left: 100,
            top: 100,
            fill: selectedColor,
            width: 100,
            height: 100,
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            left: 100,
            top: 100,
            fill: selectedColor,
            radius: 50,
          });
          break;
        case 'triangle':
          shape = new fabric.Triangle({
            left: 100,
            top: 100,
            fill: selectedColor,
            width: 100,
            height: 100,
          });
          break;
        default:
          break;
      }
      if (shape) {
        canvas.add(shape);
        canvas.setActiveObject(shape);
        canvas.renderAll();
      }
    }
  };

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        fabric.Image.fromURL(imageData, (img) => {
          img.scale(0.5).set({
            left: 100,
            top: 100,
          });
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
    setSelectedTool('image');
  };

  const ToolButton = ({ icon: Icon, tool, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full cursor-pointer ${selectedTool === tool ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
      onClick={onClick}
    >
      <Icon size={20} />
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between bg-purple-800 shadow-lg rounded-2xl p-6 mb-4"
    >
      <div className="flex space-x-4">
        <ToolButton icon={FaPencilAlt} tool="pencil" onClick={() => handleToolChange('pencil')} />
        <ToolButton icon={FaEraser} tool="eraser" onClick={() => handleToolChange('eraser')} />
        
        {/* Zoom functionality */}
        <div 
          className="relative"
          onMouseEnter={() => setShowZoomBar(true)}
          onMouseLeave={() => setShowZoomBar(false)}
        >
          <ToolButton icon={FaSearch} tool="zoom" />
          {showZoomBar && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 bg-purple-700 p-2 rounded-lg shadow-lg"
            >
              <input 
                type="range"
                min="50"
                max="200"
                value={zoomLevel}
                onChange={(e) => handleZoom(parseInt(e.target.value))}
                className="w-32 accent-indigo-500"
              />
              <span className="text-white ml-2">{zoomLevel}%</span>
            </motion.div>
          )}
        </div>
        
        {/* Undo/Redo functionality */}
        <div 
          className="relative"
          onMouseEnter={() => setShowUndoRedoBar(true)}
          onMouseLeave={() => setShowUndoRedoBar(false)}
        >
          <ToolButton icon={FaUndo} tool="undoRedo" />
          {showUndoRedoBar && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 bg-purple-700 p-2 rounded-lg shadow-lg flex space-x-2"
            >
              <button 
                onClick={handleUndo} 
                disabled={undoStack.length === 0}
                className="px-2 py-1 bg-indigo-500 text-white rounded-md disabled:opacity-50"
              >
                Undo
              </button>
              <button 
                onClick={handleRedo} 
                disabled={redoStack.length === 0}
                className="px-2 py-1 bg-indigo-500 text-white rounded-md disabled:opacity-50"
              >
                Redo
              </button>
            </motion.div>
          )}
        </div>
        
        <ToolButton icon={FaTrash} tool="delete" onClick={handleDelete} />
        <ToolButton icon={FaFont} tool="text" onClick={handleAddText} />
      </div>
      
      <div className="flex items-center space-x-4">
        <motion.select
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-700 text-white px-2 py-1 rounded-lg"
          value={selectedShape}
          onChange={(e) => handleShapeChange(e.target.value)}
        >
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </motion.select>
        <ToolButton icon={FaShapes} tool="shape" onClick={handleAddShape} />
        <ToolButton icon={FaImage} tool="image" onClick={handleAddImage} />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div
            className="w-8 h-8 rounded-full cursor-pointer"
            style={{ backgroundColor: selectedColor }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
          {showColorPicker && (
            <div className="absolute top-10 right-0 z-10">
              <ChromePicker color={selectedColor} onChange={handleColorChange} />
            </div>
          )}
        </motion.div>
        <motion.input
          type="range"
          min="1"
          max="20"
          value={brushWidth}
          onChange={(e) => setBrushWidth(parseInt(e.target.value))}
          className="w-24 accent-indigo-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>
    </motion.div>
  );
};

export default ToolbarComponent;