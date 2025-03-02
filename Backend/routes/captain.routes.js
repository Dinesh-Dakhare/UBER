import express from "express";
import { body } from "express-validator";
import {
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middleware/auth.middleware.js";
const captain = express.Router();

captain.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("invalid firstname must be at least 3 letters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 character"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("color must be 3 character"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("plate must be 3 character"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["Car", "Motorcycle", "Auto"])
      .withMessage("invalid vehicle type"),
  ],
  registerCaptain
);

captain.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 character"),
  ],
  loginCaptain
);

captain.get("/logout", logoutCaptain);

captain.get("/profile", authCaptain, getCaptainProfile);

export default captain;
