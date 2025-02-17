import { PieChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <section className={"dashboard-section"}>
      <div className={"container mx-auto"}>
        <h1 className="text-3xl font-bold">{t("dashboard.title")}</h1>
        <div className={"dashboard-info grid grid-cols-4 gap-[30px] mt-10"}>
          <DashboardInfoItem />
          <DashboardInfoItem />
          <DashboardInfoItem />
          <DashboardInfoItem />
        </div>
        <h1>Pie Chart</h1>
        <div style={{ width: 300, height: 300 }}>
          <PieChart
            series={[
              {
                data: [
                  { id: "Category A", value: 40 },
                  { id: "Category B", value: 30 },
                  { id: "Category C", value: 20 },
                  { id: "Category D", value: 10 },
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -45,
                endAngle: 225,
                cx: 150,
                cy: 150,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const DashboardInfoItem = () => {
  return (
    <div
      className={"bg-[#fff] p-5 rounded-lg pe-0 shadow w-full h-full border"}
    >
      <div className={"grid grid-cols-3"}>
        <div className={"col-span-2"}>
          <p>Total User</p>
          <p>40,689</p>
        </div>
        <div
          className={
            "icon flex items-center justify-center bg-sky-100 rounded-full h-[60px] w-[60px]"
          }
        >
          <svg
            width="32"
            height="24"
            viewBox="0 0 32 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.587821"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.66667 5.33333C6.66667 8.27885 9.05449 10.6667 12 10.6667C14.9455 10.6667 17.3333 8.27885 17.3333 5.33333C17.3333 2.38781 14.9455 0 12 0C9.05449 0 6.66667 2.38781 6.66667 5.33333ZM20 10.6667C20 12.8758 21.7909 14.6667 24 14.6667C26.2091 14.6667 28 12.8758 28 10.6667C28 8.45753 26.2091 6.66667 24 6.66667C21.7909 6.66667 20 8.45753 20 10.6667Z"
              fill="#8280FF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9778 13.3333C5.68255 13.3333 0.517678 16.5687 0.000868912 22.9323C-0.0272823 23.2789 0.635616 24 0.970003 24H22.9956C23.9972 24 24.0128 23.194 23.9972 22.9333C23.6065 16.3909 18.3616 13.3333 11.9778 13.3333ZM31.2746 24L26.1333 24C26.1333 20.9988 25.1417 18.2291 23.4683 16.0008C28.0103 16.0505 31.7189 18.3469 31.998 23.2C32.0092 23.3955 31.998 24 31.2746 24Z"
              fill="#8280FF"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
