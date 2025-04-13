import {
  getAddressCoordinate,
  getAutocompleteSuggestions,
  getDistanceTimeService,
} from "../services/maps.service.js";
import { validationResult } from "express-validator";

export const getCoordinaties = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json({
      coordinates,
    });
  } catch (error) {
    res.status(200).json({
      message: "Coordinaties  not found",
    });
  }
};

export const getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const distanceTime = await getDistanceTimeService(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    const suggestions = await getAutocompleteSuggestions(input);
    res.status(200).json({
      suggestions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error ",
    });
  }
};
