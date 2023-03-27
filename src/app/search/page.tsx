"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowUndo, IoChevronBackCircle, IoChevronBackOutline, IoChevronBackSharp } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { Airport } from "../../../types/Airport";
import AirportJson from "../../../assets/airports.json";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import parse from "html-react-parser";
import { Element } from "html-react-parser";
import FlightCard from "../../../components/FlightCard";
import Flights from "../../../assets/flights.json";
import { IoIosAirplane } from "react-icons/io";
import GaugeChart from 'react-gauge-chart'
import { useRouter } from "next/navigation";
type Props = {};

const ResultPage = (props: Props) => {
  const {
    source,
    dst,
    classType,
    hotels,
    setHotels,
    topPlaces,
    setTopPlaces,
    // setDstForMap
  } = useContext(AppContext);

  const [srcAirport, setSrcAirport] = useState<Airport>({
    id: 3572,
    name: "Trivandrum International Airport",
    iata: "TRV",
    icao: "VOTV",
    city: "Thiruvananthapuram",
    lat: 8.482122,
    lon: 76.920113,
    country: "India",
    alt: 15,
    size: 104097,
    timezone: {
      name: "Asia/Kolkata",
      offset: 19800,
      offsetHours: "5:30",
      abbr: "IST",
      abbrName: "India Standard Time",
      isDst: false,
    },
    countryId: 102,
  });
  const [dstAirport, setDstAirport] = useState<Airport>({
    id: 7643,
    name: "Tuticorin Airport",
    iata: "TCR",
    icao: "VOTK",
    city: "Tuticorin",
    lat: 8.724167,
    lon: 78.025833,
    country: "India",
    alt: 129,
    size: 5951,
    timezone: {
      name: "Asia/Kolkata",
      offset: 19800,
      offsetHours: "5:30",
      abbr: "IST",
      abbrName: "India Standard Time",
      isDst: false,
    },
    countryId: 102,
  });

  const router = useRouter();

  const fetchHotels = async (DstAirport: Airport | undefined) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hotel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: DstAirport?.lat,
        lon: DstAirport?.lon,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("hotels", res.results);
        setHotels(res.results);
        localStorage.setItem("hotels", JSON.stringify(res.results));
      })
      .catch((err) => console.log(err));
  };

  const fetchTouristPlaces = async (DstAirport: Airport | undefined) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tourist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: DstAirport?.lat,
        lon: DstAirport?.lon,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("tourism", res.results);
        setTopPlaces(res.results);
        localStorage.setItem("topPlaces", JSON.stringify(res.results));
      })
      .catch((err) => console.log(err));
  };

  function predictFlightPrice(SrcAirport: Airport | undefined, DstAirport: Airport | undefined, classType: String) {
    if (!SrcAirport || !DstAirport) return;
    const url = process.env.NEXT_PUBLIC_MODEL_BASE_URL + "/getPrice";
    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        input: ["SpiceJet", "SG-8152", SrcAirport?.city, "Early_Morning", "zero", "Morning", DstAirport?.city, classType, 2.11, 1]
      })
    })
      .then(res => res.json())
      .then(data => console.log(
        "prediction",
        data,
        { 
          input: ["SpiceJet", "SG-8152", SrcAirport?.city, "Early_Morning", "zero", "Morning", DstAirport?.city, classType, 2.11, 1] 
        }
      ))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // if (source === "" || dst === "") {
    //   window.location.href = "/";
    // }
    // if(date?.startDate === undefined || date?.endDate === undefined){
    //   window.location.href = "/"
    // }
    // if (adults === 0) {
    //   window.location.href = "/";
    // }
    // if (classType === "") {
    //   window.location.href = "/";
    // }
    const srcIata = source.split(" ")[0];
    const dstIata = dst.split(" ")[0];
    // const srcDate = new Date(date?.startDate).toISOString().split("T")[0];
    // const dstDate = new Date(date?.endDate).toISOString().split("T")[0];
    // const adultsCount = adults;
    // const childrenCount = childrenn;
    // const classTypeValue = classType;
    const DstAirport = AirportJson.find(
      (airport: Airport) => airport.iata === dstIata
    );
    const SrcAirport = AirportJson.find(
      (airport: Airport) => airport.iata === srcIata
    );

    if (!DstAirport) {
      window.location.href = "/";
    }

    if (!SrcAirport) {
      window.location.href = "/";
    }
    console.log("DstAirport", DstAirport);
    console.log("SrcAirport", SrcAirport);

    // save dst airport in context api to use them in map :D
    if(DstAirport){
      // setDstForMap(DstAirport);
      localStorage.setItem("dstForMap", JSON.stringify(DstAirport));
    }

    fetchHotels(DstAirport);
    fetchTouristPlaces(DstAirport);
    // fetchFlights()
    // once flights are fetch, take the one with minimum price and query model using its attribute for prediction!!!!

    // if(Flights.length>0){
    // predictFlightPrice(SrcAirport, DstAirport, classType);
    // }
  }, []);

  return (
    <div className="w-full sm:w-[98%] md:w-[90%] flex flex-col items-center mx-auto">
      <div className="mt-4 mb-4 w-full">
        {" "}
        {/* Back to Home */}
        <Link href="/" className="flex flex-row items-center space-x-2">
          <IoArrowUndo className="text-[#ff6f2a] hover:text-[#d8581d] w-6 h-6" />
          <p className="text-[#ff6f2a] hover:text-[#d8581d] text-lg">
            Back to Home
          </p>
        </Link>
      </div>
      <div className="mt-4 mb-4 w-full flex flex-col items-center space-y-10">
        {" "}
        {/* prediction box */}
        <div className="w-full  max-w-6xl text-gray-900">
          <GaugeChart id="gauge-chart3"
            nrOfLevels={30}
            colors={["#ff1c30", "#1cff24"]}
            arcWidth={0.3}
            percent={0.73}
            textColor={"#ff6f2a"}
          />
        </div>{" "}
        {/* flight cards */}
        <div className="w-full max-w-6xl flex flex-col space-y-6">
          {Flights?.data &&
            Array.isArray(Flights?.data) &&
            Flights?.data?.map((flight, index) => {
              return (
                <FlightCard
                  key={index}
                  flight={flight}
                  classType={classType}
                  dstAirport={dstAirport}
                  srcAirport={srcAirport}
                  dictionaries={Flights?.dictionaries}
                />
              );
            })}
          <div className="">
            <div className="max-w-full bg-white dark:bg-gray-700 flex flex-col rounded overflow-hidden shadow-lg">
              <div className="flex flex-row items-baseline flex-nowrap bg-gray-100 dark:bg-gray-900 p-2">
                <IoIosAirplane className="text-gray-500" />
                <h1 className="ml-2 uppercase font-bold text-gray-500">
                  departure
                </h1>
                <p className="ml-2 font-normal text-gray-500">
                  Wednesday 18 Aug
                </p>
              </div>
              <div className="mt-2 flex justify-start bg-white dark:bg-gray-700 p-2">
                <div className="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 dark:bg-gray-900 p-1">
                  <IoIosAirplane className="text-gray-500" />
                  <p className="font-normal text-sm ml-1 text-gray-500">
                    Economy
                  </p>
                </div>
              </div>
              <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
                <div className="flex flex-row place-items-center p-2">
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
                      Qatar Airways
                    </p>
                    <p className="text-xs dark:text-white">QR1456</p>
                    <div className="text-xs dark:text-white">2*23kg</div>
                  </div>
                </div>

                <div className="flex flex-col p-2">
                  <p className="font-bold">18:25</p>
                  <p className="">
                    <span className="font-bold">HRE</span> Harare
                  </p>
                  <p className="">Zimbabwe</p>
                </div>
                <div className="flex flex-col flex-wrap p-2">
                  <p className="font-bold">19:25</p>
                  <p className="dark:text-gray-200">
                    <span className="font-bold">LUN</span> Lusaka
                  </p>
                  <p className="dark:text-gray-200">Zambia</p>
                </div>
              </div>
              <div className="mt-4 bg-gray-100 dark:bg-gray-900 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
                <div className="flex mx-6 py-4 flex-row flex-wrap justify-between items-center w-full">
                  <div className="flex space-x-2">
                    <IoIosAirplane className="w-12 h-10 p-2 mx-2 self-center my-btn-color rounded-full fill-current text-white" />
                    <div className="text-sm mx-2 flex flex-col">
                      <p className="">Standard Ticket</p>
                      <p className="font-bold">$404.73</p>
                      <p className="text-xs text-gray-500">Price per adult</p>
                    </div>
                  </div>
                  <button className="w-32 h-11 rounded flex my-btn-color mx-2 justify-center place-items-center">
                    <div className="text-white">Book</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Top places to visit */}
        <div className="">
          <div>
            <h1 className="w-full mb-4 text-xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              Top{" "}
              <span className="underline underline-offset-3  decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
                Places
              </span>{" "}
              to visit at Destination City
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {topPlaces &&
              Array.isArray(topPlaces) &&
              topPlaces?.map((place, index) => {
                if (!place?.photos) {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className="max-w-sm md:max-w-md cursor-pointer rounded-xl dark:bg-gray-800 p-3 shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-200"
                  >
                    <div className="relative flex items-end overflow-hidden rounded-xl">
                      <img
                        className="rounded-t-lg w-full h-[39vh] sm:h-[20vh] lg:h-[39vh] min-h-[250px] object-cover object-center"
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place?.photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                        alt="tourist places"
                      />

                      <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <span className="ml-1 text-sm text-slate-400">
                          {place?.rating || 0}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1 p-2">
                      <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {place.name}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {place.vicinity}
                      </p>
                      <div className="flex flex-wrap gap-2 my-2">
                        {place?.types.map((type, index) => {
                          if (index > 6) return null;
                          return (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-blue-200 dark:text-blue-800"
                            >
                              {type
                                .split("_")
                                .map((t) => {
                                  return t.charAt(0).toUpperCase() + t.slice(1);
                                })
                                .join(" ")}
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between">
                        {place?.user_ratings_total ? (
                          <div>
                            <p>Rated by</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <span className="text-lg font-bold text-orange-500">
                                {place?.user_ratings_total}
                              </span>{" "}
                              cutomers
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p>Rated by</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <span className="text-lg font-bold text-orange-500">
                                0
                              </span>{" "}
                              cutomers
                            </p>
                          </div>
                        )}

                        <div className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-btn-color text-white ml-auto">
                          {place?.photos &&
                            place?.photos[0]?.html_attributions[0] &&
                            parse(place?.photos[0]?.html_attributions[0], {
                              replace: (domNode) => {
                                // console.log(domNode.);
                                if (
                                  domNode instanceof Element &&
                                  domNode?.attribs &&
                                  domNode.tagName === "a"
                                ) {
                                  return (
                                    <button
                                      // target="_blank"
                                      // href={domNode?.attribs.href}
                                      // href="/search/map/top-places"
                                      onClick={() => {
                                        localStorage.setItem("clickedTopPlace", JSON.stringify(place));
                                        router.push("/search/map/top-places");
                                      }}
                                    >
                                      View on map
                                    </button>
                                  );
                                } else {
                                  return (
                                    <Link href="/search/map/top-places">
                                      View on map
                                    </Link>
                                  );
                                }
                              },
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Nearby Hotels */}
        <div className="">
          <div>
            <h1 className="w-full mb-4 text-xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              Hotels and Lodging near{" "}
              <span className="underline underline-offset-3  decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
                Destination Airport
              </span>{" "}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {hotels &&
              Array.isArray(hotels) &&
              hotels?.map((hotel, index) => {
                if (!hotel?.photos) {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className="w-full max-w-sm md:max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-95 transition-all duration-200"
                  >
                    <img
                      className="rounded-t-lg w-full h-[39vh] sm:h-[20vh] lg:h-[39vh] min-h-[250px] object-cover object-center"
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${hotel?.photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                      alt="hotel"
                    />
                    <div className="px-5 pb-5 mt-4">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {hotel?.name}
                      </h5>
                      <div className="flex items-center mt-2.5 mb-5">
                        {hotel?.rating &&
                          hotel?.rating > 0 &&
                          [...Array(Math.floor(hotel?.rating))].map((index) => {
                            return (
                              <FaStar
                                key={index}
                                className="w-5 h-5 text-yellow-300"
                              />
                            );
                          })}
                        {hotel?.rating &&
                          hotel?.rating > 0 &&
                          hotel?.rating < 5 &&
                          hotel?.rating % 1 !== 0 && (
                            <FaStarHalfAlt className="w-5 h-5 text-yellow-300" />
                          )}
                        {hotel?.rating &&
                          [...Array(Math.floor(5 - hotel?.rating))].map(
                            (index) => {
                              return (
                                <FaRegStar
                                  key={index}
                                  className="w-5 h-5 text-yellow-300"
                                />
                              );
                            }
                          )}
                        {hotel?.rating && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                            {hotel?.rating}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {hotel?.vicinity}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 my-2">
                        {hotel?.types.map((type, index) => {
                          if (index > 6) return null;
                          return (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-blue-200 dark:text-blue-800"
                            >
                              {type
                                .split("_")
                                .map((t) => {
                                  return t.charAt(0).toUpperCase() + t.slice(1);
                                })
                                .join(" ")}
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between">
                        {hotel?.user_ratings_total ? (
                          <div>
                            <p>Rated by</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {hotel?.user_ratings_total} cutomers
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p>Rated by</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <span className="text-lg font-bold text-orange-500">
                                0
                              </span>{" "}
                              cutomers
                            </p>
                          </div>
                        )}

                        <div className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-btn-color text-white ml-auto">
                          {hotel?.photos &&
                            hotel?.photos[0]?.html_attributions[0] &&
                            parse(hotel?.photos[0]?.html_attributions[0], {
                              replace: (domNode) => {
                                // console.log(domNode.);
                                if (
                                  domNode instanceof Element &&
                                  domNode?.attribs &&
                                  domNode.tagName === "a"
                                ) {
                                  return (
                                    <button
                                      // target="_blank"
                                      // href={domNode?.attribs.href}
                                      // href="/search/map/hotels"
                                      onClick={() => {
                                        localStorage.setItem("clickedHotel", JSON.stringify(hotel));
                                        router.push("/search/map/hotels");
                                      }}
                                    >
                                      View on map
                                    </button>
                                  );
                                } else {
                                  return (
                                    <Link href="/search/map/hotels">
                                      View on map
                                    </Link>
                                  );
                                }
                              },
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Weather forecast */}
        {/* <div className="w-full flex flex-col space-y-4">
          <div>
            <h1 className="w-full mb-4 text-xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              Weather Forecast for{" "}
              <span className="underline underline-offset-3  decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
                Destination City
              </span>{" "}
            </h1>
          </div>
          <div>
            <WeatherCarousel />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ResultPage;
