//DB connection
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mohammedriyazriyaz04:Mm0Fvg1KTBB8i0J3@cluster0.cxy77zs.mongodb.net/reminder',).then(() => {
      console.log(`Database connected Successfully`);
    });
   
  } catch (error) {
    console.log(`Database error ${error}`);
    process.exit(1);
  }
};
export default connectDB;