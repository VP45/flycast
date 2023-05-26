import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) return;
    (await mongoose.connect(process.env.MONGO_URI ?? ""))
        .connection.on("connected", () => {
            console.log("Connected to MongoDB");
        }
        ).on("error", (err) => {
            console.log(err);
        }
        );
}

export default dbConnect;