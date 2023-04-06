import React, { Context, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Airports } from "../types/Airport";
import { Airport } from "../types/Airport";
import { ContextType } from "../types/ContextTypes";
import { HotelType } from "../types/Hotels";
import { TouristPlace } from "../types/Tourism";

export const AppContext = React.createContext<ContextType>({ source: "", setSource: () => { }, dst: "", setDst: () => { }, departDate: { startDate: new Date(), endDate: new Date().setMonth(3).toString() }, setDepartDate: () => { }, arrivalDate: { startDate: new Date(), endDate: new Date().setMonth(3).toString() }, setArrivalDate: () => { }, adults: 1, setAdults: () => { }, childrenn: 0, setChildrenn: () => { }, airports: [], setAirports: () => { }, classType: "Economy", setClassType: () => { }, date: { startDate: new Date(), endDate: new Date().setMonth(3).toString() }, setDate: () => { }, hotels: [], setHotels: () => { }, topPlaces: [], setTopPlaces: () => { }, dstForMap: { "id": 8115, "name": "Delhi Hindon Airport", "iata": "QAH", "icao": "VIDX", "city": "Delhi", "lat": 28.707708, "lon": 77.359734, "country": "India", "alt": 701, "size": 2973, "timezone": { "name": "Asia/Calcutta", "offset": 19800, "offsetHours": "5:30", "abbr": "IST", "abbrName": "India Standard Time", "isDst": false }, "countryId": 102}, setDstForMap: () => { } , showTripPlanner: false, setShowTripPlanner : ()=>{}, isRoundTrip:false, setIsRoundTrip : ()=>{} } );

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const [data, setData] = useState("Parteek")

  // states for flight search form
  const [source, setSource] = useState("");
  const [dst, setDst] = useState("");
  const [departDate, setDepartDate] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date().setMonth(3).toString(), /// ifff errrr  change to Date().setMonth(3) only   🌿🌿🌿
  });
  const [arrivalDate, setArrivalDate] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date().setMonth(3).toString(), /// ifff errrr  change to Date().setMonth(3) only   🌿🌿🌿
  });
  const [adults, setAdults] = useState(1);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [childrenn, setChildrenn] = useState(0);
  const [airports, setAirports] = useState<Airports>([]);
  const [classType, setClassType] = useState("Economy");
  const [date, setDate] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date().setMonth(3).toString(), /// ifff errrr  change to Date().setMonth(3) only   🌿🌿🌿
  });
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [showTripPlanner, setShowTripPlanner] = useState<boolean>(false);
  const [topPlaces, setTopPlaces] = useState<TouristPlace[]>([]);
  const [dstForMap, setDstForMap] = useState<Airport>({
    "id": 8115,
    "name": "Delhi Hindon Airport",
    "iata": "QAH",
    "icao": "VIDX",
    "city": "Delhi",
    "lat": 28.707708,
    "lon": 77.359734,
    "country": "India",
    "alt": 701,
    "size": 2973,
    "timezone": {
      "name": "Asia/Calcutta",
      "offset": 19800,
      "offsetHours": "5:30",
      "abbr": "IST",
      "abbrName": "India Standard Time",
      "isDst": false
    },
    "countryId": 102
  });

  return (
    <AppContext.Provider
      value={{
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
        hotels,
        setHotels,
        topPlaces,
        setTopPlaces,
        dstForMap,
        setDstForMap,
        showTripPlanner,
        setShowTripPlanner,
        isRoundTrip,
        setIsRoundTrip
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
