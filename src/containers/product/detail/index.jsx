import React, { useMemo } from "react";
import { AttributeBox } from "components";
import { useGetProduct } from "api/product";
import useProductStore from "stores/product";
import { formatPrice } from "utils";
import "./style.css";

const Detail = () => {
  const { data: productData } = useGetProduct();
  const {
    baremList = [],
    selectableAttributes = [],
    productTitle = "",
    productVariants = [],
  } = productData || {};

  console.log("selectableAttributes", selectableAttributes);

  const { selectedAttributes = {} } = useProductStore((state) => ({
    selectedAttributes: state.selectedAttributes,
  }));

  const minPrice = formatPrice(
    Math.min(...baremList.map((item) => item.price))
  );
  const maxPrice = formatPrice(
    Math.max(...baremList.map((item) => item.price))
  );

  const attributeAvailability = useMemo(() => {
    const availability = {};

    productVariants.forEach((entry) => {
      entry.attributes.forEach((attribute) => {
        const attributeName = attribute.name;
        const attributeValue = attribute.value;

        if (!availability[attributeName]) {
          availability[attributeName] = {};
        }

        if (!availability[attributeName][attributeValue]) {
          availability[attributeName][attributeValue] = [];
        }

        availability[attributeName][attributeValue].push(
          entry.attributes.map((item) => item.value)
        );

        availability[attributeName][attributeValue] =
          availability[attributeName][attributeValue].flat();

        // remove attribute value
        availability[attributeName][attributeValue] = availability[
          attributeName
        ][attributeValue].filter((item) => item !== attributeValue);
      });
    });

    return availability;
  }, [productVariants]);

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
              {attribute?.values.map((value) => (
                <AttributeBox
                  key={value}
                  name={value}
                  group={attribute.name}
                  disabled={
                    attribute.name !== Object.keys(selectedAttributes)[0] &&
                    attributeAvailability[attribute.name] &&
                    attributeAvailability[Object.keys(selectedAttributes)[0]] &&
                    attributeAvailability[Object.keys(selectedAttributes)[0]][
                      Object.values(selectedAttributes)[0]
                    ] &&
                    !attributeAvailability[Object.keys(selectedAttributes)[0]][
                      Object.values(selectedAttributes)[0]
                    ].includes(value)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
