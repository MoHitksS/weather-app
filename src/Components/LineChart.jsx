import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Box, Text } from "@chakra-ui/react";
const options = {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: true,
            },
            ticks: {
                color:"black",
                font:{
                    weight:600,
                    size:13
                }
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                display: false,
            }
        }
    }
}
const LineChart = ({ weather }) => {
    const [hourlyData, setHourlyData] = useState([]);
    let today = new Date();
    let check = +(today.getHours());
    let hour = +(today.getHours() % 12);
    let pointer = 0
    const time = Array.from({ length: 6 }, (_, i) => (check >= 12 && check + i < 24) ? `${hour + i}pm` : (check + i === 24) ? '12am' : (hour + i === 12) ? '12pm' : (hour + i < 12 && check + i < 12) ? `${++pointer}pm`:`${++pointer}am`);
    const temp = hourlyData?.filter((ele, index) => index >= hour && index < hour + 6).map((ele) => +((ele.temp - 273).toFixed()));
    const tempLabel = temp.map((ele) => `${ele}°`)
    const data = {
        labels: tempLabel,
        datasets: [
            {
                label: 'temp',
                data: temp,
                borderWidth: 1,
                backgroundColor: "transparent",
                borderColor: "rgb(68 172 233)"
            }
        ]
    };

    useEffect(() => {
        if (weather) {
            weather?.hourly?.sort((a,b) => a.dt - b.dt)
            let twentyfour = weather?.hourly?.filter((ele, index) => index)
            setHourlyData(twentyfour)
        }
    }, [weather]);
    return (
        <>
            <Line data={data} options={options} />
            <Box display={'flex'} justifyContent='space-between' fontSize={'small'} fontWeight='bold' color={'#838384'} padding={'0px 2px'}>
                {time?.map((ele, index) => {
                    return <Text key={index}>{ele}</Text>
                })}
            </Box>
        </>

    )
}

export default LineChart