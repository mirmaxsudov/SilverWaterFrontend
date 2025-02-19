import { $api } from "../../../request";

// This function now returns an object: { total, inns: [...] }
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
