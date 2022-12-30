import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
// import required modules
import { Box } from '@chakra-ui/react';
import DailyCard from './DailyCard';
const DailyWeather = ({ data, isLoading }) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
    return (
        <Box w={'100%'} marginTop={'20px'} mb='10px'>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={10}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"

            >
                {data && data?.map((ele, index) => (
                    index < days.length &&
                    <SwiperSlide key={index} style={{ width: '70px', padding: '10px' }}>
                        <DailyCard ele={ele} days={days} index={index} isLoading={isLoading} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box >
    )
}

export default DailyWeather