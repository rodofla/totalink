import mongoose from "mongoose";

export const connectDB = async () => {
  try {

    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.info(`MongoDB connected: ${url}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}