/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gradient, Pattern } from "fabric/fabric-impl";

export const CursorMode = {
    Hidden: "Hidden",
    Chat: "Chat",
    ReactionSelector: "ReactionSelector",
    Reaction: "Reaction",
};

export const Reaction = {
    value: "",
    timestamp: 0,
    point: { x: 0, y: 0 },
};

export const ReactionEvent = {
    x: 0,
    y: 0,
    value: "",
};

export const Pointer = { x: 0, y: 0 };

export const ShapeData = {
    type: "",
    width: 0,
    height: 0,
    fill: null,
    left: 0,
    top: 0,
    objectId: undefined,
};

export const Attributes = {
    top: "",
    left: "",
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "",
    stroke: "",
};

export const Tool = {
    Panning: "panning",
    Select: "select",
    Rect: "rect",
    Triangle: "triangle",
    Circle: "circle",
    Line: "line",
    Path: "path",
    IText: "i-text",
    Image: "image",
};

export const ModifyShape = {
    fabricRef: null,
    property: "",
    value: "",
    updateShape: (shape) => {},
};

export const ElementDirection = {
    canvas: null,
    direction: "",
};

export const ImageUpload = {
    file: null,
    fabricRef: null,
    setShape: (shape) => {},
};

export const RightSidebarProps = {
    fabricRef: null,
    isEditingRef: null,
    pasteTimeRef: null,
    copiedObjectRef: null,
};

export const InitializeFabric = {
    fabricRef: null,
    canvasRef: null,
};

export const CanvasMouseDown = {
    options: null,
    canvas: null,
    selectedToolRef: null,
    isDrawing: null,
    isPanning: null,
    shapeRef: null,
};

export const CanvasMouseMove = {
    options: null,
    canvas: null,
    isDrawing: null,
    isPanning: null,
    selectedToolRef: null,
    shapeRef: null,
};

export const CanvasMouseUp = {
    canvas: null,
    isDrawing: null,
    isPanning: null,
    shapeRef: null,
    selectedToolRef: null,
    setTool: (tool) => {},
    setShape: (shape) => {},
};

export const CanvasObjectModified = {
    options: null,
    updateShape: (shape) => {},
};

export const CanvasPathCreated = {
    setShape: (shape) => {},
    options: null,
};

export const CanvasSelectionCreated = {
    options: null,
    isEditingRef: null,
    pasteTimeRef: null,
    setAttributes: (attributes) => {},
};

export const CanvasObjectScaling = {
    options: null,
    updateAttributes: (key, value) => {},
};

export const CanvasObjectMoving = {
    options: null,
    updateAttributes: (key, value) => {},
};

export const RenderCanvas = {
    shapes: [],
    fabricRef: null,
};

export const CanvasZoom = {
    options: null,
    canvas: null,
    setZoom: (zoom) => {},
};

export const WindowKeyDown = {
    e: null,
    canvas: null,
    pasteTimeRef: null,
    copiedObjectRef: null,
    setShape: (shape) => {},
    deleteShape: (id) => {},
    undo: (steps) => {},
    redo: (steps) => {},
    setTool: (tool) => {},
};

export const CursorChatProps = {
    cursor: { x: 0, y: 0 },
    cursorState: { mode: CursorMode.Hidden },
    setCursorState: (cursorState) => {},
    updateMyPresence: (presence) => {},
};