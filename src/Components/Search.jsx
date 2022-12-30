import { Box, Divider, Input, InputGroup, InputLeftElement, InputRightElement, Skeleton, Stack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoLocationSharp, IoSearch } from 'react-icons/io5';
import SearchItem from './SearchItem';
const { REACT_APP_API_KEY } = process.env
const Search = ({ weatherData, setWeather, isLoading }) => {
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [loc, setLocation] = useState('')
    const getCurrentData = ({ lat, lon }) => {
        if (lat) {
            axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${REACT_APP_API_KEY}`).then((res) => {
                let city = res?.data[0]?.name
                let state = res?.data[0]?.state || ''
                let name = `${city}${state && ','} ${state}`
                setText('')
                setLocation(name);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        if (weatherData) {
            getCurrentData(weatherData);
        }
    }, [weatherData])

    useEffect(() => {
        const getWeatherData = setTimeout(() => {
            if (text) {
                setData([])
                axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${REACT_APP_API_KEY}`).then((res) => {
                    setData(res.data);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }, 2000);
        return () => clearTimeout(getWeatherData)
    }, [text])

    return (
        isLoading ?
            <Stack width={'100%'} margin={'auto'}>
                <Skeleton margin={'auto'} width={'98%'} h={['55px', '55px', '55px']} borderRadius={'8px'}></Skeleton>
            </Stack> :

            <Box width={'98%'} margin={'auto'} position='relative'>
                <InputGroup boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' borderRadius={'8px'} h={['55px', '55px', '55px']}>
                    <InputLeftElement height={'100%'} w='3.5rem'>
                        <IoLocationSharp fontSize={'large'} />
                    </InputLeftElement>
                    <Input type='text' fontWeight={'bold'} fontSize='small' placeholder={loc} padding='0px 50px' h={['55px', '55px', '55px']} onChange={(e) => setText(e.target.value)} _placeholder={{fontWeight:'bold', color:'black'}} />
                    <InputRightElement height={'100%'} w='3.5rem'>
                        <IoSearch fontSize={'large'} />
                    </InputRightElement>
                </InputGroup>
                {(data.length > 0 && text) && <Box width={'100%'} zIndex='10000' background={'white'} boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' position='absolute' borderRadius={'8px'} marginTop='2px' cursor={'pointer'}>
                    {data?.map((ele, index) => (
                        <Box key={index} >
                            <SearchItem data={ele} setWeather={setWeather} setText={setText} getCurrentData={getCurrentData} isLoading={isLoading} />
                            {(data.length > 1 && index < data.length - 1) &&
                                <Divider />
                            }
                        </Box>
                    ))}
                </Box>}
            </Box>
    )
}


export default Search