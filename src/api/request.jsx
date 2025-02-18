import axios from "axios";

// const BASE_API_URL = "http://localhost:8080";
const BASE_API_URL = "http://45.92.173.205:8080";
// baseURL: "http://45.92.173.205:8080/api/v1/application/",

const $api = axios.create({
  baseURL: `${BASE_API_URL}/api/v1/application/`,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


$api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    throw error;
  }
);

export { $api, BASE_API_URL };


export const apply = async (data) => {
  const response = await $api.post("save", data);
  return response.data;
};
