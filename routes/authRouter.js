import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const authRouer = Router();

authRouer.post("/register", register);
authRouer.post("/login", login);

export default authRouer;
