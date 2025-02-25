import { $api } from "../../../request";

export const fetchAllWeb3Products = async () => {
  return await $api.get("/api/v1/web3-product");
};

export const deleteWeb3Product = async (id) => {
  return await $api.delete(`/api/v1/web3-product/${id}`);
};

export const updateWeb3ProductPriority = async (web3Id, priority) => {
  const response = await $api.patch(
    `/api/v1/web3-product/update-priority/${web3Id}?priority=${priority}`
  );
  return response.data;
};
