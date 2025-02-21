import { $api } from "../../../request";

export const fetchAllTakenPromoCode = async () => {
  return await $api.get("/admin/taken-promo-code");
};