import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts";
import "./ApplicationDashboard.css";
import { fetchApplicationDashboardStats } from "../../../../api/request/admin/application/main.api";

// Helper to compute default dates (last month to today)
const getDefaultDates = () => {
  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const startDate = oneMonthAgo.toISOString().split("T")[0];
  return { startDate, endDate };
};

// Helper to format raw data based on the aggregation type
const formatDashboardData = (data, chartType) => {
  return data.map((item) => {
    // Convert y to a number
    const y = Number(item.y);
    let xLabel = item.x;
    if (chartType === "DAY") {
      // Assuming item.x is "YYYY-MM-DD" → show just the day part
      const parts = item.x.split("-");
      xLabel = parts[2]; // e.g., "14"
    } else if (chartType === "WEEK") {
      // Assuming item.x is in the format "YYYY-Wxx", e.g., "2025-W07"
      if (item.x.includes("W")) {
        const parts = item.x.split("-W");
        xLabel = `Week ${parts[1]}`; // e.g., "Week 07"
      } else {
        xLabel = item.x;
      }
    } else if (chartType === "MONTH") {
      // Assuming item.x is "YYYY-MM" → show short month name
      const parts = item.x.split("-");
      const monthNumber = parts[1];
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthIndex = parseInt(monthNumber, 10) - 1;
      xLabel = monthNames[monthIndex];
    } else if (chartType === "YEAR") {
      // For year, we simply use the year string
      xLabel = item.x;
    }
    return { x: xLabel, y };
  });
};

const ApplicationDashboard = () => {
  // Set default dates on mount (last month to today)
  const { startDate, endDate } = getDefaultDates();
  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);
  const [chartType, setChartType] = useState("DAY"); // Default type is DAY
  const [data, setData] = useState([]);

  // Function to fetch chart data from the backend
  const fetchChartData = async () => {
    try {
      const response = await fetchApplicationDashboardStats(
        start,
        end,
        chartType,
      );
      // Format the data based on chartType before setting it to state
      const formattedData = formatDashboardData(response.data, chartType);
      setData(formattedData);
      console.log("Formatted Data:", formattedData);
    } catch (error) {
      console.error("Failed to fetch chart data", error);
      // Optionally display an error notification here
    }
  };

  // Fetch data on initial mount
  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-[50px]">
      <h2 className="text-2xl font-bold mb-5">Application Statistics</h2>
      <div className="flex flex-col gap-[30px]">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-[20px]">
          <label className="flex flex-col text-gray-700 font-medium">
            Start
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none 
                         transition-all duration-200 ease-in-out 
                         hover:border-blue-400 hover:shadow-md"
            />
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            End
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none 
                         transition-all duration-200 ease-in-out 
                         hover:border-blue-400 hover:shadow-md"
            />
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            Type
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none
                         hover:border-blue-400 hover:shadow-md"
            >
              <option value="DAY">Day</option>
              <option value="WEEK">Week</option>
              <option value="MONTH">Month</option>
              <option value="YEAR">Year</option>
            </select>
          </label>
          <button
            onClick={fetchChartData}
            className="self-end bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Apply
          </button>
        </div>
        {/* Chart */}
        <LineChart
          dataset={data.length > 0 ? data : []}
          xAxis={[{ dataKey: "x" }]}
          series={[{ dataKey: "y" }]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </div>
    </div>
  );
};

export default ApplicationDashboard;
