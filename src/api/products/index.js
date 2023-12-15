import { useQuery } from "react-query";

//#region GET PRODUCTS
const getProducts = async () => {
  const res = await fetch("https://api.example.com/products");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function useGetProducts() {
  return useQuery("products", getProducts);
}
//#endregion
