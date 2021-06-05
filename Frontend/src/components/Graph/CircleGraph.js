import React from 'react'
import { Line } from 'react-chartjs-2';

const CircleGraph = props => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        datasets: [
            {
                lable: 'Sales',
                data: [3, 2, 1, 5, 1, 2]
            }
        ]
    }
    return (
        <Line data={data} />
    )
}


export default CircleGraph
