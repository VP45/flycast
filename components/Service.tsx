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
        <div className='w-full space-y-4 mt-16 mb-8'>
            <h1 className="sm:mb-4 p-4 text-2xl sm:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                We Believe Everyone Deserves Quality{" "}
                <span className="underline underline-offset-3 decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
                    Services
                </span>{" "}
            </h1>
            <div className='md:w-[90%] md:ml-[5%] md:grid lg:grid-cols-3 md:grid-cols-2'>
                <div className='rounded-xl m-3 mb-8 lg:px-5 flex flex-row max-w-sm py-4 shadow-sm bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800'>
                    <div className='border-gray-900 dark:border-slate-400 border-[3px] rounded-full h-1/2 ml-3'>
                        <Image className='w-60 object-fill' src={Flight} alt="" />
                    </div>
                    <div>
                        <h5 className='text-center text-2xl font-semibold'>Flight Price Prediction</h5>
                        <p className='mb-3 mt-2 px-4 dark:text-gray-400 md:text-lg'>Predicts flight prices for efficient travel planning.</p>
                    </div>
                </div>
                <div className='rounded-xl m-3 mb-8 lg:px-5 flex flex-row max-w-sm py-4 shadow-sm bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800'>
                    <div className='border-gray-900 dark:border-slate-400 border-[3px] rounded-full h-1/2 ml-3'>
                        <Image className='w-60' src={Hotel} alt="" />
                    </div>
                    <div>
                        <h5 className='text-center text-2xl font-semibold'>Hotel Recommendation</h5>
                        <p className='mb-3 mt-2 px-4 dark:text-gray-400 md:text-lg'>Recommends hotels based on user preferences and reviews.</p>
                    </div>
                </div>
                
                <div className='rounded-xl m-3 mb-8 lg:px-5 flex flex-row max-w-sm py-4 shadow-sm bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800'>
                    <div className='border-gray-900 dark:border-slate-400 border-[3px] rounded-full h-1/2 ml-3'>
                        <Image className='w-60' src={Tour} alt="" />
                    </div>
                    <div>
                        <h5 className='text-center text-2xl font-semibold'>Tourist Place Recommendation</h5>
                        <p className='mb-3 mt-2 px-4 dark:text-gray-400 md:text-lg'>Recommends tourist places based on user preferences and reviews.</p>
                    </div>
                </div>
                <div className='rounded-xl m-3 mb-8 lg:px-5 flex flex-row max-w-sm py-4 shadow-sm bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800'>
                    <div className='border-gray-900 dark:border-slate-400 border-[3px] rounded-full h-1/2 ml-3'>
                        <Image className='w-60' src={Map} alt="" />
                    </div>
                    <div>
                        <h5 className='text-center text-2xl font-semibold'>Dynamic Map</h5>
                        <p className='mb-3 mt-2 px-4 dark:text-gray-400 md:text-lg'>Interactive maps with location and navigation features.</p>
                    </div>
                </div>
                <div className='rounded-xl m-3 mb-8 lg:px-5 flex flex-row max-w-sm py-4 shadow-sm bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800'>
                    <div className='border-gray-900 dark:border-slate-400 border-[3px] rounded-full h-1/2 ml-3'>
                        <Image className='w-60' src={Trip} alt="" />
                    </div>
                    <div>
                        <h5 className='text-center text-2xl font-semibold'>Trip Planner</h5>
                        <p className='mb-3 mt-2 px-4 dark:text-gray-400 md:text-lg'>Helps plan trips with itinerary and expense management.</p>
                    </div>
                </div>
                <div className='rounded-xl m-3 mb-8 lg:px-5 flex flex-row max-w-sm py-4 shadow-sm bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800'>
                    <div className='border-gray-900 dark:border-slate-400 border-[3px] rounded-full h-1/2 ml-3'>
                        <Image className='w-60' src={Weather} alt="" />
                    </div>
                    <div>
                        <h5 className='text-center text-2xl font-semibold'>Weather Forcasting</h5>
                        <p className='mb-3 mt-2 px-4 dark:text-gray-400 md:text-lg'>Provides weather updates of next 6 days for travel planning and safety</p>
                    </div>
                </div>
                
            </div>
        </div>

    );
};

export default Service;
