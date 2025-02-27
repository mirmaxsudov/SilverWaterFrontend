import { $api } from "../../request";

const BASE_BOT_NOTIFICATION_URL = "/api/v1/bot-notification";

export const sendMessage = async (message) => {
  return await $api.post(
    BASE_BOT_NOTIFICATION_URL + "/send?message=" + message
  );
};

export const fetchAll = async () => {
  return await $api.get(BASE_BOT_NOTIFICATION_URL + "/all");
};

export const resend = async notificationId => {
    return await $api.post(BASE_BOT_NOTIFICATION_URL + "/resend/" + notificationId)
}