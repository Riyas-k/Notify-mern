"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reminderSchema_1 = __importDefault(require("../models/reminderSchema"));
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
