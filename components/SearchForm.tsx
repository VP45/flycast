import React from "react";
type Props = {};

const SearchForm = (props: Props) => {
  return (
    <div className="bg-white dark:bg-gray-900 w-full pt-10 pb-10 pl-16 pr-16 flex items-center justify-center">
      <form className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label
              htmlFor="origin"
              className="absolute inset-y-0 left-0 pl-3 pt-2 text-gray-600 font-bold"
            >
              From
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              className="border-gray-400 border-2 rounded-md py-2 px-3 w-full pl-10"
              placeholder="Enter origin"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="destination"
              className="absolute inset-y-0 left-0 pl-3 pt-2 text-gray-600 font-bold"
            >
              To
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              className="border-gray-400 border-2 rounded-md py-2 px-3 w-full pl-10"
              placeholder="Enter destination"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="relative">
            <label
              htmlFor="departure-date"
              className="absolute inset-y-0 left-0 pl-3 pt-2 text-gray-600 font-bold"
            >
              Depart
            </label>
            <input
              type="date"
              id="departure-date"
              name="departure-date"
              className="border-gray-400 border-2 rounded-md py-2 px-3 w-full pl-10"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="return-date"
              className="absolute inset-y-0 left-0 pl-3 pt-2 text-gray-600 font-bold"
            >
              Return
            </label>
            <input
              type="date"
              id="return-date"
              name="return-date"
              className="border-gray-400 border-2 rounded-md py-2 px-3 w-full pl-10"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="passengers"
              className="absolute inset-y-0 left-0 pl-3 pt-2 text-gray-600 font-bold"
            >
              Passengers
            </label>
            <select
              id="passengers"
              name="passengers"
              className="border-gray-400 border-2 rounded-md py-2 px-3 w-full pl-10"
              required
            >
              <option value="">
                Select
              </option>
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
              <option value="4">4 Passengers</option>
              <option value="5">5 Passengers</option>
              <option value="6">6 Passengers</option>
              <option value="7">7 Passengers</option>
              <option value="8">8 Passengers</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md w-full"
          >
            Search Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
