import mongoose from "mongoose";

export const connectDB = async() => {
    mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log("connected to database");
    })
    .catch((e) => {
      console.log(e);
    });
}
