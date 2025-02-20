import { $api } from "../../../request";

export const fetchApplicationDashboardStats = async (start, end, type) => {
  return await $api.get("/api/v1/application/statistics", {
    params: {
      start,
      end,
      type,
    },
  });
};
