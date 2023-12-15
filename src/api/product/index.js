import { useQuery } from "@tanstack/react-query";

//#region GET PRODUCTS
const getProduct = async () => {
  const res = await fetch("/data/product.json");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

function useGetProduct() {
  return useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
    config: {
      refetchOnWindowFocus: false,
    },
  });
}
//#endregion

export { useGetProduct };
