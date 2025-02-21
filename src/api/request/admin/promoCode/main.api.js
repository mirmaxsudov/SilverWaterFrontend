import { $api } from "../../../request";

export const addPromoCode = async (data) => {
  return await $api.post("/api/v1/promo-codes", data);
};
