import React from "react";
import Chart from "react-apexcharts";

// Apex chart Format 
// const state = {
//     series: [44, 55, 41, 17],
//     chartOptions: {
//       labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
//     }
//   };

//   return ()
//   <Chart
//         options={data.chartOptions}
//         series={data.series}
//         type={type}
//         width={options.width}
//     />;

//<ApexPieChart type="donut" options={{ width: "500" }} data={state} />

const ApexPieChart = ({ type, data, options }) => {
    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={data.chartOptions}
                        series={data.series}
                        type={type}
                        width={options.width}
                    />
                </div>
            </div>
        </div>
    );
}

export default ApexPieChart;
