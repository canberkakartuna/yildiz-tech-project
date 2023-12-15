import React from "react";

import { useGetProducts } from "../../api/products";

export default function Products() {
  const { data, isLoading: isProductsLoading } = useGetProducts();

  console.log(data);

  if (isProductsLoading)
    return <div className="center-loading">Loading...</div>;

  return <div>Products</div>;
}
