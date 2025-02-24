import { $api } from "../../../request";

export const fetchAllWebUsers = async () => {
  return await $api.get("/api/v1/web-users");
};

export const updateWebUser = async (id, data) => {
  return await $api.put(`/api/v1/web-users/${id}`, data);
};

export const deleteWebUser = async (id) => {
  return await $api.delete(`/api/v1/web-users/${id}`);
};

export const createWebUser = async (data) => {
  return await $api.post("/api/v1/auth", data);
};
