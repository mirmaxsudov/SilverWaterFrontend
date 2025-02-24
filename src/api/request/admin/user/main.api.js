import { $api } from "../../../request";

export const fetchUsersPage = async (
  page = 0,
  size = 10,
  query = "",
  order = "ASC",
  role = "ALL",
  sortBy = "ID",
) => {
  const res = await $api.get("/api/v1/user/page", {
    params: {
      page,
      size,
      query,
      order,
      role,
      sortBy,
    },
  });

  return res;
};

export const deleteUserById = async (userId) => {
  $api.delete(`/api/v1/user/${userId}`);
};
