import { validationResult } from "express-validator";
import {
  createRideService,
  getFare,
  confirmRideService,
  startRideService,
  endRideService
} from "../services/ride.service.js";
import {
  getAddressCoordinate,
  getCaptainsInTheRadius,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../Socket.js";
import { rideModel } from "../Models/ride.model.js";
export const createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //TODO: Implement ride creation logic here

  const { pickup, destination, vehicleType } = req.body;
  console.log(req.user._id);
  console.log(pickup, destination, vehicleType);

  try {
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);
    const pickupCoordinates = await getAddressCoordinate(pickup);
    console.log(pickupCoordinates);

    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );
    ride.opt = " ";
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    captainsInRadius.map((captain) => {
      if (captain.socketId) {
        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });
      } else {
        console.error(`Captain ${captain._id} has no socketId.`);
      }
    });
    console.log(captainsInRadius);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFareCal = async (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  const { pickup, destination } = req.query;

  try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch ({ error }) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const confirmRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await confirmRideService({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const startRide = async (req, res, next) => {
  const { rideId, otp } = req.query;

  
  try {
    const ride = await startRideService({ rideId, otp, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride=started",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const endRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const{rideId}=req.body
  try {
     const ride = await endRideService({rideId,captain:req.captain})

     sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride
  })



  return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({message:error.message})
  
}
}