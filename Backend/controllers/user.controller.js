import { userModel } from "../Models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../Models/blacklistToken.model.js";
//Register User

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;


  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }
  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

//Login User

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid User And Password" });
  }

  const isMatch = await user.camparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid User And Password" });
  }

  const token = await user.generateAuthToken();
  res.cookie("token", token);

  res.status(201).json({ token, user });
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "User Logged Out" });
}; 

//get user profile
export const getUserProfile = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({ user });
};
