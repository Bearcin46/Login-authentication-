import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes";
import { authRouter } from "./routes/auth";

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
const SERVER_PORT = 1234;

const connection: string = process.env.MONGODB_URL || "";
console.log(connection);
mongoose.connect(connection).then(() => {
  console.log("connected to db");
});

server.get("/", (req, res) => {
  res.send("server connected successfully");
});

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

server.listen(SERVER_PORT, () => {
  console.log("server is running in http://localhost:1234");
});
