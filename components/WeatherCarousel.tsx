import React, { useRef, useState } from "react";
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

export default function WeatherCarousel() {
  //   const [swiperRef, setSwiperRef] = useState(null);

  return (
    <>
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
        className="w-full max-w-6xl hidden lg:block"
      >
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
      </Swiper>

      <Swiper
        // onSwiper={setSwiperRef}
        slidesPerView={2}
        centeredSlides={false}
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        // loop={true}
        modules={[Navigation, Pagination]}
        className="w-full max-w-6xl hidden md:block lg:hidden"
      >
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
      </Swiper>

      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper w-full max-w-6xl md:hidden"
      >
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
        <SwiperSlide>
          <WeatherCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
