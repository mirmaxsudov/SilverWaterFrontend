import { $api } from "../../../request";

export const fetchCategories = async (query) => {
  return await $api.get("/api/v1/products/get-categories", {
    params: {
      query,
    },
  });
};

export const saveProduct = async (data) => {
  return await $api.post("/api/v1/products", data);
};

export const fetchProductsPage = async (query = "") => {
  return await $api.get("/api/v1/products/page", {
    params: {
      query,
    },
  });
};

export const editProduct = async (id, data) => {
  return await $api.put(`/api/v1/products/${id}`, data);
};
