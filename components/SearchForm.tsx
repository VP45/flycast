import React, { Context, useState } from "react";
import { IoIosAirplane } from "react-icons/io";
import { BiCurrentLocation } from "react-icons/bi";
import {
  BsArrowRightCircle,
  BsCalendarDate,
  BsFillPersonFill,
  BsSearch,
} from "react-icons/bs";
import Datepicker from "react-tailwindcss-datepicker";
import { AiOutlineSwap } from "react-icons/ai";
import { FaChild } from "react-icons/fa";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import AirportsJSON from "../assets/airports.json";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { useRouter } from "next/navigation";
import { ContextType } from "../types/ContextTypes";
type Props = {};


const SearchForm = (props: Props) => {
  const {
    source,
    setSource,
    dst,
    setDst,
    departDate,
    setDepartDate,
    arrivalDate,
    setArrivalDate,
    adults,
    setAdults,
    childrenn,
    setChildrenn,
    airports,
    setAirports,
    classType,
    setClassType,
    date,
    setDate,
    isRoundTrip,
    setIsRoundTrip
  }: ContextType = useContext(AppContext);

  const router = useRouter();
  const [isOneWay, setIsOneWay] = useState(0);

  // State for form inputs
  // const [source, setSource] = useState("");
  // const [dst, setDst] = useState("");
  // const [departDate, setDepartDate] = useState();
  // const [arrivalDate, setArrivalDate] = useState();
  // const [adults, setAdults] = useState(1);
  // const [childrenn, setChildrenn] = useState(0);
  // const [airports, setAirports] = useState([]);
  // const [classType, setClassType] = useState("Economy");
  // const [date, setDate] = useState({
  //   startDate: new Date(),
  //   endDate: new Date().setMonth(3).toString(), /// ifff errrr  change to Date().setMonth(3) only   🌿🌿🌿
  // });

  // Hadlers for form inputs .......

  const handleValueChange = (newValue: DateValueType) => {
    // check if valid date is selected i.e only future dates are allowed
    // compare the date (2023-4-27) with current date (new Date())
    if (newValue && newValue.startDate && new Date(newValue.startDate) <= new Date()) {
      alert("Please select a valid date! (Future date)");
      setDate({ startDate: new Date(), endDate: new Date().setMonth(3).toString() })
      return;
    }
    console.log("newValue:", newValue);
    setDate(newValue);
    // console.log("date:", date);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("newValue:", e.target.value);
    const res = AirportsJSON.filter((airport) => {
      const fullAirportDetail =
        `${airport.name} ${airport.iata} ${airport.icao} ${airport.city} ${airport.country}`.toLowerCase();
      // console.log(fullAirportDetail)
      return fullAirportDetail.includes(e.target.value.toLowerCase());
    });
    setAirports(res);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // form validations...
    if (source === "") {
      alert("Please select source airport");
      return;
    }
    if (dst === "") {
      alert("Please select destination airport");
      return;
    }
    if (source === dst) {
      alert("Source and destination cannot be same");
      return;
    }
    if (date?.startDate === "") {
      alert("Please select departure date");
      return;
    }
    if (isOneWay === 1 && arrivalDate?.endDate === "") {
      alert("Please select arrival date");
      return;
    }
    if (adults === 0) {
      alert("Please select number of adults");
      return;
    }
    if (classType === "") {
      alert("Please select class type");
      return;
    }

    router.push(`/search`)
    console.log("Form Submitted!");
  }
  return (
    <div className="my-bg-color w-full sm:pt-10 sm:pb-10 sm:pl-16 sm:pr-16 flex items-center justify-center">
      <div className="w-full lg:w-[90%] sm:border-2 rounded-lg p-4 sm:p-16">
        <h1 className="mb-8 text-2xl font-extrabold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">
          Quickly scan all your favourite{" "}
          <span className="underline underline-offset-3  decoration-4 sm:decoration-8 decoration-[#ff6f2a]">
            Travel
          </span>{" "}
          sites!
        </h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
              <li className="w-fit">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOneWay(0);
                    setIsRoundTrip(false)
                  }}
                  className={`inline-block w-full p-4 ${isOneWay == 0
                    ? "my-btn-color active text-white"
                    : " bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    } ring-0 rounded-l-lg focus:outline-none leading-none`}
                >
                  <BsArrowRightCircle className="h-6 w-6 mr-2 inline leading-none" />
                  Oneway
                </button>
              </li>
              <li className="w-fit">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOneWay(1);
                    setIsRoundTrip(true)
                  }}
                  className={`inline-block w-full p-4 ring-0 ${isOneWay == 1
                    ? "my-btn-color active text-white"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    } rounded-r-lg focus:outline-none`}
                >
                  <AiOutlineSwap className="h-6 w-6 mr-2 inline leading-none" />
                  Round Trip
                </button>
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full flex items-center bg-gray-50 border-gray-300 text-gray-900 appearance-none dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-200 rounded py-3 px-4">
              <IoIosAirplane className="h-6 w-6" />
              <input
                className="appearance-none w-full bg text-gray-900 dark:text-gray-200  py-2.5 px-4 leading-tight outline-none focus:outline-none border-none focus:border-none focus:ring-0 bg-transparent"
                id="grid-first-name"
                type="text"
                placeholder="Mumbai"
                list="airports-src"
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  handleCityChange(e);
                }}
                required
              />
              <datalist id="airports-src">
                {airports.map((airport) => {
                  return <option value={`${airport.iata} ${airport.name}`} key={airport.iata} />;
                })}
              </datalist>
            </div>
            <div className="w-full flex items-center bg-gray-50 border-gray-300 text-gray-900 appearance-none dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-200 rounded py-3 px-4">
              <BiCurrentLocation className="h-6 w-6" />

              <input
                className="appearance-none w-full bg text-gray-900 dark:text-gray-200  py-2.5 px-4 leading-tight outline-none focus:outline-none border-none focus:border-none focus:ring-0 bg-transparent"
                id="grid-last-name"
                type="text"
                placeholder="Kerela"
                list="airports-dst"
                value={dst}
                onChange={(e) => {
                  setDst(e.target.value);
                  handleCityChange(e);
                }}
                required
              />
              <datalist id="airports-dst">
                {airports.map((airport) => {
                  return <option value={`${airport.iata} ${airport.name}`} key={airport.iata} />;
                })}
              </datalist>
            </div>
          </div>
          <div className="w-full flex space-x-4">
            <div className="w-full flex items-center bg-gray-50 border-gray-300 text-gray-900 appearance-none dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-200 rounded py-3 px-4">
              <BsFillPersonFill className="h-6 w-6" />
              <input
                // className="appearance-none block w-full bg-gray-800 text-gray-200 border rounded py-3 px-4 mb-3 leading-tight"
                className="appearance-none w-full bg text-gray-900 dark:text-white py-2.5 px-4 leading-tight outline-none focus:outline-none border-none focus:border-none focus:ring-0 bg-transparent"
                type="number"
                step="1"
                placeholder="Adults"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                required
                min={1}
                max={9}
              />
            </div>
            <div className="w-full flex items-center bg-gray-50 border-gray-300 text-gray-900 appearance-none dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-200 rounded py-3 px-4">
              <FaChild className="h-6 w-6" />
              <input
                // className="appearance-none block w-full bg-gray-800 text-gray-200 border rounded py-3 px-4 mb-3 leading-tight"
                className="appearance-none w-full bg text-gray-900 dark:text-white py-2.5 px-4 leading-tight outline-none focus:outline-none border-none focus:border-none focus:ring-0 bg-transparent"
                type="number"
                step="1"
                placeholder="Children"
                value={childrenn}
                onChange={(e) => setChildrenn(parseInt(e.target.value))}
                min={0}
                max={9}
              />
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full flex items-center bg-gray-50 border-gray-300 text-gray-900 appearance-none dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-200 rounded py-3 px-4">
              <BsCalendarDate />
              {isOneWay == 0 ? (
                <Datepicker
                  asSingle={true}
                  value={date}
                  onChange={handleValueChange}
                  primaryColor={"orange"}
                  showShortcuts={true}
                  inputClassName="appearance-none w-full text-gray-900 dark:text-gray-200  py-2.5 px-4 leading-tight outline-none focus:outline-none border-none focus:border-none focus:ring-0 bg-transparent"
                  toggleClassName="hidden"
                  containerClassName="w-full"
                />
              ) : (
                <Datepicker
                  value={date}
                  onChange={handleValueChange}
                  primaryColor={"orange"}
                  showShortcuts={true}
                  inputClassName="appearance-none w-full bg text-gray-900 dark:text-gray-200  py-2.5 px-4 leading-tight outline-none focus:outline-none border-none focus:border-none focus:ring-0 bg-transparent"
                  toggleClassName="hidden"
                  containerClassName="w-full"
                />
              )}
            </div>
            <div className="w-full flex items-center bg-gray-50 border-gray-300 text-gray-900 appearance-none dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-200 rounded py-3 px-4">
              <MdAirlineSeatReclineExtra className="h-6 w-6" />
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                appearance-none py-2.5 px-4 leading-tight outline-none focus:outline-none border-none focus:border-none focus:ring-0 bg-transparent"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                required
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
            <button
              type="submit"
              className="inline-flex w-full sm:w-auto items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg my-btn-color"
            >
              <BsSearch className="h-5 w-6 mr-2" />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
