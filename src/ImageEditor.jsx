import React, { useState } from "react";
import "./ImageEditor.css";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import CanvasEditor from "./components/CanvasEditor";

const API_KEY = "gDd94ToPMEjViN9ksEZToiwP2gmOO_qwG1QZSQyyFFc";
const API_URL = "https://api.unsplash.com/search/photos";

const ImageEditorApp = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    if (!query.trim()) {
      return setError("Please enter a valid search.");
    }

    try {
      setError(null);
      const response = await fetch(
        `${API_URL}?query=${query}&client_id=${API_KEY}`
      );
      const data = await response.json();

      data?.results?.length
        ? setImages(data.results)
        : setError("No images found. Try another search.");
    } catch {
      setError("Failed to fetch images. Please try again.");
    }
  };
  const addImageToCanvas = async (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="container">
      <p>Name: Mukul Singh</p>
      <p>Email: er.mukulsingh16@gmail.com</p>
      <h1>Image Editor</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        fetchImages={fetchImages}
        error={error}
      />
      {images?.length > 0 && (
        <ImageGallery images={images} addImageToCanvas={addImageToCanvas} />
      )}
      {selectedImage && <CanvasEditor imageUrl={selectedImage} />}
    </div>
  );
};

export default ImageEditorApp;
