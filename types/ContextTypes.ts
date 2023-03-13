import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Airports } from "./Airport";

export type SetStateTypeForSrings = React.Dispatch<React.SetStateAction<string>>;
export type ContextType = {
  source: string;
  setSource: SetStateTypeForSrings;
  dst: string;
  setDst: SetStateTypeForSrings;
  departDate: DateValueType;
  setDepartDate: React.Dispatch<React.SetStateAction<DateValueType>>;
  arrivalDate: DateValueType;
  setArrivalDate: React.Dispatch<React.SetStateAction<DateValueType>>;
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  childrenn: number;
  setChildrenn: React.Dispatch<React.SetStateAction<number>>;
  airports: Airports;
  setAirports: React.Dispatch<React.SetStateAction<Airports>>;
  classType: string;
  setClassType: SetStateTypeForSrings;
  date: DateValueType;
  setDate: React.Dispatch<React.SetStateAction<DateValueType>>;
};