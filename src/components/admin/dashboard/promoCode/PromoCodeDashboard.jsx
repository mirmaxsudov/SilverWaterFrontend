import { LineChart } from "@mui/x-charts"

const PromoCodeDashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Promo Codes Stats</h1>
            <LineChart
                className="mx-auto"
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                series={[
                    {
                        data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                    },
                ]}
                width={1130}
                height={300}
            />
        </div>
    )
}

export default PromoCodeDashboard