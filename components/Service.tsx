import React from 'react';
import Flight from '../assets/services/flight_pred.png';
import Trip from '../assets/services/travel_icon.png';
import Map from '../assets/services/map_icon.png';
import Weather from '../assets/services//weather_icon.png';
import Tour from '../assets/services/Indiagate_icon.png';
import Hotel from '../assets/services/hotel_icon.png';
import Image from 'next/image';

// import ServiceCard from './ServiceCard';

type MyData = {
    service: string;
    description: string;
    image: string;
};

const Service = () => {
    const ServiceData: MyData[] = [
        {
            service: 'Flight Price Prediction',
            image: Flight.src,
            description: 'Predicts flight prices for efficient travel planning.',
        },
        {
            service: 'Hotel Recommendation',
            image: Hotel.src,
            description: 'Recommends hotels based on user preferences and reviews.',
        },
        {
            service: 'Tourist Place Recommendation',
            image: Tour.src,
            description: 'Recommends tourist places based on user preferences and reviews.',
        },
        {
            service: 'Trip Planner',
            image: Trip.src,
            description: 'Helps plan trips with itinerary and expense management.',
        },
        {
            service: 'Weather Forcasting',
            image: Weather.src,
            description: 'Provides weather updates of next 6 days for travel planning and safety.',
        },
        {
            service: 'Dynamic Map',
            image: Map.src,
            description: 'Interactive maps with location and navigation features.',
        },

    ];

    return (
        <div className='w-full space-y-4 mt-16 mb-8' id='services'>
            <h1 className="sm:mb-4 p-4 text-2xl sm:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                We Believe Everyone Deserves Quality{" "}
                <span className="underline underline-offset-3 decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
                    Services
                </span>{" "}
            </h1>
            <div className='md:w-[90%] md:ml-[5%] md:grid lg:grid-cols-3 md:grid-cols-2'>
                {
                    ServiceData.map((data, index) => {
                        return (
                            <div key={index} className='rounded-xl m-3 mb-8 lg:px-5 flex flex-row space-x-5  max-w-sm py-4 shadow-sm bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800'>
                                <div className='border-gray-900 dark:border-slate-400 rounded-full border-[3px] h-fit p-2'>
                                    <img className='w-[100px] aspect-auto' src={data?.image} alt="" />
                                </div>
                                <div className='p-2 flex flex-col items-start space-y-2'>
                                    <h5 className='text-2xl font-semibold'>{data?.service}</h5>
                                    <p className='mb-3 mt-2 dark:text-gray-400 md:text-lg'>{data?.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    );
};

export default Service;
