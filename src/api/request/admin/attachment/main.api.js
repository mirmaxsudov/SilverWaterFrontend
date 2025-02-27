import { $api } from "../../../request";

export const saveFile = async formData => {
    return await $api.post("api/v1/attachment/upload", formData);
}