require("dotenv").config();
import Reminder from "../models/reminderSchema";

setInterval(async () => {
  try {
    const reminderList = await Reminder.find({}).exec();

    if (reminderList) {
      for (const element of reminderList) {
        if (!element.isReminded) {
          const now = new Date();
          if (new Date(element.remindAt).getTime() - now.getTime() < 0) {
            // Use await to ensure the update completes before sending the message
            await Reminder.findByIdAndUpdate(element._id, { isReminded: true });

            // Send Message
            const accountSid = process.env.ACCOUNTSID;
            const authToken = process.env.AUTHTOKENTWILIO;
            const client = require("twilio")(accountSid, authToken);

            try {
              const message = await client.messages.create({
                body: element.reminderMsg,
                from: "whatsapp:+14155238886",
                to: "whatsapp:+918592948232",
              });
            } catch (error) {
              console.error("Error sending WhatsApp message:", error);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}, 1000);



module.exports = {
  allReminders: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any = await Reminder.find();
        if (data.length) {
          resolve(data);
        } else {
          reject("no data");
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
  postReminder: (reminderMsg: string, remindAt: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const reminder = new Reminder({
          reminderMsg,
          remindAt,
          isReminded: false,
        });
        await reminder.save().then(() => {
          resolve({ status: true });
        });
      } catch (error) {
        console.log(error);
      }
    });
  },
  removeReminder: (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Reminder.deleteOne({ _id: id }).then(() => {
          resolve({ status: true });
        });
      } catch (error) {
        console.log(error);
      }
    });
  },
};
