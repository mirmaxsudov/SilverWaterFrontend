import { $api } from "../../../request";

export const fetchUsersPage = async (
  page = 0,
  size = 10,
  query = "",
  order = "ASC",
  sortBy = "ID"
) => {
  const res = await $api.get("/api/v1/bot-user/page", {
    params: {
      page,
      size,
      query,
      order,
      sortBy,
    },
  });
  return res;
};

export const deleteUserById = async (userId) => {
  $api.delete(`/api/v1/user/${userId}`);
};
