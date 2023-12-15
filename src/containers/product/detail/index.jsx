import React, { useEffect } from "react";
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

  const {
    selectedAttributes = {},
    setQuantity,
    quantity,
  } = useProductStore((state) => ({
    selectedAttributes: state.selectedAttributes,
    setQuantity: state.setQuantity,
    quantity: state.quantity,
  }));

  const minPrice = formatPrice(
    Math.min(...baremList.map((item) => item.price))
  );
  const maxPrice = formatPrice(
    Math.max(...baremList.map((item) => item.price))
  );

  const attributeAvailability = getAttributesAvailability(productVariants);

  useEffect(() => {
    if (baremList.length === 0) return;
    baremList.sort((a, b) => a.minimumQuantity - b.minimumQuantity);
    setQuantity(baremList[0].minimumQuantity);
  }, [baremList]);

  console.log(quantity);

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

        <span
          className="product-price__unit"
          style={{
            fontSize: 14,
            fontWeight: "normal",
            marginLeft: 8,
            color: "rgba(0, 0, 0, 0.4)",
          }}
        >
          / Adet
        </span>
        <div
          style={{
            fontSize: 14,
            fontWeight: "normal",
            color: "rgba(0, 0, 0, 0.4)",
            marginTop: 8,
          }}
        >
          {quantity} adet (Minimum Sipariş Adeti)
        </div>
      </div>

      {/* Product Attributes */}
      <div className="product-attributes" style={{ marginTop: 20 }}>
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

      <div style={{ backgroundColor: "#eee", padding: 8, marginTop: 20 }}>
        {/* Barem List */}
        <div className="attribute-container">
          <div className="attribute-container__title_container">
            <span className="attribute-container__title">
              Toptan Fiyat <br /> (Adet)
            </span>
            <span className="attribute-container__colon">:</span>
          </div>

          <div className="attribute-boxes">
            {baremList.map((barem, index) => (
              <div className="barem-box" key={index}>
                <div>
                  <span className="barem-box__min">
                    {barem.minimumQuantity}
                  </span>
                  <span className="barem-box__separator"> - </span>
                  <span className="barem-box__max">
                    {barem.maximumQuantity}
                  </span>
                </div>
                <span className="barem-box__price">
                  {formatPrice(barem.price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="attribute-container" style={{ marginTop: 40 }}>
          <div className="attribute-container__title_container">
            <span className="attribute-container__title">Adet</span>
            <span className="attribute-container__colon">:</span>
          </div>

          <div
            className="attribute-boxes"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="number"
              className="quantity-input"
              style={{
                height: 32,
                width: 100,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: "normal",
                color: "rgba(0, 0, 0, 0.4)",
              }}
            >
              Adet
            </span>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="attribute-container" style={{ marginTop: 40 }}>
        <div className="attribute-container__title_container">
          <span
            className="attribute-container__title"
            style={{ fontWeight: "bold", fontSize: 16 }}
          >
            Toplam
          </span>
          <span className="attribute-container__colon">:</span>
        </div>

        <div
          className="attribute-boxes"
          style={{ fontWeight: "bold", fontSize: 26 }}
        >
          {formatPrice(123)}
        </div>
      </div>

      {/* Checkout Button */}
      <div className="attribute-container" style={{ marginTop: 20 }}>
        <div className="attribute-container__title_container" />

        <div className="attribute-boxes">
          <button className="checkout-button">Sepete Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
