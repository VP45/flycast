import React, { useContext } from 'react'
import AboutBG from "../assets/about-bg.jpg"
import TripPlanner from './TripPlanner'
import { AppContext } from '../context/AppContext'

type Props = {}

const TripPlannerCTA = (props: Props) => {

    // const [showTripPlanner, setShowTripPlanner] = React.useState(false)
    const { showTripPlanner ,  setShowTripPlanner } = useContext(AppContext)
    return (
        <div className=''>
            <div className='md:mt-16 px-8 py-8 md:px-12 md:py-12 flex flex-col md:flex-row-reverse space-y-4 md:space-y-0 md:space-x-12 md:space-x-reverse md:justify-end items-center bg-gray-900 bg-bottom bg-cover bg-no-repeat bg-blend-normal' style={{
                background: `linear-gradient(to top, rgba(0,0,0,0.73), rgba(0,0,0,0.609)),url(${AboutBG.src})`,
                backgroundPositionY: 'center',
            }}>
                <div className='flex flex-col items-start space-y-2'>
                    <h1 className='text-xl md:text-2xl font-extrabold text-white'>Wonderful Journey with Flycast </h1>
                    <p className='text-sm md:text-lg font-extralight text-gray-300'>
                    Experience the beauty of India with Flycast attractive travel deals. 
                    Explore iconic landmarks, indulge in delicious cuisine, and create unforgettable memories on your journey.
                    </p>
                    <a
                        href='#trip-planner'
                        onClick={() => setShowTripPlanner(true)}
                        className='bg-white text-gray-900 hover:text-white border-2 border-white hover:bg-transparent px-4 py-2 rounded-lg font-semibold'>Plan Your Trip
                    </a>
                </div>
                <div>
                    <div>
                        <video className='max-h-[400px] border-2 border-white rounded-lg' autoPlay muted loop><source src={'/trip.mp4'} type='video/mp4' /></video>
                    </div>
                </div>

            </div>

            {
                showTripPlanner && <TripPlanner />
            }

        </div>
    )
}

export default TripPlannerCTA