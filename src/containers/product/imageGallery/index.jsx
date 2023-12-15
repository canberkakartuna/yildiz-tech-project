import useProductStore from "stores/product";
import { useGetProduct } from "api/product";
import { getAttributesAvailability } from "utils";

import classNames from "classnames";
import React, { useState } from "react";
import "./style.css";

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, flattenImages.length - 5)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const { data: productData } = useGetProduct();
  const { selectedAttributes = {} } = useProductStore((state) => ({
    selectedAttributes: state.selectedAttributes,
  }));

  const { productVariants = [] } = productData || {};

  const attributeAvailability = getAttributesAvailability(productVariants);

  console.log("attributeAvailability", attributeAvailability);
  console.log("selectedAttributes", selectedAttributes);

  const imagesById = productVariants.reduce((acc, variant) => {
    const { id, images } = variant;
    acc[id] = images;
    return acc;
  }, {});

  const flattenImages = [...new Set(Object.values(imagesById).flat())];
  const displayedImages = flattenImages.slice(currentIndex, currentIndex + 5);

  return (
    <div className="image-container">
      <div className="image-gallery">
        <img src={flattenImages[selectedImageIndex]} alt="" />
      </div>

      <div className="image-carousel-container">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="prev-button"
        >
          Previous
        </button>
        {displayedImages.map((image, index) => (
          <img
            key={index}
            className={classNames("image-carousel", {
              "image-carousel-selected":
                selectedImageIndex === index + currentIndex,
            })}
            src={image}
            alt=""
            onClick={() => setSelectedImageIndex(index + currentIndex)}
          />
        ))}
        <button
          onClick={handleNext}
          disabled={currentIndex + 5 >= flattenImages.length}
          className="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
