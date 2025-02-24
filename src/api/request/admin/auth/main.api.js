import { $api } from "../../../request";

export const login = async (data) => {
  return await $api.post("/api/v1/auth/authenticate", data);
};
