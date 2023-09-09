import express from "express";
const router = express.Router();
const reminderController = require("../controllers/reminderController");

router.get("/getReminders", reminderController.getReminders);

router.post('/addReminder',reminderController.addReminder)

router.delete('/deleteReminder/:id',reminderController.deleteReminder)

module.exports = router;