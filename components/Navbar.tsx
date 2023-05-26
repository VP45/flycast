"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import DarkModeBtn from "./DarkModeBtn";
import LOGO from "../assets/FlyCast_Orange.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { AppContext } from "../context/AppContext";
import GoogleTranslate from "./GoogleTranslate";
import { useSession } from "next-auth/react";
import MenuDropdown from "./MenuDropdown";
const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // Testing codes starts *********************************************

  // const context = useContext(AppContext);

  // console.log("Hellooo", context.data);
  // Testing codes ends ***********************************************

  console.log("session", session);
  return (
    <nav className="bg-white px-2 sm:px-4 pb-2.5 pt-2.5 my-bg-color sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src={LOGO}
            className="h-9 w-9 mr-3 sm:h-12 sm:w-12"
            alt="Logo"
            width={60}
            height={60}
          />
          <span className="text-black self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            FlyCast
          </span>
        </Link>
        <div className="flex items-center space-x-4 md:order-2">
          <DarkModeBtn />
          {/* *********************** Hamburger ***********************/}
          {/* <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button> */}

          {
            session ? (
              <MenuDropdown session={session} />
            ) : (
              <Link href="/login"
                className={` inline-flex items-center justify-center px-3 py-1.5 mr-3 text-base font-medium text-center text-white rounded-lg my-btn-color`}
              >
                Login
              </Link>
            )
          }

        </div>
        {/* <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:my-bg-color dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <Link
                href="#services"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
