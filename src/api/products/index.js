import { useQuery } from "@tanstack/react-query";

//#region GET PRODUCTS
const getProducts = async () => {
  const res = await fetch("/data/product.json");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    config: {
      refetchOnWindowFocus: false,
    },
  });
}
//#endregion

export { useGetProducts };
