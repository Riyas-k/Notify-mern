"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reminderSchema = new mongoose_1.default.Schema({
    reminderMsg: String,
    remindAt: String,
    isReminded: Boolean,
});
const Reminder = mongoose_1.default.model("Reminder", reminderSchema);
exports.default = Reminder;
