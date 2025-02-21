import { $api, BASE_API_URL } from "../../../request";

export const fetchProductsNoCategory = async () => {
  return await $api.get(`${BASE_API_URL}/api/v1/products/no-category`);
};

export const fetchCategoryEdit = async (id) => {
  return await $api.get(`/api/v1/category/categoryEdit/${id}`);
};
