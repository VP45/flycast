import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.css";
import "swiper/swiper.min.css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { EffectCards } from "swiper";

import WeatherCard from "../components/WeatherCard";
import { CSSProperties } from "styled-components";
import { WeatherType } from "../types/Weather";
import { Airport } from "../types/Airport";

type Props = {
  lat: number,
  lon: number,
  dstAirport: Airport
}
export default function WeatherCarousel({ lat, lon, dstAirport }: Props) {
  //   const [swiperRef, setSwiperRef] = useState(null);
  const [weatherData, setWeatherData] = useState<WeatherType[]>([]);
  useEffect(() => {
    if (lat && lon) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`)
        .then(res => res.json())
        .then(data => {
          setWeatherData(data.list);
          console.log(data);
          console.log(data.list);
        })
    }
  }, [])

  return (
    <>
      <div className="hidden lg:block">
        <Swiper
          style={{
            "--swiper-navigation-color": "#ff6f2a",
            "--swiper-pagination-color": "#f78d5c",
            "--swiper-pagination-color-active": "#ff6f2a"
          } as CSSProperties}
          // onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={false}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          // loop={true}
          modules={[Navigation, Pagination]}
          className="w-full max-w-6xl"
        >
          {
            weatherData && Array.isArray(weatherData) && weatherData.map((weather, index) => {
              return (
                (index == 0 || (index + 1) % 8 === 0) && (
                  <SwiperSlide key={index}>
                    <WeatherCard data={weather} dstAirport={dstAirport} />
                  </SwiperSlide>
                )
              )
            })
          }
        </Swiper>
      </div>

      <div className="hidden md:block lg:hidden">
        <Swiper
          style={{
            "--swiper-navigation-color": "#ff6f2a",
            "--swiper-pagination-color": "#f78d5c",
            "--swiper-pagination-color-active": "#ff6f2a"
          } as CSSProperties}
          // onSwiper={setSwiperRef}
          slidesPerView={2}
          centeredSlides={false}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          // loop={true}
          modules={[Navigation, Pagination]}
          className="w-full max-w-6xl"
        >
          {
            weatherData && Array.isArray(weatherData) && weatherData.map((weather, index) => {
              return (
                (index == 0 || (index + 1) % 8 === 0) && (
                  <SwiperSlide key={index}>
                    <WeatherCard data={weather} dstAirport={dstAirport} />
                  </SwiperSlide>
                )
              )
            })
          }
        </Swiper>
      </div>

      <div className="md:hidden">
        <Swiper
          style={{
            "--swiper-navigation-color": "#ff6f2a",
            "--swiper-pagination-color": "#f78d5c",
            "--swiper-pagination-color-active": "#ff6f2a"
          } as CSSProperties}
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper w-full max-w-6xl"
        >
          {
            weatherData && Array.isArray(weatherData) && weatherData.map((weather, index) => {
              return (
                (index == 0 || (index + 1) % 8 === 0) && (
                  <SwiperSlide key={index}>
                    <WeatherCard data={weather} dstAirport={dstAirport} />
                  </SwiperSlide>
                )
              )
            })
          }
        </Swiper>
      </div>
    </>
  );
}
