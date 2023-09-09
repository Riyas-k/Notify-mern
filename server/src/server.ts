require("dotenv").config();
import express from "express";
import cors from "cors";
import connectDB from "./models/connection";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const reminderRouter = require('./routes/reminder')

// Use the cors middleware
app.use(express.urlencoded({extended:true}));
app.use(cors());

connectDB()

app.use('/api',reminderRouter)

app.listen(PORT, () => {
  console.log("Server started");
});
