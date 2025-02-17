import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { fetchUserDashboardStats, fetchUserDashboardStatsFull } from "../../../../api/request/admin/dashboard/main.api";
import { Skeleton } from "@mui/material";

const UserDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState(null);
    const [fullLoading, setFullLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const result = await fetchUserDashboardStats();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const result = await fetchUserDashboardStatsFull();
                setFullData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setFullLoading(false);
            }
        }
        )();
    }, []);

    if (loading) {
        return (
            <section className="user-dashboard-section py-[50px]">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-2xl">User Statistics</h3>
                </div>
                <Skeleton variant="rectangular" width={600} height={300} />
            </section>
        );
    }

    if (error) {
        return (
            <section className="user-dashboard-section py-[50px]">
                <div className="text-red-500">Error: {error}</div>
            </section>
        );
    }

    if (!data) {
        return (
            <section className="user-dashboard-section py-[50px]">
                <h3 className="font-bold text-2xl mb-5">User Statistics</h3>
                <p>No data available.</p>
            </section>
        );
    }

    const totalUsers = data.total;
    const userStatsWithPercentage = [
        {
            label: `Admins (${data.admins})`,
            value: (data.admins / totalUsers) * 100,
            color: "#00bcd4",
        },
        {
            label: `Users (${data.users})`,
            value: (data.users / totalUsers) * 100,
            color: "#2196f3",
        },
        {
            label: `Devs (${data.devs})`,
            value: (data.devs / totalUsers) * 100,
            color: "#e91e63",
        },
        {
            label: `Operators (${data.operators})`,
            value: (data.operators / totalUsers) * 100,
            color: "#3f51b5",
        },
    ]

    const fullTotalUsers = fullData.total;
    const fullUserStatsWithPercentage = [
        {
            label: `Admins (${fullData.admins})`,
            value: ((fullData.admins / fullTotalUsers) * 100).toFixed(2),
            color: "#00bcd4",
        },
        {
            label: `Users (${fullData.users})`,
            value: ((fullData.users / fullTotalUsers) * 100).toFixed(2),
            color: "#2196f3",
        },
        {
            label: `Devs (${fullData.devs})`,
            value: ((fullData.devs / fullTotalUsers) * 100).toFixed(2),
            color: "#e91e63",
        },
        {
            label: `Operators (${fullData.operators})`,
            value: ((fullData.operators / fullTotalUsers) * 100).toFixed(2),
            color: "#3f51b5",
        },
    ]

    const valueFormatter = (item) => `${item.value}%`;

    return (
        <section className="user-dashboard-section py-[50px]">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-2xl">User Statistics</h3>
                <p className="font-semibold text-[20px]">({fullTotalUsers})</p>
            </div>
            <div className="overflow-hidden mt-5 flex gap-5 items-center justify-evenly">
                <div className="flex flex-col gap-5">
                    <h4 className="font-semibold underline underline-offset-4">
                        Active users
                    </h4>
                    <PieChart
                        series={[
                            {
                                data: userStatsWithPercentage,
                                highlightScope: { fade: "global", highlight: "item" },
                                faded: { innerRadius: 20, additionalRadius: -30, color: "#adad" },
                                valueFormatter,
                            },
                        ]}
                        width={600}
                        height={300}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <h4 className="font-semibold underline underline-offset-4">
                        To&#39;liq foydalanuvchilar
                    </h4>
                    <PieChart
                        series={[
                            {
                                data: fullUserStatsWithPercentage,
                                highlightScope: { fade: "global", highlight: "item" },
                                faded: { innerRadius: 20, additionalRadius: -30, color: "#adad" },
                                valueFormatter,
                            },
                        ]}
                        width={600}
                        height={300}
                    />
                </div>
            </div>
        </section>
    );
};

export default UserDashboard;