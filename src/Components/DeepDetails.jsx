import { Box, Image, Skeleton, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsFillSunFill, BsFillCloudRainFill, BsFillCloudSnowFill } from 'react-icons/bs';
import { AiFillCloud } from 'react-icons/ai';
import { RiMistFill } from 'react-icons/ri';
import LineChart from './LineChart';
import SunriseSuset from './SunriseSuset';

const DeepDetails = ({ data, isLoading }) => {
    const [sunTimes, setSuntimes] = useState({
        sunrise: '',
        sunset: ''
    })

    function a(unix_timestamp) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours() % 12 || 12;
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        var formattedTime = hours + ':' + minutes.substr(-2)

        return formattedTime;
    }

    useEffect(() => {
        let sunrise = a(data?.current?.sunrise)
        let sunset = a(data?.current?.sunset)
        setSuntimes({ ...sunTimes, sunrise: sunrise, sunset: sunset })
    }, [data])

    return (
        isLoading ?
            <Box width={'100%'}>
                <Box width={'100%'} display={'flex'} alignItems='center' gap={'25px'} mt='5px'>
                    <Skeleton width={'100px'} height={'10px'} />
                    <Skeleton width={'70px'} height='70px' borderRadius={'100px'} />
                </Box>
                <Box width={'100%'} mt='10px' display={'flex'} flexDirection='column' gap={'10px'}>
                    <Skeleton width={'100%'} height={'150px'} />
                </Box>
                <Box width='100%' display={'flex'} justifyContent='space-between' mt={'10px'}>
                    <Box padding={'10px'} width={'40%'} borderRadius={'10px'} display={'flex'} flexDirection='column' gap={'10px'}>
                        <Skeleton width={'100%'} height={'8px'} />
                        <Skeleton width={'100%'} height={'8px'} />
                    </Box>
                    <Box padding={'10px'} width={'40%'} borderRadius={'10px'} display={'flex'} flexDirection='column' gap={'10px'}>
                        <Skeleton width={'100%'} height={'8px'} />
                        <Skeleton width={'100%'} height={'8px'} />
                    </Box>
                </Box>
                <Box width='100%' display={'flex'} justifyContent='space-between' mt={'10px'}>
                    <Box padding={'10px'} width={'40%'} borderRadius={'10px'} display={'flex'} flexDirection='column' gap={'10px'}>
                        <Skeleton width={'100%'} height={'8px'} />
                        <Skeleton width={'100%'} height={'8px'} />
                    </Box>
                    <Box padding={'10px'} width={'40%'} borderRadius={'10px'} display={'flex'} flexDirection='column' gap={'10px'}>
                        <Skeleton width={'100%'} height={'8px'} />
                        <Skeleton width={'100%'} height={'8px'} />
                    </Box>
                </Box>
                <Box width={'100%'} mt='10px' display={'flex'} flexDirection='column' gap={'10px'}>
                    <Skeleton width={'100%'} height={'150px'} />
                </Box>
            </Box> :

            <Box boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' borderRadius='8px' width={'98%'} margin='auto' padding={'20px'}>
                <Box display={'flex'} alignItems='center' gap={'25px'} fontSize='50px'>
                    <Text fontWeight={'bold'}>{`${((data?.current?.temp) - 273).toFixed()}°C`}</Text>
                    {/* {data?.current?.weather && data?.current?.weather[0]?.main === 'Clear' &&
                        <BsFillSunFill fill='#ffe634' />
                    }

                    {data?.current?.weather && data?.current?.weather[0]?.main === 'Clouds' &&
                        <AiFillCloud fill='skyblue' />
                    }

                    {data?.current?.weather && data?.current?.weather[0]?.main === 'Rain' &&
                        <BsFillCloudRainFill fill='skyblue' />
                    }

                    {data?.current?.weather && data?.current?.weather[0]?.main === 'Mist' &&
                        <RiMistFill fill='black' />
                    }

                    {data?.current?.weather && data?.current?.weather[0]?.main === 'Snow' &&
                        <BsFillCloudSnowFill fill='skyblue' />
                    } */}
                    <Image src={`https://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon}@2x.png`} alt={data?.current?.weather[0]?.main} />
                </Box>
                <Box mt={'10px'}>
                    <LineChart weather={data} />
                </Box>
                <Box display={'flex'} justifyContent='space-between' textAlign={'left'} fontSize='small' mt={'10px'} lineHeight='18px'>
                    <Box padding={'10px'} background='#f5faff' width={'45%'} >
                        <Text fontWeight={'bold'}>Pressure</Text>
                        <Text>{data?.current?.pressure} hpa</Text>
                    </Box>

                    <Box padding={'10px'} background='#f5faff' width={'45%'}>
                        <Text fontWeight={'bold'}>Humidity</Text>
                        <Text>{data?.current?.humidity}%</Text>
                    </Box>
                </Box>

                <Box display={'flex'} justifyContent='space-between' mt={'20px'} fontSize='small'>
                    <Box>
                        <Text fontWeight={'bold'}>Sunrise</Text>
                        <Text fontSize='x-small' fontWeight={'bold'}>{sunTimes.sunrise} am</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Sunset</Text>
                        <Text fontSize='x-small' fontWeight={'bold'}>{sunTimes.sunset} pm</Text>
                    </Box>
                </Box>
                <SunriseSuset sunTiming={sunTimes} />
            </Box>
    )
}

export default DeepDetails