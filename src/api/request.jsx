import axios from "axios";

const $api = axios.create({
    baseURL: "http://localhost:3000/api/v1/application/",
});

export const apply = async (data) => {
    const response = await $api.post("save", data);
    return response.data;
};
