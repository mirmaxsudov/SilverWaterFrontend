import { $api } from "../../request";

export const sendMessage = async (message) => {
  return await $api.post("/api/v1/bot-notification/send?message=" + message);
};
