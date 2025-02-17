import { $api } from "../../../request";

export const fetchUserDashboardStats = async () => {
  const res = await $api.get(
    "http://localhost:8080/api/v1/dashboard/user-stats-active"
  );
  return res.data;
};

export const fetchUserDashboardStatsFull = async () => {
  const res = await $api.get(
    "http://localhost:8080/api/v1/dashboard/user-stats-full"
  );
  return res.data;
};
