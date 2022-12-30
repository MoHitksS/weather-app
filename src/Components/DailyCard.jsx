import React from 'react'
import { Box, Image, Skeleton, Stack, Text } from '@chakra-ui/react';
import { BsFillSunFill, BsFillCloudRainFill, BsFillCloudSnowFill } from 'react-icons/bs';
import { AiFillCloud } from 'react-icons/ai';
import { RiMistFill } from 'react-icons/ri';
const DailyCard = ({ ele, days, index, isLoading }) => {
    return (
        isLoading ?
            <Box display={'flex'} gap={'5px'} alignItems='center' justifyContent={'center'} flexDirection='column' mr={'10px'}>
                <Skeleton width={'80%'} height={'10px'} ></Skeleton>
                <Skeleton width={'100%'} height={'10px'} ></Skeleton>
                <Skeleton width={'100%'} height='40px' borderRadius={'100px'}></Skeleton>
                <Skeleton width={'90%'} height={'10px'} ></Skeleton>
            </Box> :

            <>
                <Box display={'flex'} gap={'5px'} alignItems='center' justifyContent={'center'} flexDirection='column'>
                    <Text fontWeight={'bold'} fontSize='small'>{days[index]}</Text>
                    <Box display={'flex'} fontSize='12px' gap={'3px'}>
                        <Text fontWeight={'bold'}>{`${((ele.temp.max) - 273).toFixed()}°C`}</Text>
                        <Text>{`${((ele.temp.min) - 273).toFixed()}°C`}</Text>
                    </Box>
                    {/* {ele.weather && ele.weather[0]?.main === 'Clear' &&
                        <BsFillSunFill fontSize={'large'} fill='#ffe634' />
                    }

                    {ele.weather && ele.weather[0]?.main === 'Clouds' &&
                        <AiFillCloud fontSize={'large'} fill='skyblue' />
                    }

                    {ele.weather && ele.weather[0]?.main === 'Rain' &&
                        <BsFillCloudRainFill fontSize={'large'} fill='skyblue' />
                    }

                    {ele.weather && ele.weather[0]?.main === 'Mist' &&
                        <RiMistFill fontSize={'large'} fill='black' />
                    }

                    {ele.weather && ele.weather[0]?.main === 'Snow' &&
                        <BsFillCloudSnowFill fontSize={'large'} fill='skyblue' />
                    } */}
                    <Image src={`https://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`} alt={ele.weather[0]?.main} height='30px'/>
                </Box>
                <Text fontSize='small' color={'#aeacab'} >{ele.weather[0]?.main}</Text>
            </>
    )
}

export default DailyCard