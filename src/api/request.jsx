import axios from "axios";

const $api = axios.create({
  baseURL: "http://localhost:8080/api/v1/application/",
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

export { $api }


export const apply = async (data) => {
  const response = await $api.post("save", data);
  return response.data;
};
