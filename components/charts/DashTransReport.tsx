import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, LineElement, LineController, CategoryScale, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip, Legend, ChartDataLabels);

function DashTransReport({ data }: any) {

    const thisDayGraphData = data?.map((each: any) => dayjs(each?.createdAt || new Date()).format('dd HH:mm'))

    const chartData = {
        labels: thisDayGraphData || ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                data: thisDayGraphData?.map((each: any) => each?.amount) || [0, 0, 0, 0, 0, 0, 0],
                label: 'Today',
                fill: 'origin',
                lineTension: 0.4,
                borderColor: "#382C7C",
                // borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                // borderJoinStyle: "miter",
                pointBorderColor: "#382C7C",
                pointBackgroundColor: "#382C7C",
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#382C7C",
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