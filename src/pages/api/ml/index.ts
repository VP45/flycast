import { NextApiResponse, NextApiRequest } from "next";

const getFlightPrice = async (req: NextApiRequest, res: NextApiResponse) => {
  const { input } = req.body;
  fetch("https://2cce-103-44-50-74.in.ngrok.io/getPrice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: input
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log("error", error)
      res.status(500).json({ message: "Error", error: error });
    });
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
