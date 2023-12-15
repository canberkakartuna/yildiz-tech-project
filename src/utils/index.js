export const formatPrice = (price) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
};

export const getAttributesAvailability = (productVariants) => {
  const availability = {};

  productVariants.forEach((entry) => {
    entry.attributes.forEach((attribute) => {
      const attributeName = attribute.name;
      const attributeValue = attribute.value;

      if (!availability[attributeName]) {
        availability[attributeName] = {};
      }

      if (!availability[attributeName][attributeValue]) {
        availability[attributeName][attributeValue] = {
          values: [],
          ids: [],
        };
      }

      availability[attributeName][attributeValue].values.push(
        entry.attributes.map((item) => item.value)
      );

      availability[attributeName][attributeValue].ids.push(entry.id);

      availability[attributeName][attributeValue].values =
        availability[attributeName][attributeValue].values.flat();

      // remove attribute value
      availability[attributeName][attributeValue].values = availability[
        attributeName
      ][attributeValue].values.filter((item) => item !== attributeValue);
    });
  });

  return availability;
};
