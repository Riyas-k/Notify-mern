//DB connection
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mohammedriyazriyaz04:qgJYRIJmuY14Z4Rj@cluster0.mlw4hzb.mongodb.net/reminder',).then(() => {
      console.log(`Database connected Successfully`);
    });
  } catch (error) {
    console.log(`Database error ${error}`);
    process.exit(1);
  }
};
export default connectDB;