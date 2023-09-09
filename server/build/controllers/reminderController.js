"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reminderHelper = require("../helpers/reminderHelper");
module.exports = {
    getReminders: async (req, res) => {
        try {
            await reminderHelper.allReminders().then((response) => {
                res.json(response);
            });
        }
        catch (error) {
            console.log(error);
        }
    },
    addReminder: async (req, res) => {
        try {
            const { reminderMsg, remindAt } = req.body;
            await reminderHelper.postReminder(reminderMsg, remindAt).then((status) => {
                res.json(status);
            });
        }
        catch (error) {
            console.log(error);
        }
    },
    deleteReminder: async (req, res) => {
        try {
            const { id } = req.params;
            await reminderHelper.removeReminder(id).then((status) => {
                res.json(status);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
