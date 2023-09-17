import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, LineElement, LineController, CategoryScale, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip, Legend, ChartDataLabels);

function DashTransReport({ data }: any) {

    const { thisWeekGraphData, lastWeekGraphData } = data

    const chartData = {
        labels: thisWeekGraphData?.axis?.map((each: any) => each?.day) || ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                data: thisWeekGraphData?.axis?.map((each: any) => each?.total) || [0, 0, 0, 0, 0, 0, 0],
                label: 'This week',
                fill: 'origin',
                lineTension: 0.4,
                borderColor: "#007AF4",
                // borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
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
                borderWidth: 3
            },
            {
                data: lastWeekGraphData?.axis?.map((each: any) => each?.total) || [0, 0, 0, 0, 0, 0, 0],
                label: 'Last week',
                fill: 'origin',
                lineTension: 0.4,
                borderColor: "#FFAA09",
                //   borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                //   borderJoinStyle: "miter",
                pointBorderColor: "#FFAA09",
                pointBackgroundColor: "#FFAA09",
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#FFAA09",
                pointHoverBorderColor: "transparent",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                borderWidth: 3
            }
        ]
    };

    return (
        <Line
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
            }}
        />
    )
}

export default DashTransReport