import React from 'react'
import AboutBG from "../assets/about-bg.jpg"
type Props = {}

const About = (props: Props) => {
    return (
        <div className='md:w-[90%] md:mt-16 px-8 py-8 md:px-12 md:py-12 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 md:justify-end items-center bg-gray-900 bg-bottom bg-cover bg-no-repeat bg-blend-normal md:border-2' style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.73), rgba(0,0,0,0.609)),url(${AboutBG.src})`,
            backgroundPositionY: 'center',
        }}>
            <div className='flex flex-col items-start space-y-2'>
                <h1 className='text-xl md:text-4xl font-extrabold text-white'>Wonderful Journey with Flycast </h1>
                <p className='text-sm md:text-lg font-extralight text-gray-300'>
                Experience the beauty of India with Flycast attractive travel deals. 
                Explore iconic landmarks, indulge in delicious cuisine, and create unforgettable memories on your journey.
                </p>
            </div>
            <div>
                <div>
                    <video className='max-h-[400px] border-2 border-white rounded-lg' autoPlay muted loop><source src={'/about-vid.mp4'} type='video/mp4' /></video>
                </div>
            </div>
        </div>
    )
}

export default About