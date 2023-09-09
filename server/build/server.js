"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./models/connection"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
const reminderRouter = require('./routes/reminder');
// Use the cors middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
(0, connection_1.default)();
app.use('/api', reminderRouter);
app.listen(PORT, () => {
    console.log("Server started");
});
