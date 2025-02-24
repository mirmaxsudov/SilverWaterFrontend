import axios from "axios";
import { notifyError } from "../helper/toast";

// const BASE_API_URL = "http://localhost:8080";
const BASE_API_URL = "https://www.silver-water.uz";
// baseURL: "http://45.92.173.205:8080/api/v1/application/",

const $api = axios.create({
  baseURL: `${BASE_API_URL}`,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) window.location.href = "/login";
    else if (error.response?.status === 403) {
      notifyError("Siz bu amalni bajara olmaysiz!");
      return Promise.resolve();
    }

    throw error;
  },
);

export { $api, BASE_API_URL };

export const apply = async (data) => {
  const response = await $api.post("/api/v1/application/save", data);
  return response.data;
};
