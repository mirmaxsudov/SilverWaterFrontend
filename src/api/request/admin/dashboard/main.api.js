import { $api, BASE_API_URL } from "../../../request";

export const fetchUserDashboardStats = async () => {
  const res = await $api.get(
    `${BASE_API_URL}/api/v1/dashboard/user-stats-active`
  );
  return res.data;
};

export const fetchUserDashboardStatsFull = async () => {
  const res = await $api.get(
    `${BASE_API_URL}/api/v1/dashboard/user-stats-full`
  );
  return res.data;
};
