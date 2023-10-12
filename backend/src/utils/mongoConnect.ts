import mongoose from "mongoose";

export default async (uri:any) => {
  const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(uri)
      .then(() => {
        return console.log(`Successfully connected to db`);
      })
      .catch((error) => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on("disconnected", connect);
};
