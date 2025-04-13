import express from "express";
import { body, query } from "express-validator";
import {
  getCoordinaties,
  getDistanceTime,
  getSuggestions,
} from "../controllers/maps.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
const maps = express.Router();

maps.get(
  "/getcoordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinaties
);
maps.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTime
);
 maps.get("/get-suggestions", query("input").isString().isLength({ min:3}), authUser, getSuggestions)

export default maps;
