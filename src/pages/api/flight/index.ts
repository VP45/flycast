var Amadeus = require('amadeus');
const axios = require("axios").create({
    baseUrl: "https://jsonplaceholder.typicode.com/",
});
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
    // const { lat, lon } = req.body;
    // const response = await axios({
    //   url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lon}&radius=50000&type=tourist_attraction&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    //   method: "get",
    //   mode: "no-cors"
    // })
    // if(response.status !== 200) {
    //   res.status(500).json({ message: "Error" });
    // }
    // const data = response.data;
    // res.status(200).json(data);
    // const res = req.body;
    const { src, dst, classType, date, adults, children } = req.body;
    console.log("date", date)
    // convert date from 2023-6-11 to 2023-06-11
    // date.startDate = date.startDate.replace(/-/g, "-0");
    // date.endDate = date.endDate.replace(/-/g, "-0");
    // console.log("updatedDate", date)
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: src,
        destinationLocationCode: dst,
        departureDate: '2023-06-01',
        adults: adults,
        children: children,
        max: 50
    }).then(function (response: any) {
        // console.log(response.data);
        res.status(200).json(response.body);
    }).catch(function (responseError: any) {
        // console.log(responseError.code);
        res.status(500).json({ message: "Error", error: responseError });
    });
    // console.log(req.body);
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
