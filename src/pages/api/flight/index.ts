var Amadeus = require('amadeus');
// const axios = require("axios").create({
//     baseUrl: "https://jsonplaceholder.typicode.com/",
// });
import { NextApiResponse, NextApiRequest } from "next";

var amadeus = new Amadeus({
    clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
    clientSecret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET
});

function formatDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(str => parseInt(str));
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
}

const getFlights = async (req: NextApiRequest, res: NextApiResponse) => {
    const { src, dst, classType, date, adults, children, isRoundTrip } = req.body;
    if (isRoundTrip) {
        amadeus.shopping.flightOffersSearch.get({
            originLocationCode: src,
            destinationLocationCode: dst,
            departureDate: formatDate(date.startDate),
            adults: adults,
            children: children,
            max: 50,
            currencyCode: "INR",
            returnDate: formatDate(date.endDate)
        }).then(function (response: any) {
            res.status(200).json(response.body);
        }).catch(function (responseError: any) {
            res.status(500).json({ message: "Error", error: responseError });
        });
    } else {
        amadeus.shopping.flightOffersSearch.get({
            originLocationCode: src,
            destinationLocationCode: dst,
            departureDate: formatDate(date.startDate),
            adults: adults,
            children: children,
            max: 50,
            currencyCode: "INR",

        }).then(function (response: any) {
            res.status(200).json(response.body);
        }).catch(function (responseError: any) {
            res.status(500).json({ message: "Error", error: responseError });
        });
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method;
    switch (method) {
        case "GET":
            break;
        case "POST":
            getFlights(req, res);
            break;
        case "PATCH":
            break;
        case "DELETE":
            break;
        default:
            res.status(500).json({ message: "Method not allowed" });
            break;
    }
}
