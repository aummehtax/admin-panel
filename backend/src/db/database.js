import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoInstance = await mongoose.connect(
      `${process.env.MONGOD_URL}/${DB_NAME}`,
    );
    console.log(`mongod host : ${mongoInstance.connection.host}`);
  } catch (error) {
    console.log("mongoDB connection failed : ", error);
    process.exit(1);
  }
};

export default connectDB;
