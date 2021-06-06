import React from "react";
import Chart from "react-apexcharts";

//Line Chart with the dots 
//Parameters : 
// const LineGraphData = {
//     LineSeries: [
//         {
//             name: "High - 2014",
//             data: [28, 29, 33, 36, 32, 32, 32]
//         },
//         {
//             name: "Low - 2013",
//             data: [12, 11, 14, 18, 17, 13, 13]
//         },
//     ],
//     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     Labels: { xlabel: "Month", ylabel: "Temperature" },
//     title: "Average Temperature",
//     initalValue: { min: 0, max: 40 },
// };


const LineChart = ({ data }) => {
    // console.log(data)
    const state = {
        series: { data }.data.LineSeries,
        options: {
            chart: {
                height: 400,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: true
                }
            },
            colors: ['#77B6EA', '#545454'],  //Color for dots 
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: { data }.data.title,
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7', // Color of Grid Line
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            markers: {
                size: 0.5
            },
            xaxis: {
                categories: { data }.data.categories,  // Its for the X axis marking
                title: {
                    text: { data }.data.Labels.xlabel
                }
            },
            yaxis: {
                title: {
                    text: { data }.data.Labels.ylabel
                },
                min: { data }.data.initalValue.min,
                max: { data }.data.initalValue.max
            },
            legend: {  // Options for placing line details
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        },
    };

    return (
        <div id="chart">
            <Chart options={state.options} series={state.series} type="line" height={350} />
        </div>
    );
}

export default LineChart;