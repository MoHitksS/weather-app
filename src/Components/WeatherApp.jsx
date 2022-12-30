import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, OrderedList, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DailyWeather from './DailyWeather'
import DeepDetails from './DeepDetails'
import Search from './Search'
const { REACT_APP_API_KEY } = process.env
const WeatherApp = () => {
    const [weather, setWeather] = useState()
    const [isLoading, setLoading] = useState(true);
    const [LocationError, setLocationError] = useState({
        status: false,
        msg: '',
        desc: '',
        type: ''
    })

    const getWeatherData = ({ latitude, longitude }) => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_API_KEY}`).then((res) => {
            setWeather(res.data);
        }).catch((err) => {
            console.log(err);
            setLoading(false)
            setLocationError({ ...LocationError, status: true, type: 'warning', msg: 'Maintenance Mode', desc: 'Sorry For The Inconvenience We Are Under Maintainance Please Check Back Later!' })
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeatherData(position.coords)
        });
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                setLocationError(false);
            } else if (result.state === 'denied') {
                setLoading(false)
                setLocationError({ ...LocationError, status: true, type: 'error', msg: 'Location Permission Required', desc: 'Please allow location for using this weather app!' });
            }
            else if (result.state === 'prompt') {
                setLoading(false)
                setLocationError({ ...LocationError, status: true, type: 'error', msg: 'Turn On Device Location', desc: 'Please allow location for using this weather app!' })
            }
        });

    }, [])


    useEffect(() => {
        setLoading(true)
        if (weather) {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }, [weather])

    return (
        LocationError.status ?
            <Box height={'100vh'}>
                <Alert
                    status={LocationError.type}
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height={'100vh'}>
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        {LocationError.msg}
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        {LocationError.desc}
                        {LocationError.msg === 'Location Permission Required' &&
                            <OrderedList textAlign={'left'} marginTop='10px'>
                                <li>On your Android phone or tablet, open the Chrome app.</li>
                                <li>To the right of the address bar, tap More and then Settings.</li>
                                <li>Tap Site settings and then Location.</li>
                                <li>Turn Location on or off.</li>
                            </OrderedList>
                        }
                    </AlertDescription>
                </Alert>
            </Box> :
            <Box width={'100%'}>
                <Box width={['100%', '400px', '400px']} display='flex' justifyContent={'center'} flexDirection='column' margin={'auto'} padding='10px' zIndex='0'>
                    <Search weatherData={weather} setWeather={setWeather} isLoading={isLoading} />
                    <DailyWeather data={weather?.daily} isLoading={isLoading} />
                    <DeepDetails data={weather} isLoading={isLoading} />
                </Box>
            </Box>
    )
}

export default WeatherApp