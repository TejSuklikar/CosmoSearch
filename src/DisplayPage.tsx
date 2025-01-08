import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GalleryCard from "./GalleryCard"; 
import "./DisplayPage.css";

interface ImageData {
  href: string;
  title: string;
  description: string;
  date_created: string;
}

const DisplayPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const images: ImageData[] = location.state?.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length === 0) {
    return (
      <div className="display-page">
        <p>No images available. Please go back and search again.</p>
        <button onClick={() => navigate("/")} className="back-button">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="display-page">
      <button onClick={() => navigate("/")} className="back-button">
        Back
      </button>
      <GalleryCard
        href={images[currentIndex].href}
        title={images[currentIndex].title}
        description={images[currentIndex].description}
        dateCreated={images[currentIndex].date_created}
      />
      <div className="navigation-buttons">
        <button onClick={handlePrevious} className="nav-button">
          &#9664;
        </button>
        <button onClick={handleNext} className="nav-button">
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default DisplayPage;
