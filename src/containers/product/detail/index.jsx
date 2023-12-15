import { AttributeBox } from "components";
import { useGetProduct } from "api/product";
import { formatPrice } from "utils";

import React from "react";
import "./style.css";

export default function Detail() {
  const { data: productData } = useGetProduct();
  const { baremList, selectableAttributes } = productData || {};

  const minPrice = formatPrice(
    Math.min(...baremList.map((item) => item.price))
  );
  const maxPrice = formatPrice(
    Math.max(...baremList.map((item) => item.price))
  );

  console.log(productData);

  return (
    <div>
      {/* Product Name */}
      <span className="product-name">{productData.productTitle}</span>

      {/* Product Price */}
      <div className="product-price">
        {minPrice === maxPrice ? (
          <span className="product-price__single">{minPrice}</span>
        ) : (
          <>
            <span className="product-price__min">{minPrice}</span>
            <span className="product-price__separator"> - </span>
            <span className="product-price__max">{maxPrice}</span>
          </>
        )}
      </div>

      {/* Product Attributes */}
      <div className="product-attributes">
        {selectableAttributes.map((attribute) => (
          <div className="attribute-container" key={attribute.name}>
            <div className="attribute-container__title_container">
              <span className="attribute-container__title">
                {attribute.name}
              </span>
              <span className="attribute-container__colon">:</span>
            </div>

            <div className="attribute-boxes">
              {attribute.values.map((value) => (
                <AttributeBox key={value} name={value} group={attribute.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
