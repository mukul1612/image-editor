import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 400,
    });
    setCanvas(newCanvas);
    return () => newCanvas.dispose();
  }, []);

  useEffect(() => {
    if (canvas && imageUrl) loadImageToCanvas(imageUrl);
  }, [imageUrl, canvas]);

  const loadImageToCanvas = (imageUrl) => {
    canvas.clear();
    const imgElement = new Image();
    imgElement.crossOrigin = "anonymous";
    imgElement.src = imageUrl;

    imgElement.onload = () => {
      const imgInstance = new fabric.Image(imgElement, {
        scaleX: 0.5,
        scaleY: 0.5,
        left: 100,
        top: 100,
        angle: 0,
      });
      addDeleteControl(imgInstance);
      canvas.add(imgInstance);
      canvas.setActiveObject(imgInstance);
    };

    imgElement.onerror = () => {
      alert("Image cannot be loaded due to CORS restrictions.");
    };
  };

  const addText = () => {
    if (!textInput.trim()) return;
    const text = new fabric.IText(textInput, {
      left: 100,
      top: 100,
      fontSize: 30,
      fill: selectedColor,
      fontWeight: "bold",
      editable: true,
      hasControls: true,
    });
    addDeleteControl(text);
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const addShape = (shape) => {
    let shapeObj;
    const shapeProps = { top: 100, left: 50, fill: selectedColor };

    switch (shape) {
      case "Rectangle":
        shapeObj = new fabric.Rect({ ...shapeProps, width: 100, height: 60 });
        break;
      case "Circle":
        shapeObj = new fabric.Circle({ ...shapeProps, radius: 50 });
        break;
      case "Triangle":
        shapeObj = new fabric.Triangle({
          ...shapeProps,
          width: 100,
          height: 100,
        });
        break;
      case "Polygon":
        shapeObj = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 100, y: 50 },
            { x: 75, y: 100 },
            { x: 25, y: 100 },
            { x: 0, y: 50 },
          ],
          shapeProps
        );
        break;
      default:
        return;
    }

    addDeleteControl(shapeObj);
    canvas.add(shapeObj);
    canvas.setActiveObject(shapeObj);
    canvas.renderAll();
  };

  const addDeleteControl = (obj) => {
    obj.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -10,
      offsetX: 10,
      cursorStyle: "pointer",
      mouseUpHandler: (_, transform) => {
        canvas.remove(transform.target);
        canvas.requestRenderAll();
      },
      render: (ctx, left, top) => {
        ctx.save();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(left, top, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.fillText("X", left - 5, top + 5);
        ctx.restore();
      },
    });
  };

  const saveCanvas = () => {
    try {
      const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
      console.log(dataURL, "dataURL");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "Mukul_Edit_Images.png";
      link.click();
    } catch (error) {
      alert("Failed to save image.");
    }
  };

  return (
    <div className="canvas-editor-container">
      <canvas ref={canvasRef} className="canvas-area"></canvas>
      <div className="controls">
        <label>Pick Color: </label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="color-picker"
        />
        <input
          type="text"
          placeholder="Enter text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="text-input"
        />
        <div className="button-grid">
          <button onClick={addText}>Add Text</button>
          <button onClick={() => addShape("Rectangle")}>Rectangle</button>
          <button onClick={() => addShape("Circle")}>Circle</button>
          <button onClick={() => addShape("Triangle")}>Triangle</button>
          <button onClick={() => addShape("Polygon")}>Polygon</button>
          <button onClick={saveCanvas}>Save Image</button>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
