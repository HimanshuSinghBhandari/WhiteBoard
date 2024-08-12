 import CanvasComponent from "../components/whiteboard/fabriccanva";
 
function Whiteboard() {
   
  return (
    <div className="flex flex-col h-screen relative">
      <CanvasComponent />
    </div>
  );
}

export default Whiteboard;
