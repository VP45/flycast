"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import GoogleTranslate from "./GoogleTranslate";

// Do NOT use this! It will throw a hydration mismatch error.
const DarkModeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {/* <select className="hidden sm:block border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}
      <GoogleTranslate />


      {currentTheme === "dark" ? (
        <BsFillSunFill
          className="h-8 w-8 cursor-pointer text-yellow-500"
          onClick={() => {
            setTheme("light")
            document.documentElement.classList.remove('dark');
          }}
        />
      ) : (
        <BsFillMoonFill
          className="h-8 w-8 cursor-pointer"
          onClick={() => {
            setTheme("dark")
            document.documentElement.classList.add('dark');
          }}
        />
      )}
    </>
  );
};

export default DarkModeBtn;
