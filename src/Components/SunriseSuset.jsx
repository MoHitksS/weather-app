import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
const options = {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: true
            }

        },
        y: {
            grid: {
                display: false
            },
            display: false,
            ticks: {
                display: false,
            }
        }
    }
}

const SunriseSuset = ({ sunTiming }) => {
    const [time, setTime] = useState();

    const data = {
        labels: [time?.sunrise, '1pm', time?.sunset],
        datasets: [
            {
                label: 'suntime',
                fill:{
                    target:'origin',
                    below:"#666667"
                },
                lineTension: 0.4,
                backgroundColor: '#ec6e4c',
                borderColor: '#eee',
                borderWidth: 2,
                data: [0, 3, 0]
            }
        ]
    };


    useEffect(() => {
        if (sunTiming) {
            let initial = sunTiming?.sunrise.split(":")[0];
            let end = sunTiming?.sunset.split(":")[0];
            const time = {
                sunrise: `${+initial-1}am`,
                sunset: `${+end+1}pm`
            }
            setTime(time)
        }
    }, [sunTiming]);

    return (
        <>
            <Line data={data} options={options} />
        </>

    )
}

export default SunriseSuset