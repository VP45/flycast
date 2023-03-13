"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoIosAirplane } from "react-icons/io";
import { IoChevronBackSharp } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { Airport } from "../../../types/Airport";
import AirportJson from "../../../assets/airports.json";
import axios from "axios";
type Props = {};

const ResultPage = (props: Props) => {
  const {
    source,
    dst,
    departDate,
    arrivalDate,
    adults,
    childrenn,
    classType,
    date,
  } = useContext(AppContext);

  const fetchHotels = async (DstAirport: Airport | undefined) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=19.0785451%2C72.878176&radius=15000&type=lodging&key=AIzaSyC_A5HGA5UD40AEDoh-cU_z2zOrCA3Ie9U`,
      {
        method: "GET",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          'API-Key': 'AIzaSyC_A5HGA5UD40AEDoh-cU_z2zOrCA3Ie9U'
        }
      }
    ).then(res => {
      console.log("res",res)
      return res.json()
    }).then(data => {
      console.log("Hotels", data);
    })
    .catch(err => {
      console.log("Error",err)
    })

  //   let config = {
  //     method: "get",
  //     url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=19.0785451%2C72.878176&radius=15000&type=lodging&key=AIzaSyC_A5HGA5UD40AEDoh-cU_z2zOrCA3Ie9U",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     mode : "no-cors"
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log("erooorrrr",error);
  //     });
  };

  // const fetchTouristPlaces = async (DstAirport: Airport | undefined) => {
  //   const res = await fetch(
  //     `https://api.geoapify.com/v2/places?categories=tourism&filter=circle:${DstAirport?.lon},${DstAirport?.lat},20000&bias=proximity:${DstAirport?.lon},${DstAirport?.lat}&limit=20&apiKey=dec2570459f5495cbee4690db6a7ecd4`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await res.json();
  //   console.log("Tourst Places", data);
  // };
  useEffect(() => {
    if (source === "" || dst === "") {
      window.location.href = "/";
    }
    // if(date?.startDate === undefined || date?.endDate === undefined){
    //   window.location.href = "/"
    // }
    if (adults === 0) {
      window.location.href = "/";
    }
    if (classType === "") {
      window.location.href = "/";
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

    if (DstAirport === undefined) {
      window.location.href = "/";
    }
    console.log("DstAirport", DstAirport);
    fetchHotels(DstAirport);
    // fetchTouristPlaces(DstAirport);
  }, []);

  return (
    <div className="w-full sm:w-[98%] md:w-[90%] flex flex-col items-center mx-auto">
      <div className="mt-4 mb-4 w-full">
        {" "}
        {/* Back to Home */}
        <Link href="/" className="flex flex-row items-center space-x-2">
          <IoChevronBackSharp className="text-[#ff6f2a] hover:text-[#d8581d] w-6 h-6" />
          <p className="text-[#ff6f2a] hover:text-[#d8581d] text-lg">
            Back to Home
          </p>
        </Link>
      </div>
      <div className="mt-4 mb-4 w-full flex flex-col items-center space-y-10">
        {" "}
        {/* prediction box */}
        <div className="h-52 bg-fuchsia-600 w-full  max-w-6xl"></div>{" "}
        {/* flight cards */}
        <div className="w-full max-w-6xl flex flex-col space-y-6">
          {" "}
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
            <div className="max-w-sm md:max-w-md cursor-pointer rounded-xl bg-gray-800 p-3 shadow-lg hover:shadow-xl">
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img
                  src="https://thumbnails.production.thenounproject.com/gA9eZOvsBYSHrMumgrslmRGoBto=/fit-in/1000x1000/photos.production.thenounproject.com/photos/BCBA88B6-5B41-4B50-A786-E60CAA0ECDA3.jpg"
                  alt="wallpaper"
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

                  <span className="ml-1 text-sm text-slate-400">4.9</span>
                </div>
              </div>

              <div className="mt-1 p-2">
                <h2 className="text-slate-200">The Malta Hotel</h2>
                <p className="mt-1 text-sm text-slate-400">Italy, Europe</p>

                <div className="mt-3 flex items-end justify-between">
                  <p>
                    <span className="text-lg font-bold text-orange-500">
                      $1,421
                    </span>
                    <span className="text-sm text-slate-400">/night</span>
                  </p>

                  <div className="group inline-flex rounded-xl bg-orange-100 p-2 hover:bg-orange-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-400 group-hover:text-orange-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-sm md:max-w-md cursor-pointer rounded-xl  bg-gray-800 p-3 shadow-lg hover:shadow-xl">
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img
                  src="https://thumbnails.production.thenounproject.com/gA9eZOvsBYSHrMumgrslmRGoBto=/fit-in/1000x1000/photos.production.thenounproject.com/photos/BCBA88B6-5B41-4B50-A786-E60CAA0ECDA3.jpg"
                  alt="wallpaper"
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

                  <span className="ml-1 text-sm text-slate-400">4.9</span>
                </div>
              </div>

              <div className="mt-1 p-2">
                <h2 className="text-slate-200">The Malta Hotel</h2>
                <p className="mt-1 text-sm text-slate-400">Italy, Europe</p>

                <div className="mt-3 flex items-end justify-between">
                  <p>
                    <span className="text-lg font-bold text-orange-500">
                      $1,421
                    </span>
                    <span className="text-sm text-slate-400">/night</span>
                  </p>

                  <div className="group inline-flex rounded-xl bg-orange-100 p-2 hover:bg-orange-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-400 group-hover:text-orange-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-sm md:max-w-md cursor-pointer rounded-xl bg-gray-800 p-3 shadow-lg hover:shadow-xl">
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img
                  src="https://thumbnails.production.thenounproject.com/gA9eZOvsBYSHrMumgrslmRGoBto=/fit-in/1000x1000/photos.production.thenounproject.com/photos/BCBA88B6-5B41-4B50-A786-E60CAA0ECDA3.jpg"
                  alt="wallpaper"
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

                  <span className="ml-1 text-sm text-slate-400">4.9</span>
                </div>
              </div>

              <div className="mt-1 p-2">
                <h2 className="text-slate-200">The Malta Hotel</h2>
                <p className="mt-1 text-sm text-slate-400">Italy, Europe</p>

                <div className="mt-3 flex items-end justify-between">
                  <p>
                    <span className="text-lg font-bold text-orange-500">
                      $1,421
                    </span>
                    <span className="text-sm text-slate-400">/night</span>
                  </p>

                  <div className="group inline-flex rounded-xl bg-orange-100 p-2 hover:bg-orange-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-400 group-hover:text-orange-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
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
            <div className="w-full max-w-sm md:max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AfLeUgP7ry8QWp8A6HVV2SjVsTYQy_wlG3rctJ63cx7bPvpYwnmXzmvJP8H4kBg56xPQRGpiO6XPjLRyqIqdl1MpY1u-DrCqeBqUD9nsZ2jGsQwz5WF9q2rxURX2IVbZ2xSfa-c2siUqog8OIiDwn0OjzcJFuZBm1TLMWh1U9OFEHJ95LGPU&key=AIzaSyC_A5HGA5UD40AEDoh-cU_z2zOrCA3Ie9U"
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Second star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Third star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fourth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    $599
                  </span>
                  <a
                    href="#"
                    className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-btn-color text-white"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm md:max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AfLeUgP7ry8QWp8A6HVV2SjVsTYQy_wlG3rctJ63cx7bPvpYwnmXzmvJP8H4kBg56xPQRGpiO6XPjLRyqIqdl1MpY1u-DrCqeBqUD9nsZ2jGsQwz5WF9q2rxURX2IVbZ2xSfa-c2siUqog8OIiDwn0OjzcJFuZBm1TLMWh1U9OFEHJ95LGPU&key=AIzaSyC_A5HGA5UD40AEDoh-cU_z2zOrCA3Ie9U"
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Second star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Third star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fourth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    $599
                  </span>
                  <a
                    href="#"
                    className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-btn-color text-white"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm md:max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AfLeUgP7ry8QWp8A6HVV2SjVsTYQy_wlG3rctJ63cx7bPvpYwnmXzmvJP8H4kBg56xPQRGpiO6XPjLRyqIqdl1MpY1u-DrCqeBqUD9nsZ2jGsQwz5WF9q2rxURX2IVbZ2xSfa-c2siUqog8OIiDwn0OjzcJFuZBm1TLMWh1U9OFEHJ95LGPU&key=AIzaSyC_A5HGA5UD40AEDoh-cU_z2zOrCA3Ie9U"
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Second star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Third star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fourth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    $599
                  </span>
                  <a
                    href="#"
                    className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-btn-color text-white"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
