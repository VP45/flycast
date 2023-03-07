import Image from "next/image";
import React from "react";
import LOGO from "../assets/FlyCast_Orange.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full p-4 bg-white rounded-lg shadow md:px-6 md:py-8 my-bg-color">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
          <Image
            src={LOGO.src}
            className="h-9 w-9 mr-3 sm:h-12 sm:w-12"
            alt="FlyCast Logo"
            width={60}
            height={60}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            FlyCast
          </span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 3{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          FlyCast
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
