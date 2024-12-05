import { Router } from "express";
import authRouer from "./authRouter.js";

const appRouter = Router();

appRouter.use("/auth", authRouer);

export default appRouter;
