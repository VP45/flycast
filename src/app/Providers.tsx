"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import AppProvider from "../../context/AppContext";

const Providors = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
};

export default Providors;
