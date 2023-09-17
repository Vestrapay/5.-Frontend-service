import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, ArcElement, Title, Tooltip, Legend, ChartDataLabels);


function CollectionsVolumeChart() {

    const count = {
        labels: ['Approved', 'Failed'],
        datasets: [
            {
                data: [78, 22],
                borderColor: 'transparent',
                backgroundColor: [
                    '#50D39C',
                    '#FF291F'

                ],
                hoverBackgroundColor: [
                    '#50D39C',
                    '#FF291F'
                ],
                borderSkipped: true,
                // borderAlign: 'inner',
                // borderJoinStyle: 'round',
                // borderRadius: Number.MAX_VALUE,
                // spacing: -30,
                // borderWidth: 15
            }
        ]
    };

    const plugins = [{
        id: "doughnut",
        beforeDraw: function (chart: any) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            var text = "8909 Total",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2.25;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

    return (
        <div>
            <Doughnut
                data={count}
                width={140}
                height={140}
                options={{
                    // position: 'center',
                    // tooltips: {
                    //     enabled: true,
                    // },
                    responsive: false,
                    cutout: '60%',
                    layout: {
                        padding: 5,
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        datalabels: {
                            color: '#717E9500',
                            align: "end",
                            anchor: "end",
                            font: {
                                family: "Poppins",
                                size: 14,
                                weight: 600
                            },
                        }
                    }
                }}
                plugins={plugins}
            />
        </div>
    )
}

export default CollectionsVolumeChart;