require("dotenv").config();
import Reminder from "../models/reminderSchema";

//Whatsapp reminding functionality

setInterval(async () => {
  try {
    const reminderList = await Reminder.find({}).exec(); // Use .exec() to execute the query
    if (reminderList) {
      for (const reminder of reminderList) {
        if (!reminder.isReminded) {
          const now: Date = new Date();
          const remindAt: string | undefined = reminder.remindAt;

          if (remindAt) {
            const remindAtDate: Date = new Date(remindAt);

            if (
              !isNaN(remindAtDate.getTime()) &&
              remindAtDate.getTime() - now.getTime() < 0
            ) {
              await Reminder.findByIdAndUpdate(reminder._id, {
                isReminded: true,
              });

              const accountSid = process.env.ACCOUNTSID;
              const authToken = process.env.AUTHTOKENTWILIO;
              const client = require("twilio")(accountSid, authToken);

              try {
                const message = await client.messages.create({
                  body: reminder.reminderMsg,
                  from: "whatsapp:+14155238886",
                  to: "whatsapp:+918592948232", // YOUR PHONE NUMBER INSTEAD OF 8888888888
                });
                console.log(`WhatsApp message sent: ${message.sid}`);
              } catch (error) {
                console.error("Error sending WhatsApp message:", error);
              }
            }
          } else {
            console.error("Invalid date format for reminder.remindAt");
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
