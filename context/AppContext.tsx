import React, { Context, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Airports } from "../types/Airport";
import { ContextType } from "../types/ContextTypes";

export const AppContext = React.createContext<ContextType>({ source : "" , setSource : () => {} , dst : "" , setDst : () => {} , departDate : { startDate : new Date() , endDate : new Date().setMonth(3).toString() } , setDepartDate : () => {} , arrivalDate : { startDate : new Date() , endDate : new Date().setMonth(3).toString() } , setArrivalDate : () => {} , adults : 1 , setAdults : () => {} , childrenn : 0 , setChildrenn : () => {} , airports : [] , setAirports : () => {} , classType : "Economy" , setClassType : () => {} , date : { startDate : new Date() , endDate : new Date().setMonth(3).toString() } , setDate : () => {}});

const AppProvider = ({ children } : { children : React.ReactNode}) => {
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
  const [childrenn, setChildrenn] = useState(0);
  const [airports, setAirports] = useState<Airports>([]);
  const [classType, setClassType] = useState("Economy");
  const [date, setDate] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date().setMonth(3).toString(), /// ifff errrr  change to Date().setMonth(3) only   🌿🌿🌿
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
