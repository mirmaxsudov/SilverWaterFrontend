import { LineChart } from "@mui/x-charts";
import "./ApplicationDashboard.css";

const ApplicationDashboard = () => {
  return (
    <div className="py-[50px]">
      <h2 className="text-2xl font-bold mb-5">Application Statistics</h2>
      <div className="flex flex-col gap-[30px]">
        <div className="flex items-center gap-[20px]">
          <label className="flex flex-col text-gray-700 font-medium">
            Start
            <input
              type="date"
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
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl 
               focus:ring-2 focus:ring-blue-500 focus:outline-none 
               transition-all duration-200 ease-in-out 
               hover:border-blue-400 hover:shadow-md 
"
            />
          </label>
          <label className="flex flex-col text-gray-700 font-medium">
            Type
            <select className="mt-1 p-3 border hover:border-blue-400 hover:shadow-md border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </label>
        </div>
        <LineChart
          dataset={[
            { x: 1, y: 2 },
            { x: 2, y: 5.5 },
            { x: 3, y: 2 },
            { x: 5, y: 8.5 },
            { x: 8, y: 1.5 },
            { x: 10, y: 5 },
          ]}
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
