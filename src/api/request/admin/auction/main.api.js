import { $api } from "../../../request";

export const fetchAuctionsPage = async (page = 0, size = 10, query = "") => {
  const response = await $api.get("/api/v1/auction/page", {
    params: {
      page,
      size,
      query,
    },
  });

  return response;
};

export const deleteById = async (id) => {
  $api.delete(`/api/v1/auction/${id}`);
};

export const fetchAuctionProductsSearch = async (query) => {
  const res = await $api.get("/api/v1/auction-product/product-search", {
    params: {
      query,
    },
  });

  return res;
};

export const saveNewAuction = async (data) => {
  return await $api.post("/api/v1/auction", data);
};
