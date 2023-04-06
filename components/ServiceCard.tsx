import React from 'react'
import Flat from '../assets/services/flight_pred.png'
import Image from 'next/image'

const ServiceCard = () => {
    return (
        <>
            <div className='rounded-xl m-3 lg:px-5 flex flex-row max-w-sm py-4 shadow-sm bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800'>
                <div className='border-gray-900 dark:border-slate-400 border-[3px] rounded-full h-1/2 ml-3'>
                    <Image className='w-60' src={Flat} alt="" />
                </div>
                <div>
                    <h5 className='text-center text-2xl font-semibold'>Tourist Place Recommendation</h5>
                    <p className='mb-3 mt-2 px-4 dark:text-gray-400 md:text-lg'>Recommends tourist places based on user preferences and reviews.</p>
                </div>
            </div>
        </>
    )
}

export default ServiceCard