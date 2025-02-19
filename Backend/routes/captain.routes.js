import express from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controllers/captain.controller.js";
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
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("invalid vehicle type"),
  ],
  registerCaptain
);

export default captain;
