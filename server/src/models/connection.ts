//DB connection
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
  const URI:string | undefined = process.env.MONGO_URI || ''
  try {
    await mongoose.connect(URI).then(() => {
      console.log(`Database connected Successfully`);
    });
   
  } catch (error) {
    console.log(`Database error ${error}`);
    process.exit(1);
  }
};
export default connectDB;