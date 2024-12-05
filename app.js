import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import appRouter from "./routes/index.js";

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

//Server Status and details about the app and server in root endpoint
app.get("/", (request, response) => {
  let mongoDBStatus = mongoose.connection.readyState;
  response.status(200).send({
    message: "Welcome to the Quantum IT Task",
    serverStatus: "Running",
    mongoDBStatus: mongoDBStatus === 1 ? "Connected" : "Disconnected",
    appVersion: "1.0.0",
    author: "Loordhu Jeyakumar",
    email: "loordhujeyakumar@gmail.com",
    github: "https://github.com/LoordhuJeyakumar/usermanagement-quantum-be.git",
  });
});

//Routes
app.use("/api/v1", appRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

export default app;
