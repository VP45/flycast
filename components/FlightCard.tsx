import React from "react";
import { IoIosAirplane } from "react-icons/io";
import { Airport } from "../types/Airport";
import { FlightType, Dictionaries } from "../types/Flight";

type FlightCardType = {
  timepass: number;
  flight: FlightType;
  classType: string;
  dstAirport: Airport;
  srcAirport: Airport;
  dictionaries: Dictionaries;
};
const FlightCard = ({
  timepass,
  flight,
  classType,
  dstAirport,
  srcAirport,
  dictionaries,
}: FlightCardType) => {
  function dateFormater(date: String) {
    // function to format date
    const tempDate = new Date(date as string);
    const newDate = tempDate.toDateString();
    return newDate;
  }
  function formatTime(date: String) {
    // function to format date
    const tempDate = new Date(date as string);
    const newTime = tempDate.toLocaleTimeString();
    return newTime;
  }
  return (
    <div className="w-full">
      <div className="max-w-full w-[100%] bg-white dark:bg-gray-700 flex flex-col rounded overflow-hidden shadow-lg sm:shadow-md">
        <div className="flex flex-row items-baseline flex-nowrap bg-gray-100 dark:bg-gray-900 p-2">
          <div className="flex space-x-2 items-center">
            <IoIosAirplane className="text-gray-500" />
            <h1 className="mx-2 font-bold text-gray-500">{timepass}</h1>
          </div>
          <div className="flex w-full justify-end md:justify-around items-center">
            <div className="flex">
              <h1 className="uppercase font-bold text-gray-500">
                Departure
              </h1>
              <p className="ml-2 font-normal text-gray-500">
                {dateFormater(
                  flight?.itineraries[0]?.segments[0]?.departure?.at
                )}
              </p>
            </div>
            <div className="hidden md:flex">
              <h1 className="ml-2 uppercase font-bold text-gray-500">
                Last Ticketing Date
              </h1>
              <p className="ml-2 font-normal text-gray-500">
                {flight?.lastTicketingDate}
              </p>
            </div>
            <div className="hidden md:flex">
              <h1 className="ml-2 uppercase font-bold text-gray-500">
                Available Seats
              </h1>
              <p className="ml-2 font-normal text-gray-500">
                {flight?.numberOfBookableSeats}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-start bg-white dark:bg-gray-700 p-2">
          <div className="flex items-center mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 dark:bg-gray-900 p-1">
            <IoIosAirplane className="text-gray-500" />
            <p className="font-normal text-sm ml-1 text-gray-500">
              {classType}
            </p>
          </div>
        </div>
        <div className="mt-2 flex sm:flex-row mx-6 justify-between flex-wrap ">
          <div className="w-full sm:w-auto flex flex-row place-items-center p-2">
            <img
              alt="Qatar Airways"
              className="w-10 h-10"
              src="data:image/png;base64,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"
              style={{
                opacity: 1,
                transformOrigin: "0% 50% 0px",
                transform: "none",
              }}
            />
            <div className="flex flex-col ml-2">
              <p className="text-md dark:text-white font-bold">
                {dictionaries?.carriers[flight?.validatingAirlineCodes[0]]}
              </p>
              <p className="text-xs dark:text-white">
                {
                  dictionaries?.aircraft?.[
                  flight?.itineraries[0]?.segments[0]?.aircraft?.code
                  ]
                }
              </p>
              {/* <div className="text-xs dark:text-white">2*23kg</div> */}
            </div>
          </div>

          <div className="flex flex-col p-2">
            <p className="font-bold">
              {formatTime(flight?.itineraries[0]?.segments[0]?.departure?.at)}
            </p>
            <p className="">
              <span className="font-bold">
                {flight?.itineraries[0].segments[0]?.departure?.iataCode}
              </span>{" "}
              {srcAirport?.city}
            </p>
            <p className="">{srcAirport?.country}</p>
          </div>
          <div className="flex flex-col flex-wrap p-2">
            <p className="font-bold">
              {formatTime(flight?.itineraries[0]?.segments[0]?.arrival?.at)}
            </p>
            <p className="dark:text-gray-200">
              <span className="font-bold">
                {flight?.itineraries[0].segments[0]?.arrival?.iataCode}
              </span>{" "}
              {dstAirport?.city}
            </p>
            <p className="dark:text-gray-200">{dstAirport?.country}</p>
          </div>
        </div>
        {
          flight && flight?.itineraries?.length > 1 && (
            <hr className="w-48 h-1 mx-auto my-1 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-900"></hr>
          )
        }
        {
          flight && flight?.itineraries?.length > 1 && (
            <div className="mt-2 flex sm:flex-row mx-6 justify-between flex-wrap ">
              <div className="w-full sm:w-auto flex flex-row place-items-center p-2">
                <img
                  alt="Qatar Airways"
                  className="w-10 h-10"
                  src="data:image/png;base64,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"
                  style={{
                    opacity: 1,
                    transformOrigin: "0% 50% 0px",
                    transform: "none",
                  }}
                />
                <div className="flex flex-col ml-2">
                  <p className="text-md dark:text-white font-bold">
                    {dictionaries?.carriers[flight?.validatingAirlineCodes[0]]}
                  </p>
                  <p className="text-xs dark:text-white">
                    {
                      dictionaries?.aircraft?.[
                      flight?.itineraries[1]?.segments[0]?.aircraft?.code
                      ]
                    }
                  </p>
                  {/* <div className="text-xs dark:text-white">2*23kg</div> */}
                </div>
              </div>

              <div className="flex flex-col p-2">
                <p className="font-bold">
                  {formatTime(flight?.itineraries[1]?.segments[0]?.departure?.at)}
                </p>
                <p className="">
                  <span className="font-bold">
                    {flight?.itineraries[1]?.segments[0]?.departure?.iataCode}
                  </span>{" "}
                  {dstAirport?.city}
                </p>
                <p className="">{srcAirport?.country}</p>
              </div>
              <div className="flex flex-col flex-wrap p-2">
                <p className="font-bold">
                  {formatTime(flight?.itineraries[1]?.segments[0]?.arrival?.at)}
                </p>
                <p className="dark:text-gray-200">
                  <span className="font-bold">
                    {flight?.itineraries[1]?.segments[0]?.arrival?.iataCode}
                  </span>{" "}
                  {srcAirport?.city}
                </p>
                <p className="dark:text-gray-200">{dstAirport?.country}</p>
              </div>
            </div>
          )
        }
        <div className="mt-4 bg-gray-100 dark:bg-gray-900 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
          <div className="flex sm:mx-6 py-4 flex-row flex-wrap justify-between items-center w-full">
            <div className="flex space-x-2">
              <IoIosAirplane className="w-6 h-5 sm:w-12 sm:h-10 p-1 sm:p-2 mx-2 self-center my-btn-color rounded-full fill-current text-white" />
              <div className="text-sm mx-2 flex flex-col">
                <p className="">Standard Ticket</p>
                <p className="font-bold">Rs. {flight?.price?.total}</p>
                <p className="text-xs text-gray-500">Price per adult</p>
              </div>
            </div>
            <a href={`https://www.skyscanner.net/transport/flights/${flight?.itineraries[0]?.segments[0].departure.iataCode}/${flight?.itineraries[0]?.segments[flight?.itineraries[0]?.segments.length - 1].departure.iataCode}/230411/?adultsv2=1&cabinclass=economy&currency=INR&preferdirects=true&referralServiceVersion=meeseeks-referral-service-v1&rtn=0&showDirectDays=true&sortby=cheapest`}
              target="_blank" className="w-24 h-7 sm:w-32 sm:h-11 rounded flex my-btn-color mx-2 justify-center place-items-center">
              <div className="text-white">Book</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
