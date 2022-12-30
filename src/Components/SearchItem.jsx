import { Box, Button, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFillSunFill, BsFillCloudRainFill, BsFillCloudSnowFill } from 'react-icons/bs';
import { AiFillCloud } from 'react-icons/ai';
import { RiMistFill } from 'react-icons/ri';
const { REACT_APP_API_KEY } = process.env
const SearchItem = ({ data, setWeather, setText, getCurrentData }) => {
    const [weatherData, setWeatherData] = useState([]);

    const getWeatherData = ({ lat, lon }) => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${REACT_APP_API_KEY}`).then((res) => {
            setWeatherData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleWeatherData = () => {
        setWeather(weatherData);
        setText('');
        getCurrentData(weatherData)
    }

    useEffect(() => {
        getWeatherData(data)
    }, []);

    return (
        weatherData &&
        <Button onClick={() => handleWeatherData()} width={'100%'} display={'flex'} textAlign='left' _hover={{ bg: "white" }} _focus={{ bg: "white" }} background={'none'} fontSize='small' padding='35px 15px' alignItems={'center'} justifyContent='space-between'>
            <Box display={'flex'} width={'70%'}  >
                <Text fontWeight={'bold'} >{data?.name}</Text>,  <Text marginLeft={'2px'} color={'#b8b8b9'} overflow={'hidden'} textOverflow='ellipsis'>{data?.state}</Text>
            </Box>

            <Box display={'flex'} gap='10px' alignItems={'center'}>
                <Box fontSize={'small'} textAlign='center'>
                    <Text fontWeight={'bold'}>{`${((weatherData?.current?.temp) - 273).toFixed()}°C`}</Text>
                    <Text color={'#b8b8b9'} fontSize={'x-small'}>{weatherData?.current?.weather && weatherData?.current?.weather[0]?.main}</Text>
                </Box>
                <Box>
                    {/* {weatherData?.current?.weather && weatherData?.current?.weather[0]?.main === 'Clear' &&
                        <BsFillSunFill fontSize={'x-large'} fill='#ffe634' />
                    }

                    {weatherData?.current?.weather && weatherData?.current?.weather[0]?.main === 'Clouds' &&
                        <AiFillCloud fontSize={'x-large'} fill='skyblue' />
                    }

                    {weatherData?.current?.weather && weatherData?.current?.weather[0]?.main === 'Rain' &&
                        <BsFillCloudRainFill fontSize={'x-large'} fill='skyblue' />
                    }

                    {weatherData?.current?.weather && weatherData?.current?.weather[0]?.main === 'Mist' &&
                        <RiMistFill fontSize={'x-large'} fill='black' />
                    }

                    {weatherData?.current?.weather && weatherData?.current?.weather[0]?.main === 'Snow' &&
                        <BsFillCloudSnowFill fontSize={'x-large'} fill='skyblue' />
                    } */}
                    <Image src={`https://openweathermap.org/img/wn/${weatherData?.current?.weather[0]?.icon}@2x.png`} alt={weatherData?.current?.weather[0]?.main} height='50px' />
                </Box>
            </Box>
        </Button>
    )
}

export default SearchItem