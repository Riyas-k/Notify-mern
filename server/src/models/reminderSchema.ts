import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  reminderMsg: String,
  remindAt: String,
  isReminded: Boolean,
});
const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
