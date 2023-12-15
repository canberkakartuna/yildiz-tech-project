import { ImageGallery, ProductDetail } from "containers/product";
import { useGetProduct } from "api/product";

import React from "react";
import "./style.css";

export default function Products() {
  const { isLoading: isProductLoading } = useGetProduct();

  if (isProductLoading) return <div className="center-loading">Loading...</div>;

  return (
    <div className="flex-container">
      {/* Product Image & Slider */}
      <ImageGallery />

      {/* Product Details */}
      <ProductDetail />
    </div>
  );
}
