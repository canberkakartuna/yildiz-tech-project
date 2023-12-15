export const formatPrice = (price) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
};
