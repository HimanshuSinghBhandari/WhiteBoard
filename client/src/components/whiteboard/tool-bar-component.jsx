import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';
import { FaPencilAlt, FaEraser, FaSearchPlus, FaSearchMinus, FaTrash, FaFont, FaShapes, FaImage } from 'react-icons/fa';
import { ChromePicker } from 'react-color';

const ToolbarComponent = ({ canvas, setCanvas }) => {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedShape, setSelectedShape] = useState('rectangle');
  const [brushWidth, setBrushWidth] = useState(5);
  const [showColorPicker, setShowColorPicker] = useState(false);

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

  const handleZoomIn = () => {
    if (canvas) {
      canvas.setZoom(canvas.getZoom() * 1.1);
      canvas.renderAll();
    }
  };

  const handleZoomOut = () => {
    if (canvas) {
      canvas.setZoom(canvas.getZoom() / 1.1);
      canvas.renderAll();
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
        <ToolButton icon={FaSearchPlus} tool="zoomIn" onClick={handleZoomIn} />
        <ToolButton icon={FaSearchMinus} tool="zoomOut" onClick={handleZoomOut} />
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