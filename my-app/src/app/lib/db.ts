import mongoose from "mongoose";
const mongo_DB_URI = process.env.URI ;
if (!mongo_DB_URI) {
  throw new Error("MONGO_DB_URI is not defined in the environment variables");
}

export default function connect() {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("MongoDB is already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("MongoDB is connecting");
  return;}
  try {
    mongoose.connect(mongo_DB_URI!,{
        dbName: "sample_mflix",
        bufferCommands: true
    })
  } catch (error) {
    console.error("Error: " , error);
  }
}
