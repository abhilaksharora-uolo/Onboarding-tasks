import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGO_URI as string;

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
};

export const connectDb = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export default mongoose;
