import axios from "../axios/config";

export const getRemindersAll = async () => {
  try {
    const data = await axios.get("/getReminders");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteReminder = async (id) => {
  try {
    await axios.delete(`/deleteReminder/${id}`);
    return;
  } catch (error) {
    console.log(error);
  }
};
export const remainderAdd = async (remindAt, reminderMsg) => {
  try {
    await axios.post("/addReminder", { reminderMsg, remindAt });
    return;
  } catch (error) {
    console.log(error);
  }
};
