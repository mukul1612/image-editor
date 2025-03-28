import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ImageEditorApp from "./ImageEditor";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageEditorApp />
  </StrictMode>
);
