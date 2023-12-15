import useProductStore from "stores/product";
import { useGetProduct } from "api/product";
import { getAttributesAvailability } from "utils";

import classNames from "classnames";
import React, { useState, useMemo, useEffect } from "react";
import "./style.css";

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: productData } = useGetProduct();
  const { productVariants = [] } = productData || {};

  const { selectedAttributes = {} } = useProductStore((state) => ({
    selectedAttributes: state.selectedAttributes,
  }));

  const attributesAvailability = getAttributesAvailability(productVariants);

  useEffect(() => {
    if (Object.keys(selectedAttributes).length === 0) return;
    setSelectedImageIndex(0);
    setCurrentIndex(0);
  }, [selectedAttributes]);

  const imagesById = useMemo(
    () =>
      productVariants.reduce((acc, variant) => {
        const { id, images } = variant;
        acc[id] = images;
        return acc;
      }, {}),
    [productVariants]
  );

  const imagesBasedOnSelectedAttributes = selectedAttributes
    ? attributesAvailability[Object.keys(selectedAttributes)?.[0]]?.[
        Object.values(selectedAttributes)?.[0]
      ]?.images?.flat()
    : null;

  const flattenImages = useMemo(
    () =>
      imagesBasedOnSelectedAttributes || [
        ...new Set(Object.values(imagesById).flat()),
      ],
    [imagesBasedOnSelectedAttributes, imagesById]
  );

  const displayedImages = useMemo(
    () => flattenImages.slice(currentIndex, currentIndex + 5),
    [flattenImages, currentIndex]
  );

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, flattenImages.length - 5)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="image-container">
      <div className="image-gallery">
        <img width={400} src={flattenImages[selectedImageIndex]} alt="" />
      </div>

      <div className="image-carousel-container">
        <button
          className="prev-button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        {displayedImages.map((image, index) => (
          <img
            width={80}
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
          className="next-button"
          onClick={handleNext}
          disabled={currentIndex + 5 >= flattenImages.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
