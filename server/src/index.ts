import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const server = express();
const SERVER_PORT = 1234;

server.get("/", (req, res) => {
  res.send("server connected successfully");
});

server.listen(SERVER_PORT, () => {
  console.log("server is running in http://localhost:1234");
});
