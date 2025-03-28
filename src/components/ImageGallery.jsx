import React, { useState } from "react";

const ImageGallery = ({ images, addImageToCanvas }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 4;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      Math.max(0, Math.min(prev + direction, totalPages - 1))
    );
  };

  const displayedImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  return (
    <div className="image-gallery-container">
      <button
        className="prev-btn"
        onClick={() => handlePageChange(-1)}
        disabled={currentPage === 0}
      >
        {"<<"}
      </button>

      <div className="image-results">
        {displayedImages.map(({ id, urls, alt_description }) => (
          <div key={id} className="image-container">
            <img
              src={urls.small}
              alt={alt_description}
              className="image-thumb"
            />
            <button
              className="caption-btn"
              onClick={() => addImageToCanvas(urls.small)}
            >
              Add Captions
            </button>
          </div>
        ))}
      </div>

      <button
        className="next-btn"
        onClick={() => handlePageChange(1)}
        disabled={currentPage >= totalPages - 1}
      >
        {">>"}
      </button>
    </div>
  );
};

export default ImageGallery;
