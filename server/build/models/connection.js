"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//DB connection
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
const connectDB = async () => {
    const URI = process.env.MONGO_URI || '';
    try {
        await mongoose_1.default.connect(URI).then(() => {
            console.log(`Database connected Successfully`);
        });
    }
    catch (error) {
        console.log(`Database error ${error}`);
        process.exit(1);
    }
};
exports.default = connectDB;
