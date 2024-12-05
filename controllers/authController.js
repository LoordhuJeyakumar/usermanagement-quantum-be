import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/validatePassword.js";
import { validateEmail } from "../utils/validateEmail.js";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";
export const register = async (request, response) => {
  const { name, email, password, dob } = request.body;
  try {
    if (!name || !email || !password || !dob) {
      return response
        .status(400)
        .send({ message: "Please provide all the details" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return response.status(400).send({ message: "User already exists" });
    }

    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      return response.status(400).send({
        message: "Please enter a valid email address",
      });
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return response.status(400).send({
        message:
          "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      dob,
    });

    return response.status(201).send({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    return response.status(500).send({ message: "Internal server error" });
  }
};

export const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    if (!email || !password) {
      return response
        .status(400)
        .send({ message: "Please provide all the details" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return response.status(400).send({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return response.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        dob: existingUser.dob,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
        role: existingUser.role,
        status: existingUser.status,
      },
      envConfig.JWT_SECRET,
      { expiresIn: "7h" }
    );

    return response.status(200).send({
      message: "User logged in successfully",
      token,
      user: {
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    return response.status(500).send({ message: "Internal server error" });
  }
};
