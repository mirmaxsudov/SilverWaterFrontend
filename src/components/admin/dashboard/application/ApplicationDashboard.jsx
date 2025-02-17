
const ApplicationDashboard = () => {
    return (
        <div>
            <TickParamsSelector
                tickPlacement={tickPlacement}
                tickLabelPlacement={tickLabelPlacement}
                setTickPlacement={setTickPlacement}
                setTickLabelPlacement={setTickLabelPlacement}
            />
            <BarChart
                dataset={dataset}
                xAxis={[
                    { scaleType: 'band', dataKey: 'month', tickPlacement, tickLabelPlacement },
                ]}
                {...chartSetting}
            />
        </div>
    )
}

export default ApplicationDashboard