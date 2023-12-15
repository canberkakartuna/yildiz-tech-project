import React from "react";

import { useGetProduct } from "api/product";

export default function ImageGallery() {
  const { data: productData } = useGetProduct();

  console.log(productData);
  return <div>ImageGallery</div>;
}
