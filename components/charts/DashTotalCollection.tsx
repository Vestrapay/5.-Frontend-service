import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, LineElement, BarElement, BarController, LineController, CategoryScale, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, PointElement, Tooltip, Legend, ChartDataLabels);

function DashTotalCollection({ data, typeChecker, displayChecker }: any) {

    const { currentWeekCardGraphData, currentWeekCollectionsGraphData, currentWeekTransferGraphData, currentWeekCashGraphData } = data || {} //thisWeekGraphData: thisWeekGraphData, lastWeekGraphData: lastWeekGraphData

    const totalCollectionSet = {
        labels: currentWeekCashGraphData?.axis?.map((each: any) => each?.day) || ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                data: currentWeekCollectionsGraphData?.axis?.map((each: any) => each?.total) || [0, 0, 0, 0, 0, 0, 0],
                label: 'Total collection',
                fill: 'origin',
                lineTension: 0.4,
                borderColor: "#007AF4",
                // borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderRadius: 5,
                backgroundColor: "#007AF4",
                // borderJoinStyle: "miter",
                pointBorderColor: "#007AF4",
                pointBackgroundColor: "#007AF4",
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#007AF4",
                pointHoverBorderColor: "transparent",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                borderWidth: 1
            },
        ]
    }

    const cardSet = {
        data: currentWeekCardGraphData?.axis?.map((each: any) => each?.total) || [0, 0, 0, 0, 0, 0, 0],
        label: 'Card',
        fill: 'origin',
        lineTension: 0.4,
        borderColor: "#007AF4",
        // borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderRadius: 5,
        backgroundColor: "#007AF4",
        // borderJoinStyle: "miter",
        pointBorderColor: "#007AF4",
        pointBackgroundColor: "#007AF4",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#007AF4",
        pointHoverBorderColor: "transparent",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        borderWidth: 1
    }

    const transferSet = {
        data: currentWeekTransferGraphData?.axis?.map((each: any) => each?.total) || [30, 20, 10, 0, 0, 0, 0],
        label: 'Transfer',
        fill: 'origin',
        lineTension: 0.4,
        borderColor: "#284DE3",
        // borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderRadius: 5,
        backgroundColor: "#284DE3",
        // borderJoinStyle: "miter",
        pointBorderColor: "#284DE3",
        pointBackgroundColor: "#284DE3",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#284DE3",
        pointHoverBorderColor: "transparent",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        borderWidth: 1
    }

    const cashSet = {
        data: currentWeekCashGraphData?.axis?.map((each: any) => each?.total) || [5, 5, 5, 0, 0, 0, 0],
        label: 'Cash',
        fill: 'origin',
        lineTension: 0.4,
        borderColor: "#FECA03",
        // borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderRadius: 5,
        backgroundColor: "#FECA03",
        // borderJoinStyle: "miter",
        pointBorderColor: "#FECA03",
        pointBackgroundColor: "#FECA03",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#FECA03",
        pointHoverBorderColor: "transparent",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        borderWidth: 1
    }

    const [individualSetData, setIndividualSet] = React.useState<any>([])

    React.useEffect(() => {
        let setArray: any[] = []
        // cardType transferType cashType
        if (displayChecker?.cardType) {
            setArray?.push(cardSet)
        }
        if (displayChecker?.transferType) {
            setArray?.push(transferSet)
        }
        if (displayChecker?.cashType) {
            setArray?.push(cashSet)
        }
        setIndividualSet(setArray)
        return () => setIndividualSet([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayChecker])


    const individualSet = {
        labels: currentWeekCashGraphData?.axis?.map((each: any) => each?.day) || ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: individualSetData
    }

    const chartData = typeChecker ? totalCollectionSet : individualSet;

    return (
        <Bar
            data={chartData}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            color: '#ddd'
                        }
                    }
                }
            }}
        />
    )
}

export default DashTotalCollection