const axios = require("axios").create({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  });
  import { NextApiResponse, NextApiRequest } from "next";
  
  const getFlightPrice = async (req: NextApiRequest, res: NextApiResponse) => {
    const { input } = req.body;
    const response = await axios({
      url: ``,
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
        getFlightPrice(req, res);
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
  