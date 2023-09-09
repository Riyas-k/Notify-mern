//DB connection
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/notify',).then(() => {
      console.log(`Database connected Successfully`);
    });
  } catch (error) {
    console.log(`Database error ${error}`);
    process.exit(1);
  }
};
export default connectDB;