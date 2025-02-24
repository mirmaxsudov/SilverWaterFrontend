import { $api } from "../../../request";

export const fetchAllTakenPromoCode = async () => {
  return await $api.get("/admin/taken-promo-code");
};

export const fetchAllTakenPromoCodeSearch = async (page, size, query) => {
  return await $api.get("/api/v1/taken-promo-code/page", {
    params: {
      page,
      size,
      search: query,
    },
  });
};

export const sendMessageToUser = async (userId, message) => {
  return await $api.post(
    `/api/v1/user/send-message/${userId}?message=${encodeURIComponent(message)}`,
  );
};
