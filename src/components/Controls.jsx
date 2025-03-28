import React from "react";
import * as fabric from "fabric";
import { Canvas, Rect } from "fabric";

const Controls = ({ canvasRef, canvas, setCanvas }) => {
  const addTextToCanvas = async () => {
    if (!canvas) return;

    const text = new fabric.Text("Sample Text", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "black",
    });

    canvas.add(text);
    canvas.renderAll();
  };

  const addShapeToCanvas = async (shapeType) => {
    if (!canvasRef.current) return;
    const { fabric } = await import("fabric");

    let shape;
    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "red",
          left: 100,
          top: 100,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 50,
          fill: "blue",
          left: 100,
          top: 100,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "green",
          left: 100,
          top: 100,
        });
        break;
      default:
        return;
    }
    canvasRef.current.add(shape);
    canvasRef.current.renderAll();
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited_image.png";
    link.click();
  };

  return (
    <div className="controls">
      <button onClick={addTextToCanvas}>Add Text</button>
      <button onClick={() => addShapeToCanvas("circle")}>Add Circle</button>
      <button onClick={() => addShapeToCanvas("rectangle")}>
        Add Rectangle
      </button>
      <button onClick={() => addShapeToCanvas("triangle")}>Add Triangle</button>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
};

export default Controls;
