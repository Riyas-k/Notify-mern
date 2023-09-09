"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const reminderController = require("../controllers/reminderController");
router.get("/getReminders", reminderController.getReminders);
router.post('/addReminder', reminderController.addReminder);
router.delete('/deleteReminder/:id', reminderController.deleteReminder);
module.exports = router;
