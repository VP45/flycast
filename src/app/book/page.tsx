import React from 'react'
import FlightCard from '../../../components/FlightCard'

type Props = {}

const page = (props: Props) => {

    const flightPred = {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2021-11-01",
        "numberOfBookableSeats": 9,
        "itineraries": [
            {
                "duration": "PT14H15M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "SYD",
                            "terminal": "1",
                            "at": "2021-11-01T11:35:00"
                        },
                        "arrival": {
                            "iataCode": "MNL",
                            "terminal": "2",
                            "at": "2021-11-01T16:50:00"
                        },
                        "carrierCode": "PR",
                        "number": "212",
                        "aircraft": {
                            "code": "333"
                        },
                        "operating": {
                            "carrierCode": "PR"
                        },
                        "duration": "PT8H15M",
                        "id": "1",
                        "numberOfStops": 0,
                        "blacklistedInEU": false
                    },
                    {
                        "departure": {
                            "iataCode": "MNL",
                            "terminal": "1",
                            "at": "2021-11-01T19:20:00"
                        },
                        "arrival": {
                            "iataCode": "BKK",
                            "at": "2021-11-01T21:50:00"
                        },
                        "carrierCode": "PR",
                        "number": "732",
                        "aircraft": {
                            "code": "320"
                        },
                        "operating": {
                            "carrierCode": "PR"
                        },
                        "duration": "PT3H30M",
                        "id": "2",
                        "numberOfStops": 0,
                        "blacklistedInEU": false
                    }
                ]
            }
        ],
        "price": {
            "currency": "EUR",
            "total": "355.34",
            "base": "255.00",
            "fees": [
                {
                    "amount": "0.00",
                    "type": "SUPPLIER"
                },
                {
                    "amount": "0.00",
                    "type": "TICKETING"
                }
            ],
            "grandTotal": "355.34"
        },
        "pricingOptions": {
            "fareType": ["PUBLISHED"],
            "includedCheckedBagsOnly": true
        },
        "validatingAirlineCodes": ["PR"],
        "travelerPricings": [
            {
                "travelerId": "1",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": "355.34",
                    "base": "255.00"
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "EOBAU",
                        "class": "E",
                        "includedCheckedBags": {
                            "weight": 25,
                            "weightUnit": "KG"
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "EOBAU",
                        "class": "E",
                        "includedCheckedBags": {
                            "weight": 25,
                            "weightUnit": "KG"
                        }
                    }
                ]
            }
        ]
    }

    const dstAirport = {
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
    }

    const srcAirport = {
        "id": 820,
        "name": "Dehradun Jolly Grant Airport",
        "iata": "DED",
        "icao": "VIDN",
        "city": "Dehradun",
        "lat": 30.18968,
        "lon": 78.180252,
        "country": "India",
        "alt": 1831,
        "size": 34405,
        "timezone": {
            "name": "Asia/Kolkata",
            "offset": 19800,
            "offsetHours": "5:30",
            "abbr": "IST",
            "abbrName": "India Standard Time",
            "isDst": false
        },
        "countryId": 102
    }

    const dictionaries = {
        "locations": {
            "BKK": {
                "cityCode": "BKK",
                "countryCode": "TH"
            },
            "MNL": {
                "cityCode": "MNL",
                "countryCode": "PH"
            },
            "SYD": {
                "cityCode": "SYD",
                "countryCode": "AU"
            }
        },
        "aircraft": {
            "320": "AIRBUS A320",
            "321": "AIRBUS A321",
            "333": "AIRBUS A330-300"
        },
        "currencies": {
            "EUR": "EURO"
        },
        "carriers": {
            "PR": "PHILIPPINE AIRLINES"
        }
    }

    return (
        <div className='my-16'>
            {/* Heading = "Book Your Flight" */}
            <div>
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white text-center">
                    Book Your Flight!
                </h1>
            </div>
            <div className='flex flex-col md:flex-row md:space-x-6 items-start p-6'>
                <div>
                    <FlightCard
                        timepass={0}
                        flight={flightPred}
                        classType={"Economy"}
                        dstAirport={dstAirport}
                        srcAirport={srcAirport}
                        dictionaries={dictionaries}
                    />
                </div>
                <section className="bg-white dark:bg-gray-900 mt-16 md:mt-0 w-full">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                            Add a new product
                        </h2>
                        <form action="#">
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="brand"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Product brand"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="$2999"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option value="TV">TV/Monitors</option>
                                        <option value="PC">PC</option>
                                        <option value="GA">Gaming/Console</option>
                                        <option value="PH">Phones</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="item-weight"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Item Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="item-weight"
                                        id="item-weight"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder={"12"}
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={8}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Your description here"
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            >
                                Add product
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default page