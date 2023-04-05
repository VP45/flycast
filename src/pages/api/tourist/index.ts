const axios = require("axios").create({
  baseUrl: "https://jsonplaceholder.typicode.com/",
});
import { NextApiResponse, NextApiRequest } from "next";

const getTouristPlaces = async (req: NextApiRequest, res: NextApiResponse) => {
  const { lat, lon } = req.body;
  const response = await axios({
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lon}&radius=30000&type=tourist_attraction&keyword=tourist&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    method: "get",
    mode: "no-cors"
  })
  if(response.status !== 200) {
    res.status(500).json({ message: "Error" });
  }
  const data = response.data;
  res.status(200).json(data);
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
      getTouristPlaces(req, res);
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
