import React from "react";
import { AttributeBox } from "components";
import { useGetProduct } from "api/product";
import useProductStore from "stores/product";
import { formatPrice, getAttributesAvailability } from "utils";
import "./style.css";

const Detail = () => {
  const { data: productData } = useGetProduct();
  const {
    baremList = [],
    selectableAttributes = [],
    productTitle = "",
    productVariants = [],
  } = productData || {};

  const { selectedAttributes = {} } = useProductStore((state) => ({
    selectedAttributes: state.selectedAttributes,
  }));

  const minPrice = formatPrice(
    Math.min(...baremList.map((item) => item.price))
  );
  const maxPrice = formatPrice(
    Math.max(...baremList.map((item) => item.price))
  );

  const attributeAvailability = getAttributesAvailability(productVariants);

  return (
    <div>
      {/* Product Name */}
      <span className="product-name">{productTitle}</span>

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
              {attribute?.values.map((value) => {
                const firstSelectedAttribute =
                  Object.keys(selectedAttributes)[0];
                const firstSelectedAttributeValue =
                  Object.values(selectedAttributes)[0];

                const isDisableConditionMet =
                  attribute.name !== firstSelectedAttribute &&
                  attributeAvailability[attribute.name] &&
                  attributeAvailability[firstSelectedAttribute] &&
                  attributeAvailability[firstSelectedAttribute][
                    firstSelectedAttributeValue
                  ] &&
                  !attributeAvailability[firstSelectedAttribute][
                    firstSelectedAttributeValue
                  ].values.includes(value);

                return (
                  <AttributeBox
                    key={value}
                    name={value}
                    group={attribute.name}
                    disabled={isDisableConditionMet}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
