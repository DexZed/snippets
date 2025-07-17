import mongoose, { connect } from "mongoose";
import { env } from "../env";

export default async function mongooseConnect(): Promise<void> {
  try {
    const mongoDBURI = env.DATABASE_URL ?? "mongodb://localhost:27017";
    await connect(mongoDBURI);
    mongoose.connection.on("connected", () => console.log("connected"));
    mongoose.connection.on("open", () => console.log("open"));
    mongoose.connection.on("disconnected", () => console.log("disconnected"));
    mongoose.connection.on("reconnected", () => console.log("reconnected"));
    mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
    mongoose.connection.on("close", () => console.log("close"));
   
  } catch (error) {
     mongoose.connection.on("error", (error) => console.log(error));
  }
}
