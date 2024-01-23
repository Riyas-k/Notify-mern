"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const reminderSchema_1 = __importDefault(require("../models/reminderSchema"));
//Whatsapp reminding functionality
setInterval(async () => {
    try {
        const reminderList = await reminderSchema_1.default.find({}).exec(); // Use .exec() to execute the query
        if (reminderList) {
            for (const reminder of reminderList) {
                if (!reminder.isReminded) {
                    const now = new Date();
                    const remindAt = reminder.remindAt;
                    if (remindAt) {
                        const remindAtDate = new Date(remindAt);
                        if (!isNaN(remindAtDate.getTime()) &&
                            remindAtDate.getTime() - now.getTime() < 0) {
                            await reminderSchema_1.default.findByIdAndUpdate(reminder._id, {
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
                            }
                            catch (error) {
                                console.error("Error sending WhatsApp message:", error);
                            }
                        }
                    }
                    else {
                        console.error("Invalid date format for reminder.remindAt");
                    }
                }
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}, 1000);
module.exports = {
    allReminders: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await reminderSchema_1.default.find();
                if (data.length) {
                    resolve(data);
                }
                else {
                    reject("no data");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    postReminder: (reminderMsg, remindAt) => {
        return new Promise(async (resolve, reject) => {
            try {
                const reminder = new reminderSchema_1.default({
                    reminderMsg,
                    remindAt,
                    isReminded: false,
                });
                await reminder.save().then(() => {
                    resolve({ status: true });
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    removeReminder: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await reminderSchema_1.default.deleteOne({ _id: id }).then(() => {
                    resolve({ status: true });
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
};
