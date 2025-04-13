import express from "express";
import { body } from "express-validator";
import { confirmRide, createRide, endRide, getFareCal, startRide ,} from "../controllers/ride.controller.js";
import { authUser,authCaptain } from "../middleware/auth.middleware.js";
const ride = express.Router();
const createRideValidator = [
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination address"),
    body("vehicleType").isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination address")
];
ride.post("/create",authUser,createRide);
ride.get("/getFare",getFareCal)

ride.post("/confirm",authCaptain,confirmRide)
ride.get("/start-ride",authCaptain,startRide)
ride.post("/end-ride",authCaptain,endRide)

export default ride;
