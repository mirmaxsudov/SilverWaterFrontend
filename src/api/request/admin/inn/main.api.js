import { $api } from "../../../request";

export const fetchInnsByPage = async (page, limit, query = "") => {
  const res = await $api.get("/api/v1/inn/page", {
    params: { page, size: limit, query },
  });
  return res.data;
};

export const saveSingle = (request) => {
  return $api.post("/api/v1/inn/save", request);
};

export const deleteInnById = (id) => {
  $api.delete(`/api/v1/inn/${id}`);
};

export const editInn = (id, request) => {
  return $api.put(`/api/v1/inn/${id}`, request);
};

export const deleteInnsByIds = async (ids) => {
  const response = await $api.delete(`/api/v1/inn/delete-by-ids`, {
    data: ids,
  });
  return response.data;
};
