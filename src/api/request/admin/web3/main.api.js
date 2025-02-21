import { $api } from "../../../request";

export const fetchAllWeb3Products = async () => {
  return await $api.get("/api/v1/web3-product");
};

export const deleteWeb3Product = async (id) => {
  return await $api.delete(`/api/v1/web3-product/${id}`);
};
