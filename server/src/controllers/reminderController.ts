import { Request, Response } from "express";
const reminderHelper = require("../helpers/reminderHelper");

module.exports = {
  getReminders: async (req: Request, res: Response) => {
    try {
      await reminderHelper.allReminders().then((response: any) => {
        res.json(response)
      });
    } catch (error) {
      console.log(error);
    }
  },
  addReminder: async (req: Request, res: Response) => {
    try {
        const {reminderMsg,remindAt} = req.body;
        await reminderHelper.postReminder(reminderMsg,remindAt).then((status:boolean)=>{
           res.json(status)
        })

    } catch (error) {
      console.log(error);
    }
  },
  deleteReminder:async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        await reminderHelper.removeReminder(id).then((status:boolean)=>{
           res.json(status)
        })
    } catch (error) {
        console.log(error);
    }
  }
};
