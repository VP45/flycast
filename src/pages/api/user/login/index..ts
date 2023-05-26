const axios = require("axios")
import dbConnect from "@/config/dbConnect";
import { NextApiResponse, NextApiRequest } from "next";
import User from "@/models/User";

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { password, email } = req.body;
        dbConnect();

        const user = await User.findOne({ email: email });
        if (user) {
            // check password
            user.comparePassword(password, (err: any, isMatch: boolean) => {
                if (err) {
                    res.status(500).json({ message: "Server error!" });
                    return;
                }
                if (isMatch) {
                    res.status(200).json({
                        message: "User logged in successfully!",
                        user: {
                            name: user.name,
                            email: user.email,
                            _id: user._id
                        }
                    });
                }
                else {
                    res.status(500).json({ message: "Incorrect password!" });
                }
            });
        } else {
            console.log("user", user);
            res.status(500).json({ message: "User does not exist!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error!" });
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
            loginUser(req, res);
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
