"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowUndo, IoChevronBackCircle, IoChevronBackOutline, IoChevronBackSharp } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { Airport } from "../../../types/Airport";
import AirportJson from "../../../assets/airports.json";
import { FaBed, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import parse from "html-react-parser";
import { Element } from "html-react-parser";
import FlightCard from "../../../components/FlightCard";
// import Flights from "../../../assets/flights.json";
import { IoIosAirplane } from "react-icons/io";
import GaugeChart from 'react-gauge-chart'
import { useRouter } from "next/navigation";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Dictionaries, FlightLargeType, FlightType } from "../../../types/Flight";
import { MdOutlinePlace } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import TripPlanner from "../../../components/TripPlanner";
import TripPlannerCTA from "../../../components/TripPlannerCTA";
import WeatherCarousel from "../../../components/WeatherCarousel";
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
    adults,
    childrenn,
    date,
    isRoundTrip,
    setIsRoundTrip
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

  const [flights, setFlights] = useState<FlightLargeType | null>(null);
  // const [test, setTest] = useState(false);
  const [flightPred, setFlightPred] = useState<FlightType | null>(null);
  const [predictionPercentage, setPredictionPercentage] = useState(0);
  const [willPriceDrop, setWillPriceDrop] = useState(false);
  const [startCard, setStartCard] = useState(0);
  const [endCard, setEndCard] = useState(5);
  const [tab, setTab] = useState(0);
  const [viewMorePlaces, setViewMorePlaces] = useState(false);
  const [placesCardEnd, setPlacesCardEnd] = useState(6);
  const [viewMoreHotels, setViewMoreHotels] = useState(false);
  const [hotelsCardEnd, setHotelsCardEnd] = useState(6);
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

  const fetchFlights = async (SrcAirport: Airport | undefined, DstAirport: Airport | undefined, classType: String, date: DateValueType, adults: Number, children: Number) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/flight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        src: SrcAirport?.iata,
        dst: DstAirport?.iata,
        classType: classType,
        date: date,
        adults: adults,
        children: children,
        isRoundTrip: isRoundTrip,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (typeof (res) === "string") {
          res = JSON.parse(res);
        }
        console.log("flights", res);
        setFlights(res);
        localStorage.setItem("flights", res);
      })
      .catch((err) => console.log(err));
  }


  function mapTimeWithDay(tempDepTimeHour: number, tempDepTimeMinute: number) {
    let departure_time = "Morning";
    if (
      (tempDepTimeHour > 0 || (tempDepTimeHour == 0 && tempDepTimeMinute >= 1))
      &&
      (tempDepTimeHour < 4 || (tempDepTimeHour == 4 && tempDepTimeMinute == 0))) {
      departure_time = "Late_Night";
    }
    else if (
      (tempDepTimeHour > 4 || (tempDepTimeHour == 4 && tempDepTimeMinute >= 1))
      &&
      (tempDepTimeHour < 8 || (tempDepTimeHour == 8 && tempDepTimeMinute == 0))) {
      departure_time = "Early_Morning";
    }
    else if (
      (tempDepTimeHour > 8 || (tempDepTimeHour == 8 && tempDepTimeMinute >= 1))
      &&
      (tempDepTimeHour < 12 || (tempDepTimeHour == 12 && tempDepTimeMinute == 0))) {
      departure_time = "Morning";
    }
    else if (
      (tempDepTimeHour > 12 || (tempDepTimeHour == 12 && tempDepTimeMinute >= 1))
      &&
      (tempDepTimeHour < 16 || (tempDepTimeHour == 16 && tempDepTimeMinute == 0))) {
      departure_time = "Afternoon";
    }
    else if (
      (tempDepTimeHour > 16 || (tempDepTimeHour == 16 && tempDepTimeMinute >= 1))
      &&
      (tempDepTimeHour < 20 || (tempDepTimeHour == 20 && tempDepTimeMinute == 0))) {
      departure_time = "Evening";
    }
    else if (
      (tempDepTimeHour > 20 || (tempDepTimeHour == 20 && tempDepTimeMinute >= 1))
      &&
      (tempDepTimeHour < 24 || (tempDepTimeHour == 0 && tempDepTimeMinute == 0))) {
      departure_time = "Night";
    }
    return departure_time;
  }

  function predictFlightPrice(flight: FlightType, dictionaries: Dictionaries, class_type: String) {
    if (!srcAirport || !dstAirport) return;
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/ml";
    console.log("cheapest flight", flight)
    // getting date ready to be sent to the model :D
    let airline = dictionaries.carriers[flight.validatingAirlineCodes[0]];

    let flightName = dictionaries?.aircraft?.[flight?.itineraries[0]?.segments[0]?.aircraft?.code];
    const source_city = srcAirport?.city;
    let departure_time = "Morning";
    let arrival_time = "Morning";
    const destination_city = dstAirport?.city;
    const duration = flight?.itineraries[0]?.duration;
    const days_left = Math.floor((new Date(flight?.itineraries[0]?.segments[0]?.departure?.at).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

    const no_of_stops = flight?.itineraries[0]?.segments.length - 1;
    const stops = no_of_stops === 0 ? "zero" : no_of_stops === 1 ? "one" : "two_or_more";

    // console.table({
    //   airline,
    //   flightName,
    //   source_city,
    //   // departure_time,
    //   stops,
    //   // arrival_time,
    //   destination_city,
    //   class_type,
    //   duration,
    //   days_left
    // })


    /*
    Morning          71146
    Early_Morning    66790
    Evening          65102
    Night            48015
    Afternoon        47794
    Late_Night        1306
    */

    // convert time of day as shown below
    /*
      00:01 - 04:00 - Late_Night
      04:01 - 08:00 - Early_Morning
      08:01 - 12:00 - Morning
      12:01 - 16:00 - Afternoon
      16:01 - 20:00 - Evening
      20:01 - 00:00 - Night
    */
    // map the time of day to the above
    // console.log("departure_time", departure_time)

    const tempDepTimeHour = parseInt(flight?.itineraries[0]?.segments[0]?.departure?.at?.slice(11, 13));
    const tempDepTimeMinute = parseInt(flight?.itineraries[0]?.segments[0]?.departure?.at?.slice(14, 16));
    const tempArrTimeHour = parseInt(flight?.itineraries[0]?.segments[0]?.arrival?.at?.slice(11, 13));
    const tempArrTimeMinute = parseInt(flight?.itineraries[0]?.segments[0]?.arrival?.at?.slice(14, 16));
    departure_time = mapTimeWithDay(tempDepTimeHour, tempDepTimeMinute);
    arrival_time = mapTimeWithDay(tempArrTimeHour, tempArrTimeMinute);

    // mapping airline name to the model
    // Vistara      127859
    // Air_India     80892
    // Indigo        43120
    // GO_FIRST      23173
    // AirAsia       16098
    // SpiceJet       9011
    if (airline.toLowerCase() === "Air India".toLowerCase()) {
      airline = "Air_India";
      flightName = "AI-401";
    }
    else if (airline.toLowerCase() === "IndiGo".toLowerCase()) {
      airline = "Indigo";
      flightName = "6E-102";
    }
    else if (airline.toLowerCase() === "SpiceJet".toLowerCase()) {
      airline = "SpiceJet";
      flightName = "SG-1031";
    }
    else if (airline.toLowerCase() === "Vistara".toLowerCase()) {
      airline = "Vistara";
      flightName = "UK-613";
    }
    else if (airline.toLowerCase() === "AirAsia India".toLowerCase()) {
      airline = "AirAsia";
      flightName = "I5-1228";
    }
    else if (airline.toLowerCase() === "Go First".toLowerCase()) {
      airline = "GO_FIRST";
      flightName = "G8-101";
    }



    // convert bengaluru to bangalore
    if (srcAirport?.city === "Bengaluru") {
      srcAirport.city = "Bangalore";
    }
    if (dstAirport?.city === "Bengaluru") {
      dstAirport.city = "Bangalore";
    }

    // convert format of duration to hours
    // PT16H30M -> 16.5
    // PT1H30M -> 1.5
    let durationInHours = 0;
    if (duration?.includes("H")) {
      durationInHours = parseInt(duration?.slice(2, duration?.indexOf("H")));
    }
    if (duration?.includes("M")) {
      durationInHours += parseInt(duration?.slice(duration?.indexOf("H") + 1, duration?.indexOf("M"))) / 60;
    }
    durationInHours = parseFloat(durationInHours.toFixed(2));
    // calculate days left to departure from today in days using departure date
    let daysLeft = Math.floor((new Date(flight?.itineraries[0]?.segments[0]?.departure?.at).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    console.log("daysLeft", daysLeft)



    console.table("flight to be send to model", [airline, flightName, srcAirport?.city, departure_time, stops, arrival_time, dstAirport?.city, classType, durationInHours, daysLeft])

    // convert everything according to the model ....... IMP IMP IMP IMP IMP

    // convert airline code type to the model
    // AIRASIA 320 -> AI-320
    // VISTARA 320 -> VI-320

    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        input: [airline, flightName, srcAirport?.city, departure_time, stops, arrival_time, dstAirport?.city, classType, durationInHours, daysLeft]
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("prediction", data);
        if (data["PredictedPrice"] > parseInt(flight?.price?.total)) {
          setWillPriceDrop(false);
        } else {
          setWillPriceDrop(true);
        }
        const tempPercentage = Math.floor((Math.abs(data["PredictedPrice"] - parseInt(flight?.price?.total)) / parseInt(flight?.price?.total)) * 100);
        setPredictionPercentage(tempPercentage);
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (source === "" || dst === "") {
      window.location.href = "/";
    }
    if (date?.startDate === undefined || date?.endDate === undefined) {
      window.location.href = "/"
    }
    if (adults === 0) {
      window.location.href = "/";
    }
    if (classType === "") {
      window.location.href = "/";
    }
    if (date?.startDate === undefined) {
      window.location.href = "/"
    }

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
    if (DstAirport && SrcAirport) {
      // setDstForMap(DstAirport);
      setDstAirport(DstAirport);
      setSrcAirport(SrcAirport);
      localStorage.setItem("dstForMap", JSON.stringify(DstAirport));
    }

    fetchHotels(DstAirport);
    fetchTouristPlaces(DstAirport);
    fetchFlights(SrcAirport, DstAirport, classType, date, adults, childrenn)

    // const tempDepTimeHour = parseInt(Flights.data[0]?.itineraries[0]?.segments[0]?.departure?.at?.slice(11, 13));
    // const tempDepTimeMinute = parseInt(Flights.data[0]?.itineraries[0]?.segments[0]?.departure?.at?.slice(14, 16));
    // const tempArrTimeHour = parseInt(Flights.data[0]?.itineraries[0]?.segments[0]?.arrival?.at?.slice(11, 13));
    // const tempArrTimeMinute = parseInt(Flights.data[0]?.itineraries[0]?.segments[0]?.arrival?.at?.slice(14, 16));
    // let departure_time = mapTimeWithDay(tempDepTimeHour, tempDepTimeMinute);
    // let arrival_time = mapTimeWithDay(tempArrTimeHour, tempArrTimeMinute);
    // console.log("tempDepTimeHour", departure_time);
    // console.log("tempDepTimeMinute", tempArrTimeHour,tempArrTimeMinute);

    // let flightName = Flights?.dictionaries?.aircraft?.[Flights.data[0]?.itineraries[0]?.segments[0]?.aircraft?.code];
    // console.log("flightName", flightName);


  }, []);

  useEffect(() => {
    const allowedCitiesForPrediction = ["mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "kolkata"];
    if (dstAirport && srcAirport && allowedCitiesForPrediction.includes(dstAirport.city.toLowerCase()) && allowedCitiesForPrediction.includes(srcAirport.city.toLowerCase())) {
      if (flights) {
        if (flights.data?.length > 0) {
          const allowedAirlines = ["AI", "SG", "AK", "UK", "G8", "6E"];
          const flightForPrediction = flights.data.find((flight: FlightType) => allowedAirlines.includes(flight.validatingAirlineCodes[0]));
          if (flightForPrediction) {
            setFlightPred(flightForPrediction)
            predictFlightPrice(flightForPrediction, flights.dictionaries, classType);
          } else {
            console.log("no flight found for prediction");
          }
        }
      }
    }
  }, [flights]);

  return (
    <div className="w-full sm:w-[98%] md:w-[90%] flex flex-col items-center mx-auto">
      <div className="pl-2 sm:ml-0 mt-4 w-full">
        {" "}
        {/* Back to Home */}
        <Link href="/" className="flex flex-row items-center space-x-2">
          <IoArrowUndo className="text-[#ff6f2a] hover:text-[#d8581d] w-6 h-6 cursor-pointer" />
          <p className="text-[#ff6f2a] hover:text-[#d8581d] text-lg">
            Back to Home
          </p>
        </Link>
      </div>
      <div className="mt-4 mb-4 w-full flex flex-col items-center space-y-10">
        {" "}
        {/* prediction box */}
        {
          flightPred && (
            <div className="w-full max-w-6xl text-gray-900 dark:text-white flex flex-col items-center">
              <div className={`pt-12 w-full flex flex-col md:flex-row items-center border-b-4 border-dashed ${willPriceDrop ? "border-[#04ff30]" : "border-red-600"} bg-gray-100 dark:bg-gray-900`}>
                <div className="md:w-[35%] flex items-center justify-center">
                  <GaugeChart id="gauge-chart3"
                    nrOfLevels={30}
                    colors={["#ff1c30", "#1cff24"]}
                    arcWidth={0.3}
                    percent={predictionPercentage/100}
                    textColor={"#ff6f2a"}
                    style={{ display: "flex", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}
                  />
                </div>
                <div className="md:w-[65%] md:p-16 flex flex-col items-center justify-center">
                  <h1 className=" text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-[1.2]">Price{" "}
                    <span className={willPriceDrop ? "text-[#04ff30]" : "text-red-600"}>{willPriceDrop ? "Drop" : "Rise"}</span> Chance<br />
                    Oh{" "}
                    <span className={willPriceDrop ? "text-[#04ff30]" : "text-red-600"}>{willPriceDrop ? "Yes!" : "No!"}</span>{" "}
                    The price could {willPriceDrop ? "reduce" : "increase"} by{" "}
                    <span className={willPriceDrop ? "text-[#04ff30]" : "text-red-600"}>{predictionPercentage}%*</span>
                  </h1>
                  <p>
                    • There is a {predictionPercentage}% chance of a {willPriceDrop ? "drop" : "rise"} in price
                  </p>
                </div>
              </div>
              <div className="w-full">
                {
                  flights?.data &&
                  Array.isArray(flights?.data) && flightPred && (
                    <FlightCard
                      timepass={0}
                      flight={flightPred}
                      classType={classType}
                      dstAirport={dstAirport}
                      srcAirport={srcAirport}
                      dictionaries={flights?.dictionaries}
                    />)
                }
              </div>
            </div>
          )
        }
        {/* flight cards */}
        <div className="w-full max-w-6xl flex flex-col space-y-6 px-2 md:p-0">
          {
            flights?.data &&
              Array.isArray(flights?.data) &&
              flights?.data.length > 5
              ?
              (
                // apply pagination if flights are more than 5 :D

                flights?.data.slice(startCard, endCard).map((flight: FlightType, index) => {
                  return (<FlightCard
                    timepass={startCard + index}
                    key={index}
                    flight={flight}
                    classType={classType}
                    dstAirport={dstAirport}
                    srcAirport={srcAirport}
                    dictionaries={flights?.dictionaries}
                  />)
                })
              )
              :
              (
                flights?.data?.map((flight: FlightType, index) => {
                  return (
                    <FlightCard
                      timepass={index}
                      key={index}
                      flight={flight}
                      classType={classType}
                      dstAirport={dstAirport}
                      srcAirport={srcAirport}
                      dictionaries={flights?.dictionaries}
                    />
                  );
                })
              )
          }
        </div>
        {
          flights?.data &&
          Array.isArray(flights?.data) &&
          flights?.data.length > 5
          && (
            <div>
              <nav aria-label="Page navigation example">
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <button
                      onClick={() => {
                        if (startCard > 0) {
                          setStartCard(startCard - 5);
                          setEndCard(endCard - 5);
                        }
                      }}
                      className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Previous</span>
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </button>
                  </li>
                  {
                    Array.from(Array(Math.ceil(flights?.data.length / 5)).keys()).slice(0, 5).map((page, index) => {
                      return (
                        <li key={index}>
                          <button
                            onClick={() => {
                              setStartCard(page * 5);
                              setEndCard((page * 5) + 5);
                            }}
                            className={
                              startCard === page * 5
                                ? "z-10 px-3 py-2 leading-tight text-[#ff6f2a] border border-[#ff6e2a74] bg-[#ff6e2a2f] hover:bg-[#ff6e2ab8] hover:text-[#c65724] dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                : "block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }>
                            {page + 1}
                          </button>
                        </li>
                      )
                    })
                  }
                  {
                    flights?.data.length > 5 && (
                      <li>
                        <button
                          className={
                            startCard >= 25
                              ? "z-10 px-3 py-2 leading-tight text-[#ff6f2a] border border-[#ff6e2a74] bg-[#ff6e2a2f] hover:bg-[#ff6e2ab8] hover:text-[#c65724] dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                              : "block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          }>
                          . . .
                        </button>
                      </li>
                    )
                  }
                  <li>
                    <button
                      onClick={() => {
                        if (endCard < flights?.data.length) {
                          setStartCard(startCard + 5);
                          setEndCard(endCard + 5);
                        }
                      }}
                      className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only">Next</span>
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )
        }

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
              <button
                onClick={() => {
                  setTab(0);
                }}
                className={
                  tab === 0
                    ? "inline-flex p-4 text-[#ff6f2a] border-b-2 border-[#ff6f2a] rounded-t-lg active group"
                    : "inline-flex p-4 text-gray-500 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700 group"
                }>
                <MdOutlinePlace className={
                  tab === 0
                    ? "w-5 h-5 mr-2 text-[#ff6f2a]"
                    : "w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
                } />Tourism Place
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => {
                  setTab(1);
                }}
                className={
                  tab === 1
                    ? "inline-flex p-4 text-[#ff6f2a] border-b-2 border-[#ff6f2a] rounded-t-lg active group"
                    : "inline-flex p-4 text-gray-500 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700 group"
                } aria-current="page">
                <FaBed className={
                  tab === 1
                    ? "w-5 h-5 mr-2 text-[#ff6f2a]"
                    : "w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
                } />Hotels
              </button>
            </li>
          </ul>
        </div>
        {/* Top places to visit */}
        {
          tab === 0 && (
            <div className="">
              <div>
                <h1 className="w-full pl-4 mb-4 text-xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
                  Top{" "}
                  <span className="underline underline-offset-3  decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
                    Places
                  </span>{" "}
                  to visit at Destination City
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {
                  topPlaces &&
                  Array.isArray(topPlaces) &&
                  // show only 6 places initially          
                  topPlaces.slice(0, placesCardEnd).map((place, index) => {
                    if (!place?.photos) {
                      return null;
                    }
                    return (
                      <div
                        key={index}
                        className="max-w-sm md:max-w-md cursor-pointer rounded-xl bg-gray-50 dark:bg-gray-800 p-3 shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-200"
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
                          <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
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
                  })
                }
              </div>
              {
                topPlaces && topPlaces.length > 6 && (
                  <div className="flex items-center justify-end pr-6 space-x-2"              >
                    <p className="text-lg text-[#ff6f2a] cursor-pointer"
                      onClick={() => {
                        setViewMorePlaces(!viewMorePlaces);
                        setPlacesCardEnd(viewMorePlaces ? 6 : topPlaces?.length)
                      }}>
                      View {viewMorePlaces ? "less" : "more"}{" "}
                    </p>
                    {
                      viewMorePlaces ? (
                        <AiFillCaretUp className="text-lg text-[#ff6f2a] cursor-pointer" />
                      ) : (
                        <AiFillCaretDown className="text-lg text-[#ff6f2a] cursor-pointer" />
                      )
                    }
                  </div>
                )
              }
            </div>
          )
        }
        {/* Nearby Hotels */}
        {
          tab === 1 && (
            <div className="">
              <div>
                <h1 className="w-full pl-4 mb-4 text-xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
                  Hotels and Lodging near{" "}
                  <span className="underline underline-offset-3  decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
                    Destination Airport
                  </span>{" "}
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {hotels &&
                  Array.isArray(hotels) &&
                  // show only 6 hotels initially
                  hotels.slice(0, hotelsCardEnd)?.map((hotel, index) => {
                    if (!hotel?.photos) {
                      return null;
                    }
                    return (
                      <div
                        key={index}
                        className="w-full max-w-sm md:max-w-md bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-95 transition-all duration-200"
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
              {
                hotels && hotels.length > 6 && (
                  <div className="flex items-center justify-end pr-6 space-x-2"              >
                    <p className="text-lg text-[#ff6f2a] cursor-pointer"
                      onClick={() => {
                        setViewMoreHotels(!viewMoreHotels);
                        setHotelsCardEnd(viewMoreHotels ? 6 : hotels?.length)
                      }}>
                      View {viewMoreHotels ? "less" : "more"}{" "}
                    </p>
                    {
                      viewMoreHotels ? (
                        <AiFillCaretUp className="text-lg text-[#ff6f2a] cursor-pointer" />
                      ) : (
                        <AiFillCaretDown className="text-lg text-[#ff6f2a] cursor-pointer" />
                      )
                    }
                  </div>
                )
              }
            </div>
          )
        }

        {/* Trip Planner */}
        <div className="w-full flex flex-col space-y-4">
          <TripPlannerCTA />
        </div>
        {/* Weather forecast */}
        <div className="w-full flex flex-col space-y-4">
          <div>
            <h1 className="pl-4 w-full mb-4 text-xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              Weather Forecast for{" "}
              <span className="underline underline-offset-3  decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
                Destination City
              </span>{" "}
            </h1>
          </div>
          {
            dstAirport && (
              <div>
                <WeatherCarousel lat={dstAirport.lat} lon={dstAirport.lon} dstAirport={dstAirport} />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
