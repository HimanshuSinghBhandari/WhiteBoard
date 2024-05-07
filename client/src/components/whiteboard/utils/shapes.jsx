import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";

import { socket } from "./socket";

export const createRectangle = (pointer) => {
    return new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        fill: "#000000",
        objectId: uuidv4(),
    });
};

export const createTriangle = (pointer) => {
    return new fabric.Triangle({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        fill: "#000000",
        objectId: uuidv4(),
    });
};

export const createCircle = (pointer) => {
    return new fabric.Circle({
        left: pointer.x,
        top: pointer.y,
        radius: 0,
        fill: "#000000",
        objectId: uuidv4(),
    });
};

export const createLine = (pointer) => {
    return new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: "#000000",
        strokeWidth: 2,
        objectId: uuidv4(),
    });
};

export const createText = (pointer, text) => {
    return new fabric.IText(text, {
        left: pointer.x,
        top: pointer.y,
        fill: "#000000",
        fontFamily: "Helvetica",
        fontSize: 36,
        fontWeight: "400",
        objectId: uuidv4(),
    });
};

export const createSpecificShape = (shape, pointer) => {
    switch (shape) {
        case "rect":
            return createRectangle(pointer);
        case "triangle":
            return createTriangle(pointer);
        case "circle":
            return createCircle(pointer);
        case "line":
            return createLine(pointer);
        case "i-text":
            return createText(pointer, "Tap To Type");
        default:
            return null;
    }
};

export const handleImageUpload = ({ file, fabricRef, setShape }) => {
    const reader = new FileReader();

    reader.onload = () => {
        fabric.Image.fromURL(reader.result, (image) => {
            image.scaleToWidth(200);
            image.scaleToHeight(200);
            image.set({ top: 160, left: 320 });

            if (fabricRef?.current) fabricRef.current.add(image);

            image.objectId = uuidv4();

            if (image?.objectId) {
                setShape({ objectId: image.objectId, ...image.toJSON() });
                socket.emit("set:shape", { objectId: image.objectId, ...image.toJSON() });
            }

            if (fabricRef?.current) fabricRef.current.requestRenderAll();
        });
    };

    reader.readAsDataURL(file);
};

export const modifyShape = ({ fabricRef, property, value, updateShape }) => {
    if (!fabricRef.current) return;
    const selectedElement = fabricRef.current.getActiveObject();

    if (!selectedElement || selectedElement?.type === "activeSelection") return;

    if (property === "width") {
        selectedElement.set("scaleX", 1);
        selectedElement.set("width", Number(value));
    } else if (property === "height") {
        selectedElement.set("scaleY", 1);
        selectedElement.set("height", Number(value));
    } else {
        if (selectedElement[property] === value) return;
        selectedElement.set(property, value);
    }

    if (selectedElement?.objectId) {
        updateShape({ objectId: selectedElement.objectId, ...selectedElement.toJSON() });
        socket.emit("update:shape", { objectId: selectedElement.objectId, ...selectedElement.toJSON() });
    }
};

export const bringElement = ({ canvas, direction }) => {
    if (!canvas) return;

    const selectedElement = canvas.getActiveObject();

    if (!selectedElement || selectedElement?.type === "activeSelection") return;

    if (direction === "front") {
        canvas.bringToFront(selectedElement);
    } else if (direction === "back") {
        canvas.sendToBack(selectedElement);
    }

    console.log({ selectedElement });
};