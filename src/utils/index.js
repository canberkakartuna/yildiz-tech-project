export const formatPrice = (price) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
};

export const filterArrayByAttributes = (inputArray, inputObject) => {
  return inputArray.filter((product) => {
    const attributes = product.attributes;

    // Check if all attributes in the product match the inputObject
    return Object.keys(inputObject).every((key) => {
      const inputValue = inputObject[key];
      return attributes.some((attribute) => {
        return attribute.name === key && attribute.value === inputValue;
      });
    });
  });
};
