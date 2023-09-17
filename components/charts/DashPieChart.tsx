import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, ArcElement, Title, Tooltip, Legend, ChartDataLabels);


function DashPieChart({ data }: any) {

    const [plugin, setPlugin] = useState([{
        id: "doughnut",
        beforeDraw: function (chart: any) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            
            ctx.save();
        },
        afterDraw: function (chart: any) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            
            ctx.save();
        },
        emptyDoughnut: {
            color: '#EEF2F8',
        }
    }])
    
useEffect(() => {
    setPlugin([{
        id: "doughnut",
        beforeDraw: function (chart: any) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            
            ctx.save();
        },
        afterDraw: function (chart: any) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            
            ctx.save();
        },
        emptyDoughnut: {
            color: '#EEF2F8',
        }
    }])
}, [data])

    
    //data values
    const chartData = [12, data?.transactionVolumeCard, data?.transactionVolumeCash, data?.transactionVolumeTransfer] || [1]

    const count = {
        labels: ['No values', 'Card', 'Cash', 'Transfer'],
        datasets: [
            {
                data: chartData,
                borderColor: 'transparent',
                backgroundColor: [
                    '#EEF2F8',
                    '#007AF4',
                    '#FECA03',
                    '#00CFFD'
                ],
                hoverBackgroundColor: [
                    '#EEF2F8',
                    '#007AF4',
                    '#FECA03',
                    '#00CFFD'
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
            
            ctx.save();
        },
        afterDraw: function (chart: any) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            ctx.save();
        },
        emptyDoughnut: {
            color: '#EEF2F8',
        }
    }]



    return (
        <div>
            <Doughnut
                data={count}
                width={160}
                height={160}
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
                        },
                    }
                }}
                plugins={plugin}
            />
        </div>
    )
}

export default DashPieChart;