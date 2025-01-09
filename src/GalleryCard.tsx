import React from "react";
import "./GalleryCard.css";

interface GalleryCardProps {
  href: string;
  title: string;
  description: string;
  dateCreated: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  href,
  title,
  description,
  dateCreated,
}) => {
  const formattedDate = new Date(dateCreated).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="gallery-card">
      <div className="card-content">
        <h2 className="image-title">{title}</h2>
        <img src={href} alt={title} className="gallery-image" />
        <p className="image-date">{formattedDate}</p>
      </div>
      <div className="divider"></div> 
      <div className="card-details">
        <p className="image-description">
          {description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default GalleryCard;
