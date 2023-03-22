"use client";

import { useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import Hero from "../../components/Hero";
import SearchForm from "../../components/SearchForm";
import TopCities from "../../components/TopCities";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchForm />
      <TopCities />
    </>
  );
}
