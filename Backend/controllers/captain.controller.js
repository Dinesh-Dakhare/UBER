import { validationResult } from "express-validator";
import { captainModel } from "../Models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import blacklistTokenModel from "../Models/blacklistToken.model.js";
export const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, password, email, vehicle } = req.body;

  const isCaptainAlreadyRegistered = await captainModel.findOne({ email });

  if (isCaptainAlreadyRegistered) {
    return res.status(400).json({ message: "Captain already registered" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = await captain.generateAuthToken();
  res.status(201).json({
    token,
    captain,
  });
};

export const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email });

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.camparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await captain.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({ token, captain });
};

export const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Captain Logged Out" });
};

//get captain profile

export const getCaptainProfile = async (req, res, next) => {
 

  const captain = await captainModel.findById(req.captain._id);

  if (!captain) {
    return res.status(404).json({ message: "Captain not found" });
  }

  res.status(200).json(captain);
};
