const axios = require("axios")
import dbConnect from "@/config/dbConnect";
import { NextApiResponse, NextApiRequest } from "next";
import User from "@/models/User";

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, password, email } = req.body;
    dbConnect();

    const user = await User.find({ email: email });
    console.log("user", user);
    if (user.length > 0) {
        res.status(500).json({ message: "User already exists" });
        return;
    }
    const response = await User.create({
        name,
        password,
        email
    });
    if (response) {
        // send user object without password
        res.status(200).json({
            message: "User created successfully!",
            user: {
                name: response.name,
                email: response.email,
                _id: response._id
            }
        });
    } else {
        res.status(500).json({ message: "Something went wrong" });
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
            addUser(req, res);
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
