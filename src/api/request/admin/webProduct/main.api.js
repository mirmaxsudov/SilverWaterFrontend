import { $api } from "../../../request";

export const deleteById = async (id) => {
  await $api.delete(`/api/v1/web-product/${id}`);
};

export const deleteImageById = async (imageId) => {
  await $api.delete(`/api/v1/attachment/${imageId}`);
};

export const updateWebProductPriority = async (productId, priority) => {
  const response = await $api.patch(
    `/api/v1/web-product/update-priority/${productId}?priority=${priority}`
  );
  return response.data;
};
